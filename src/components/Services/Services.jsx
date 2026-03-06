import React from 'react';

// ----------------------------------------------------
// LOCAL SERVICE DATA
// ----------------------------------------------------
const servicesData = [
    {
        title: "AI Content Creation",
        description: "Leveraging generative AI to produce high-quality, narrative-driven content at scale.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
            </svg>
        )
    },
    {
        title: "Creative Storytelling",
        description: "Crafting compelling narratives and scripts tailored for modern digital audiences.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
        )
    },
    {
        title: "Video Direction",
        description: "Guiding the visual language and cinematic execution of complex media projects.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
            </svg>
        )
    },
    {
        title: "Web Development",
        description: "Building interactive, high-performance web experiences using modern frontend stacks.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
            </svg>
        )
    },
    {
        title: "AI Workflow Automation",
        description: "Designing intelligent systems that streamline creative operations and pipelines.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
        )
    },
    {
        title: "AI Media Prototyping",
        description: "Rapidly prototyping AI-powered storytelling tools, workflows, and experimental media systems.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.829 1.58-1.961a2.25 2.25 0 10-3.328-1.373cM15 2.25H9M12 2.25l-2.25 4.5M12 2.25l2.25 4.5M12 16.5v-1.5" />
            </svg>
        )
    }
];

// ----------------------------------------------------
// SERVICES COMPONENT
// ----------------------------------------------------
export default function Services() {
    return (
        <section className="relative w-full min-h-screen flex flex-col items-center justify-center py-24 px-6 md:px-12 z-20">
            {/* Title */}
            <h2 className="text-3xl md:text-5xl font-light text-white mb-16 tracking-wide text-center">
                Services
            </h2>

            {/* Services Grid Container */}
            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {servicesData.map((service, idx) => (
                    <div
                        key={idx}
                        className="group relative p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.05] hover:border-white/20 shadow-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] cursor-pointer"
                    >
                        {/* Soft Hover Glow inside the card */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        {/* Content */}
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="text-white/60 group-hover:text-white/90 transition-colors duration-300 mb-6 w-8 h-8">
                                {service.icon}
                            </div>

                            <h3 className="text-xl md:text-2xl font-medium text-white/90 mb-4 group-hover:text-white transition-colors duration-300">
                                {service.title}
                            </h3>

                            <p className="text-white/50 text-sm md:text-base leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                                {service.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
