import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function WhyMe() {
    const containerRef = useRef(null);
    const cardsRef = useRef([]);
    // Helper to add card refs
    const addToRefs = (el) => {
        if (el && !cardsRef.current.includes(el)) {
            cardsRef.current.push(el);
        }
    };

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Staggered card animation
            gsap.fromTo(cardsRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.2, // Delay between each card
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 75%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const pillars = [
        {
            title: "Storytelling Mindset",
            description: "A narrative-driven mindset developed through scriptwriting, filmmaking, and creating story-focused digital content.",
            icon: "01"
        },
        {
            title: "AI Experimentation",
            description: "Continuously experimenting with AI filmmaking tools, diffusion models, and creative automation systems to explore new storytelling possibilities.",
            icon: "02"
        },
        {
            title: "Technical Implementation",
            description: "Building interactive creative systems by combining programming, modern web technologies, and AI-driven workflows.",
            icon: "03"
        },
        {
            title: "Creative Problem Solving",
            description: "Approaching challenges with a mix of analytical thinking and creative ideation to design innovative digital experiences.",
            icon: "04"
        },
        {
            title: "Content & Media Strategy",
            description: "Understanding audience behavior and crafting content strategies that connect storytelling with digital platforms.",
            icon: "05"
        },
        {
            title: "Curiosity-Driven Learning",
            description: "Constantly exploring new technologies, tools, and creative mediums to evolve at the intersection of AI, media, and software.",
            icon: "06"
        }
    ];

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen w-full flex flex-col items-center justify-center z-10 py-24 px-6 md:px-12 lg:px-24"
        >
            <div className="w-full max-w-6xl mx-auto flex flex-col items-center">

                {/* Section Title */}
                <h2 className="text-3xl md:text-5xl font-light text-white mb-16 tracking-wide text-center">
                    Why Me
                </h2>

                {/* Cards Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                    {pillars.map((pillar, index) => (
                        <div
                            key={index}
                            ref={addToRefs}
                            className="relative group flex flex-col p-8 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:bg-white/10 hover:border-white/20 overflow-hidden cursor-default"
                        >
                            {/* Subtle hover glow background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl" />

                            {/* Card Header */}
                            <div className="flex justify-between items-start mb-6 font-mono text-white/40">
                                <span className="text-xl">{pillar.icon}</span>
                                <span className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-white/60 transition-colors duration-300" />
                            </div>

                            {/* Card Content */}
                            <h3 className="text-xl font-medium text-white/90 tracking-wide mb-4">
                                {pillar.title}
                            </h3>
                            <p className="text-base text-white/50 leading-relaxed font-light">
                                {pillar.description}
                            </p>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
