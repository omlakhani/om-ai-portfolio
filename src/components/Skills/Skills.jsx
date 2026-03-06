import React, { useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { skillsData } from '../../data/skills';

// ----------------------------------------------------
// INDIVIDUAL SKILL CHIP WITH REPULSION PHYSICS
// ----------------------------------------------------
function SkillChip({ skill, index, total, containerRef, globalMouse }) {
    const wrapperRef = useRef(null);
    const posRef = useRef({ x: 0, y: 0, originX: 0, originY: 0 });
    const animatingRef = useRef(true);

    useLayoutEffect(() => {
        if (!containerRef.current || !wrapperRef.current) return;

        // CRITICAL FIX: Reset animating flag on every effect run.
        // React Strict Mode (and category switching) causes cleanup → remount.
        // The cleanup sets animatingRef.current = false, but useRef persists
        // across the unmount, so new mounts find it false and instantly kill the RAF.
        animatingRef.current = true;

        const parentRect = containerRef.current.getBoundingClientRect();
        const chipRect = wrapperRef.current.getBoundingClientRect();

        // Prevent snapping outside the tank bounds
        const paddingX = (chipRect.width / 2) + 20;
        const paddingY = (chipRect.height / 2) + 20;

        // Fallback bounds if tank isn't fully rendered
        const pWidth = parentRect.width || 800;
        const pHeight = parentRect.height || 400;

        const maxX = Math.max(0, pWidth - paddingX * 2);
        const maxY = Math.max(0, pHeight - paddingY * 2);

        // Calculate a somewhat homogenous grid-based initial position
        // so that chips don't all spawn on top of each other.
        const cols = Math.ceil(Math.sqrt(total));
        const rows = Math.ceil(total / cols);
        const col = index % cols;
        const row = Math.floor(index / cols);

        // Add a bit of randomness so it feels organic, but centered around grid points
        const cellWidth = (maxX) / Math.max(1, cols - 1);
        const cellHeight = (maxY) / Math.max(1, rows - 1);

        const baseX = paddingX + (col * cellWidth);
        const baseY = paddingY + (row * cellHeight);

        // Random offset within roughly half a cell size
        const randX = (Math.random() - 0.5) * (cellWidth * 0.5);
        const randY = (Math.random() - 0.5) * (cellHeight * 0.5);

        // Final origin clamped to tank
        const originX = Math.max(paddingX, Math.min(paddingX + maxX, baseX + randX));
        const originY = Math.max(paddingY, Math.min(paddingY + maxY, baseY + randY));

        posRef.current = { x: originX, y: originY, originX, originY };

        // Initial Appearance Animation
        gsap.set(wrapperRef.current, { x: originX, y: originY, xPercent: -50, yPercent: -50, opacity: 0, scale: 0 });
        gsap.to(wrapperRef.current, { opacity: 1, scale: 1, duration: 0.6, delay: Math.random() * 0.4, ease: 'back.out(1.5)' });

        // GSAP quick setters for the physical bounds tracking
        const xTo = gsap.quickTo(wrapperRef.current, "x", { duration: 0.4, ease: "power3.out" });
        const yTo = gsap.quickTo(wrapperRef.current, "y", { duration: 0.4, ease: "power3.out" });

        let rafId;
        let time = Math.random() * 1000;

        const renderLoop = () => {
            if (!animatingRef.current || !wrapperRef.current) return;

            time += 0.01; // increment "time" for continuous math.sin floating

            if (!containerRef.current) return;
            const tankRect = containerRef.current.getBoundingClientRect();

            // local mouse within the container
            const localMouseX = globalMouse.current.x - tankRect.left;
            const localMouseY = globalMouse.current.y - tankRect.top;

            const { x, y, originX, originY } = posRef.current;

            const isMobile = window.innerWidth < 768;
            const maxDistance = isMobile ? 120 : 200;
            const maxPush = isMobile ? 80 : 150;

            // Distance from mouse to the ORIGIN of the skill
            const dx = originX - localMouseX;
            const dy = originY - localMouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Increase baseline floating distance and speed for more activity
            let floatX = originX + Math.sin(time * 1.8) * 25;
            let floatY = originY + Math.cos(time * 1.5) * 25;

            const currentPWidth = tankRect.width || 800;
            const currentPHeight = tankRect.height || 400;

            const safeMaxX = Math.max(paddingX, currentPWidth - paddingX);
            const safeMaxY = Math.max(paddingY, currentPHeight - paddingY);

            // CRITICAL FIX: Clamp the organic drift itself so it never floats outside the tank bounds
            floatX = Math.max(paddingX, Math.min(safeMaxX, floatX));
            floatY = Math.max(paddingY, Math.min(safeMaxY, floatY));

            // Ensure global mouse is somewhat valid and not far off screen
            if (distance < maxDistance && globalMouse.current.x > -100) {
                // PUSH LOGIC (repulsion vector from anchor)
                const force = (maxDistance - distance) / maxDistance;
                const pushStrength = force * maxPush;
                const angle = Math.atan2(dy, dx);

                let targetX = floatX + Math.cos(angle) * pushStrength;
                let targetY = floatY + Math.sin(angle) * pushStrength;

                // Clamp the repelled target position strictly inside the boundaries
                targetX = Math.max(paddingX, Math.min(safeMaxX, targetX));
                targetY = Math.max(paddingY, Math.min(safeMaxY, targetY));

                // Lerp towards repulsed target
                posRef.current.x += (targetX - x) * 0.12;
                posRef.current.y += (targetY - y) * 0.12;

            } else {
                // RETURN LOGIC (lerp home to clamped floating origin)
                posRef.current.x += (floatX - x) * 0.06;
                posRef.current.y += (floatY - y) * 0.06;
            }

            xTo(posRef.current.x);
            yTo(posRef.current.y);

            rafId = requestAnimationFrame(renderLoop);
        };

        rafId = requestAnimationFrame(renderLoop);

        return () => {
            animatingRef.current = false;
            cancelAnimationFrame(rafId);
            gsap.killTweensOf(wrapperRef.current);
        };
    }, [containerRef, globalMouse]);

    return (
        <div ref={wrapperRef} className="absolute top-0 left-0 w-max h-max group">
            <div className="px-5 py-2 md:px-6 md:py-3 rounded-full bg-white/5 border border-[rgba(255,255,255,0.15)] text-white/90 text-sm md:text-base font-medium whitespace-nowrap backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.02)] transition-all duration-300 group-hover:scale-[1.15] group-hover:bg-white/10 group-hover:border-white/40 group-hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] cursor-crosshair select-none relative z-10 group-hover:z-50">
                {skill}
            </div>
        </div>
    );
}

// ----------------------------------------------------
// MAIN SKILLS SECTION & TANK CONTAINER
// ----------------------------------------------------
export default function Skills() {
    const [activeCategory, setActiveCategory] = useState("Tech");
    const [displayedCategory, setDisplayedCategory] = useState("Tech");
    const tankRef = useRef(null);
    const globalMouse = useRef({ x: -1000, y: -1000 });

    useLayoutEffect(() => {
        const handleMouseMove = (e) => {
            const isTouch = e.touches && e.touches.length > 0;
            globalMouse.current.x = isTouch ? e.touches[0].clientX : e.clientX;
            globalMouse.current.y = isTouch ? e.touches[0].clientY : e.clientY;
        };
        const handleMouseLeave = () => {
            globalMouse.current.x = -1000;
            globalMouse.current.y = -1000;
        };

        const setupEvents = () => {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('touchmove', handleMouseMove, { passive: true });
            window.addEventListener('mouseleave', handleMouseLeave);
            window.addEventListener('touchend', handleMouseLeave);
        };

        setupEvents();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('touchend', handleMouseLeave);
        };
    }, []);

    const categories = Object.keys(skillsData);

    const handleCategoryChange = (cat) => {
        if (cat === activeCategory) return;
        setActiveCategory(cat);

        // Smooth transition overlay between data sets
        gsap.to(tankRef.current, {
            opacity: 0,
            scale: 0.95,
            duration: 0.3,
            onComplete: () => {
                setDisplayedCategory(cat);
                gsap.to(tankRef.current, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.4,
                    ease: "power2.out"
                });
            }
        });
    };

    return (
        <section className="relative min-h-screen w-full flex flex-col items-center justify-center z-10 py-24 px-6 md:px-12">
            {/* Title */}
            <h2 className="text-3xl md:text-5xl font-light text-white mb-10 tracking-wide text-center">
                Skills
            </h2>

            {/* Tab Selection */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-12 relative z-[60] pointer-events-auto">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => handleCategoryChange(cat)}
                        className={`px-6 py-2 rounded-full font-mono tracking-widest text-xs md:text-sm border transition-all duration-300 pointer-events-auto select-none cursor-pointer ${activeCategory === cat ? 'bg-white/10 border-white/40 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]' : 'bg-white/[0.02] border-white/10 text-white/40 hover:text-white/80 hover:border-white/20'}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Skill Tank Container */}
            <div className="w-full max-w-[900px] h-[350px] md:h-[500px] relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.02)]">

                {/* Dynamic Rendering Canvas Wrapper */}
                <div ref={tankRef} className="absolute inset-0 w-full h-full">
                    {skillsData[displayedCategory] && skillsData[displayedCategory].map((skill, i) => (
                        <SkillChip key={`${displayedCategory}-${i}`} skill={skill} index={i} total={skillsData[displayedCategory].length} containerRef={tankRef} globalMouse={globalMouse} />
                    ))}
                </div>

                {/* Ambient cinematic glow strictly inside tank */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#14283c] opacity-[0.15] blur-[120px] rounded-full pointer-events-none z-0"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-[#3c2814] opacity-[0.15] blur-[100px] rounded-full pointer-events-none z-0"></div>
            </div>
        </section>
    );
}
