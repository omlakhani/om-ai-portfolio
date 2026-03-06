import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import heroPortrait from '../../assets/images/hero-portrait.png';

export default function Hero() {
    const containerRef = useRef(null);
    const textLayerRef = useRef(null);
    const portraitRef = useRef(null);
    const lightRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Use GSAP QuickTo for high-performance cursor tracking without React state thrashing
        const xToText = gsap.quickTo(textLayerRef.current, "x", { duration: 0.8, ease: "power3" });
        const yToText = gsap.quickTo(textLayerRef.current, "y", { duration: 0.8, ease: "power3" });

        const xToPortrait = gsap.quickTo(portraitRef.current, "x", { duration: 1.2, ease: "power3" });
        const yToPortrait = gsap.quickTo(portraitRef.current, "y", { duration: 1.2, ease: "power3" });

        const xToLight = gsap.quickTo(lightRef.current, "x", { duration: 0.5, ease: "power2" });
        const yToLight = gsap.quickTo(lightRef.current, "y", { duration: 0.5, ease: "power2" });

        const handleMouseMove = (e) => {
            // Calculate normalized mouse coordinates from center of screen (-1 to 1)
            const { clientX, clientY } = e;
            const xNorm = (clientX / window.innerWidth - 0.5) * 2;
            const yNorm = (clientY / window.innerHeight - 0.5) * 2;

            // Apply subtle parallax limits (e.g. max 15px/30px translation)
            xToText(xNorm * -30); // Typography moves opposite to mouse
            yToText(yNorm * -30);

            xToPortrait(xNorm * 15); // Portrait moves slightly with mouse
            yToPortrait(yNorm * 15);

            xToLight(xNorm * 50); // Light moves the most
            yToLight(yNorm * 50);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden z-10"
        >
            {/* 1. Subtle Gradient Lighting Effect */}
            <div
                ref={lightRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] rounded-full pointer-events-none z-0 mix-blend-screen opacity-20"
                style={{
                    background: "radial-gradient(circle, rgba(130,100,50,0.8) 0%, rgba(20,40,60,0.3) 40%, rgba(11,11,12,0) 70%)"
                }}
            />

            {/* 2. Layered Background Typography */}
            <div
                ref={textLayerRef}
                className="absolute z-0 flex flex-col items-center justify-center text-center pointer-events-none w-full whitespace-nowrap opacity-[0.25] md:opacity-[0.35]"
                style={{ fontFamily: "'Junction', sans-serif" }}
            >
                <span className="text-[10vw] md:text-[8vw] font-bold tracking-[0.2em] leading-[0.85] uppercase text-white">Om Lakhani</span>
                <span className="text-[10vw] md:text-[8vw] font-bold tracking-[0.2em] leading-[0.85] uppercase text-white ml-6 md:ml-12">&nbsp;</span>
                <span className="text-[10vw] md:text-[8vw] font-bold tracking-[0.2em] leading-[0.85] uppercase text-white mr-6 md:mr-12">Creativity</span>
                <span className="text-[10vw] md:text-[8vw] font-bold tracking-[0.2em] leading-[0.85] uppercase text-white">Meets Tech</span>
            </div>

            {/* 3. Portrait Container & Intro Text */}
            <div className="relative z-10 flex flex-col items-center justify-center pointer-events-auto">

                {/* Portrait Frame */}
                <div
                    ref={portraitRef}
                    className="relative w-[240px] h-[240px] md:w-[320px] md:h-[320px] rounded-full p-2 mb-8 group"
                >
                    {/* Subtle glow/gradient ring */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#1a2b3c] via-[#4a3b2c] to-[#111112] opacity-50 blur-md group-hover:opacity-80 transition-opacity duration-700 pointer-events-none"></div>

                    {/* Thin inner border */}
                    <div className="absolute inset-0 rounded-full border border-white/10 pointer-events-none"></div>

                    <img
                        src={heroPortrait}
                        alt="Om Lakhani Portrait"
                        className="w-full h-full object-cover rounded-full grayscale mix-blend-luminosity opacity-80 group-hover:grayscale-0 group-hover:mix-blend-normal group-hover:opacity-100 transition-all duration-700"
                    />
                </div>

                {/* Introduction Text */}
                <div className="text-center">
                    <h1 className="text-xl md:text-2xl font-medium tracking-wide text-white/90 mb-2">
                        Hi, I'm Om Lakhani.
                    </h1>
                    <p className="text-lg md:text-xl font-light tracking-wide text-white/60">
                        I build AI-driven storytelling systems.
                    </p>
                </div>
            </div>

            {/* 4. Subtle Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-50">
                <span className="text-[10px] uppercase tracking-widest text-white/40 mb-3 font-mono">Scroll</span>
                <div className="w-[1px] h-12 bg-white/10 overflow-hidden">
                    <div className="w-full h-full bg-white/60 animate-[scrollLine_2s_ease-in-out_infinite]"></div>
                </div>
            </div>

        </section>
    );
}
