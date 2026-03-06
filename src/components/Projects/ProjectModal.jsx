import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function ProjectModal({ project, onClose }) {
    const overlayRef = useRef(null);
    const contentRef = useRef(null);

    // Opening Animations when project changes
    useEffect(() => {
        if (!project || !overlayRef.current || !contentRef.current) return;

        // Prevent body scroll while modal is open
        document.body.style.overflow = 'hidden';

        gsap.set(overlayRef.current, { opacity: 0 });
        gsap.set(contentRef.current, { opacity: 0, scale: 0.95, y: 20 });

        const tl = gsap.timeline();
        tl.to(overlayRef.current, { opacity: 1, duration: 0.4, ease: "power2.out" })
            .to(contentRef.current, { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "back.out(1.2)" }, "-=0.2");

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [project]);

    // Animated Close
    const handleClose = () => {
        if (!overlayRef.current || !contentRef.current) {
            onClose();
            return;
        }
        const tl = gsap.timeline({ onComplete: onClose });
        tl.to(contentRef.current, { opacity: 0, scale: 0.95, y: 20, duration: 0.3, ease: "power2.in" })
            .to(overlayRef.current, { opacity: 0, duration: 0.25, ease: "power2.inOut" }, "-=0.15");
    };

    // Close on ESC key
    useEffect(() => {
        if (!project) return;
        const handleKeyDown = (e) => { if (e.key === 'Escape') handleClose(); };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [project]);

    if (!project) return null;

    return (
        <div
            ref={overlayRef}
            onClick={handleClose}
            className="fixed inset-0 w-full h-full z-[200] flex items-center justify-center p-4 md:p-10 bg-black/80 backdrop-blur-md pointer-events-auto"
            style={{ opacity: 0 }}
        >
            {/* Modal Container — click doesn't propagate to overlay */}
            <div
                ref={contentRef}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-4xl max-h-[90vh] bg-[#0b0b0c] border border-white/10 rounded-2xl shadow-[0_40px_100px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden"
                style={{ opacity: 0 }}
            >
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/[0.07] border border-white/10 text-white/60 hover:text-white hover:bg-white/15 transition-all duration-200 cursor-pointer pointer-events-auto"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Media / Hero Thumbnail */}
                <div className="relative w-full h-48 md:h-64 lg:h-80 flex-shrink-0 bg-[#111]">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${project.thumbnail})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0c] via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Content */}
                <div className="p-8 md:p-10 overflow-y-auto flex-shrink">
                    <span className="text-white/40 font-mono tracking-widest text-xs uppercase mb-3 block">
                        {project.category}
                    </span>

                    <h2 className="text-3xl md:text-4xl font-light text-white mb-5">
                        {project.title}
                    </h2>

                    <p className="text-white/60 text-base md:text-lg leading-relaxed font-light max-w-2xl mb-8">
                        {project.description}
                    </p>

                    {project.externalLink && (
                        <a
                            href={project.externalLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-7 py-3 rounded-full bg-white text-[#0b0b0c] font-semibold text-sm hover:bg-white/90 hover:scale-105 transition-all duration-300 pointer-events-auto"
                        >
                            View Project
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
