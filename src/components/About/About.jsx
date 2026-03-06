import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const containerRef = useRef(null);
    const block1Ref = useRef(null);
    const block2Ref = useRef(null);
    const visualRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 75%",
                    toggleActions: "play none none reverse",
                }
            });

            tl.fromTo(block1Ref.current,
                { opacity: 0, y: 60 },
                { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
            )
                .fromTo(block2Ref.current,
                    { opacity: 0, y: 60 },
                    { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
                    "-=0.6" // overlapping start
                )
                .fromTo(visualRef.current,
                    { scale: 0, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 2, ease: "power2.out" },
                    0
                );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full flex items-center justify-center z-10 py-20 md:py-28 px-6 md:px-12 lg:px-24"
        >
            <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16 relative">

                {/* Left Side: Text Content */}
                <div className="flex-1 flex flex-col justify-center max-w-2xl">

                    <div ref={block1Ref} className="mb-12">
                        <h2 className="text-2xl md:text-4xl font-light text-white mb-6 tracking-wide leading-relaxed">
                            Om is a developer and storyteller <br />
                            <span className="font-medium text-white/90">experimenting with AI-driven media <br /> and creative technology.</span>
                        </h2>
                        <div className="text-lg md:text-xl text-white/50 leading-relaxed font-light space-y-4">
                            <p>
                                Working at the intersection of storytelling, AI tools, and modern web technologies. With a strong foundation in scriptwriting and cinematic concepts, Om builds interactive digital systems and leverages generative AI to explore the future of creative media production.
                            </p>
                        </div>
                    </div>

                    <div ref={block2Ref}>
                        <p className="text-sm tracking-widest uppercase text-white/30 mb-6 font-mono">His interests include:</p>
                        <ul className="flex flex-col gap-4">
                            {['AI filmmaking', 'Scriptwriting and narrative design', 'Visual storytelling', 'Creative automation systems', 'Interactive digital media'].map((item, index) => (
                                <li key={index} className="flex items-center gap-4 text-white/70 text-lg group">
                                    <span className="w-8 h-[1px] bg-white/20 group-hover:bg-white/60 group-hover:w-12 transition-all duration-300"></span>
                                    <span className="tracking-wide font-light">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                {/* Right Side: Stats Grid */}
                <div className="hidden md:grid grid-cols-2 gap-4 flex-1 max-w-sm">
                    {[
                        { value: "AI MEDIA", label: "Creative systems" },
                        { value: "CODE + STORY", label: "Hybrid thinking" },
                        { value: "AI WORKFLOWS", label: "Automation mindset" },
                        { value: "BUILDING EXPERIMENTS", label: "Constant iteration" },
                    ].map(({ value, label }) => (
                        <div
                            key={label}
                            className="group flex flex-col items-start justify-between p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_24px_rgba(255,255,255,0.04)]"
                        >
                            <span className="text-lg md:text-xl font-medium text-white/90 tracking-tight leading-tight mb-3 group-hover:text-white transition-colors duration-300 break-words w-full">
                                {value}
                            </span>
                            <span className="text-xs uppercase tracking-widest text-white/35 font-mono group-hover:text-white/55 transition-colors duration-300">
                                {label}
                            </span>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
