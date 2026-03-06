import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData } from '../../data/projects';

gsap.registerPlugin(ScrollTrigger);

export default function FilmReelSystem({ onOpenProject }) {
    const reelContainerRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const totalHeight = reelContainerRef.current.scrollHeight;

            // Animate the internal reel sliding upwards to create rolling effect
            gsap.to(reelContainerRef.current, {
                y: -(totalHeight / 2),
                ease: "none",
                scrollTrigger: {
                    trigger: "body",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.5,
                }
            });
        });

        return () => ctx.revert();
    }, []);

    // Cycle through projectsData for each frame
    const totalFrames = 15;

    return (
        <div className="fixed right-2 md:right-8 top-0 h-[100vh] w-[45px] md:w-[80px] z-[90] overflow-hidden pointer-events-none select-none">

            {/* Background track for the reel */}
            <div className="absolute top-0 left-0 w-full h-[200vh] bg-[#050505] opacity-60 mix-blend-multiply backdrop-blur-md border-l border-r border-[#222]"></div>

            {/* Animated Reel Content */}
            <div
                ref={reelContainerRef}
                className="relative flex flex-col items-center w-full"
            >
                {Array.from({ length: totalFrames }).map((_, i) => {
                    // Map each frame to a project cyclically
                    const project = projectsData[i % projectsData.length];
                    const hasProject = !!onOpenProject;

                    return (
                        <div
                            key={i}
                            onClick={hasProject ? () => onOpenProject(project) : undefined}
                            className={`group relative w-full h-[70px] md:h-[130px] flex items-center justify-center border-b-[3px] border-t-[3px] border-[#111] bg-[#1a1a1c] z-10 my-[2px] transition-colors hover:bg-[#222] hover:border-[#444] ${hasProject ? 'pointer-events-auto cursor-pointer' : ''}`}
                        >
                            {/* Left Sprocket Holes */}
                            <div className="absolute left-1 top-0 h-full flex flex-col justify-evenly py-1">
                                {[...Array(6)].map((_, j) => (
                                    <div key={`l-${j}`} className="w-[6px] h-[8px] md:w-[8px] md:h-[10px] bg-background rounded-sm opacity-80"></div>
                                ))}
                            </div>

                            {/* Right Sprocket Holes */}
                            <div className="absolute right-1 top-0 h-full flex flex-col justify-evenly py-1">
                                {[...Array(6)].map((_, j) => (
                                    <div key={`r-${j}`} className="w-[6px] h-[8px] md:w-[8px] md:h-[10px] bg-background rounded-sm opacity-80"></div>
                                ))}
                            </div>

                            {/* Frame Image/Content Area Window */}
                            <div
                                className="w-[60%] h-[75%] border border-[#555] opacity-40 group-hover:opacity-100 flex items-center justify-center transition-all duration-300 rounded-sm overflow-hidden bg-cover bg-center"
                                style={{ backgroundImage: `url(${project.thumbnail})` }}
                            >
                                {/* Dark tint overlay with project number */}
                                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors duration-300" />
                                <span className="relative text-[8px] md:text-[9px] text-[#888] font-mono group-hover:text-white transition-colors z-10 text-center px-1 leading-tight">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                            </div>

                        </div>
                    );
                })}
            </div>

        </div>
    );
}
