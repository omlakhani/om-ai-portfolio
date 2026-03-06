import React, { useState, useEffect } from 'react';
import DroneSystem from './systems/DroneSystem/DroneSystem';
import FilmReelSystem from './systems/FilmReelSystem/FilmReelSystem';
import ScrollSystem from './systems/ScrollSystem/ScrollSystem';

import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Services from './components/Services/Services';
import Projects from './components/Projects/Projects';
import WhyMe from './components/WhyMe/WhyMe';
import Footer from './components/Footer/Footer';
import ProjectModal from './components/Projects/ProjectModal';

function App() {
    // Global modal state — shared by Projects grid and FilmReelSystem
    const [activeModal, setActiveModal] = useState(null);

    useEffect(() => {
        // Scroll listener for other systems if needed
    }, []);

    return (
        <>
            {/* Global Systems */}
            <DroneSystem />
            <FilmReelSystem onOpenProject={setActiveModal} />
            <ScrollSystem />

            {/* Pages / Sections */}
            <main className="relative z-10">
                <Hero />
                <About />
                <Skills />
                <Services />
                <Projects onOpenProject={setActiveModal} />
                <WhyMe />
                <Footer />
            </main>

            {/* Global Project Modal — rendered at root level so it overlays everything */}
            <ProjectModal project={activeModal} onClose={() => setActiveModal(null)} />
        </>
    );
}

export default App;
