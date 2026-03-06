import React, { useState } from 'react';
import { projectsData } from '../../data/projects';

export default function Projects({ onOpenProject }) {
    return (
        <section className="relative w-full min-h-screen flex flex-col items-center justify-center py-24 px-6 md:px-12 z-20">

            {/* Title */}
            <h2 className="text-3xl md:text-5xl font-light text-white mb-16 tracking-wide text-center">
                Projects
            </h2>

            {/* Projects Grid Container */}
            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {projectsData.map((project) => (
                    <div
                        key={project.id}
                        onClick={() => window.open(project.externalLink, '_blank')}
                        className="group relative h-[320px] rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(255,255,255,0.08)] block"
                    >
                        {/* Thumbnail Background */}
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                            style={{ backgroundImage: `url(${project.thumbnail})` }}
                        />

                        {/* Dark Overlay (lightens slightly on hover) */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0c] via-[#0b0b0c]/80 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500" />

                        {/* Text Content Area */}
                        <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                            <span className="text-white/40 font-mono tracking-widest text-xs uppercase mb-2 group-hover:text-white/70 transition-colors duration-300">
                                {project.category}
                            </span>
                            <h3 className="text-xl md:text-2xl font-medium text-white/90 mb-3 group-hover:text-white transition-colors duration-300">
                                {project.title}
                            </h3>
                            <p className="text-white/50 text-sm line-clamp-2 leading-relaxed opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75">
                                {project.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
