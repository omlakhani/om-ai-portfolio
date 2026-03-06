import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import droneGlbUrl from '../../assets/models/drone.glb?url';

gsap.registerPlugin(ScrollTrigger);

// Prop-related name fragments to identify blade/rotor meshes in the GLB
const PROPELLER_KEYWORDS = ['prop', 'rotor', 'blade', 'fan', 'spin', 'motor'];

function isPropeller(name = '') {
    const n = name.toLowerCase();
    return PROPELLER_KEYWORDS.some(kw => n.includes(kw));
}

// ----------------------------------------------------
// DRONE MODEL
// • Does NOT use AnimationMixer — clips may contain
//   position tracks that "dismantle" the model.
// • Instead manually spins propeller-named meshes in
//   the scene graph every frame.
// ----------------------------------------------------
function DroneModel() {
    const { scene } = useGLTF(droneGlbUrl);

    // Spin propeller children manually every frame
    useFrame((_, delta) => {
        scene.traverse((child) => {
            if (isPropeller(child.name)) {
                child.rotation.y += delta * 30; // fast spin (adjust axis if needed)
            }
        });
    });

    return <primitive object={scene} scale={2} />;
}

// ----------------------------------------------------
// DRONE SCENE
// Reads the GSAP proxy (set in DroneSystem) via prop
// and applies position + heading to the group each frame.
// ----------------------------------------------------
function DroneScene({ proxy }) {
    const groupRef = useRef();

    useFrame(({ clock }) => {
        if (!groupRef.current) return;

        const { x, y, z, ry } = proxy.current;
        const t = clock.getElapsedTime();

        // Scroll-driven position + organic hover bob
        groupRef.current.position.x = x;
        groupRef.current.position.y = y + Math.sin(t * 1.4) * 0.12;
        groupRef.current.position.z = z;

        // Heading rotation — face direction of travel
        groupRef.current.rotation.y = ry;
        // Tiny pitch wobble
        groupRef.current.rotation.x = Math.sin(t * 0.8) * 0.02;
        // Keep roll at 0 — prevents any dismantling risk
        groupRef.current.rotation.z = 0;
    });

    return (
        <group ref={groupRef} position={[-6, 2, -4]}>
            <Suspense fallback={null}>
                <DroneModel />
            </Suspense>
        </group>
    );
}

// ----------------------------------------------------
// MAIN DRONE SYSTEM
// GSAP + ScrollTrigger lives here — outside the Canvas —
// animating a plain JS proxy ref that useFrame reads.
// ----------------------------------------------------
export default function DroneSystem() {
    const proxy = useRef({ x: -6, y: 2, z: -4, ry: Math.PI / 4 });

    useEffect(() => {
        const p = proxy.current;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: document.documentElement,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.8,   // reduced lag so rotation feels responsive
            }
        });

        // README: left → right → left → right
        // Large ry values (±2.2 rad ≈ ±126°) make the heading visually dramatic
        tl
            .to(p, { x: 6, y: 1, z: -3, ry: -2.2, duration: 1, ease: 'power2.inOut' })
            .to(p, { x: -5, y: 0.5, z: -2, ry: 2.2, duration: 1, ease: 'power2.inOut' })
            .to(p, { x: 5, y: -1, z: -3, ry: -2.2, duration: 1, ease: 'power2.inOut' })
            .to(p, { x: -4, y: -0.5, z: -1, ry: 1.4, duration: 1, ease: 'power2.inOut' });

        return () => { tl.kill(); };
    }, []);

    return (
        <div
            className="fixed top-0 left-0 w-full h-full z-[100]"
            style={{ pointerEvents: 'none' }}
        >
            <Canvas
                shadows
                camera={{ position: [0, 0, 8], fov: 55 }}
                style={{ pointerEvents: 'none' }}
                frameloop="always"
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" castShadow />
                <directionalLight position={[-10, -5, -5]} intensity={0.8} color="#00ffff" />
                <directionalLight position={[5, -5, -5]} intensity={0.6} color="#ffaa00" />

                <DroneScene proxy={proxy} />

                <Suspense fallback={null}>
                    <Environment preset="night" />
                </Suspense>
            </Canvas>
        </div>
    );
}
