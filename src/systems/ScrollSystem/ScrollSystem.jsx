import React, { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollSystem() {
    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // 1. Universal Section Reveal Animation
            // Target all sections on the page to animate as they enter the viewport
            const sections = gsap.utils.toArray('section');

            sections.forEach((sec, i) => {
                // Skip the very first section (Hero) so it's always visible on load
                if (i === 0) return;

                gsap.fromTo(sec,
                    { opacity: 0, y: 60 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: sec,
                            start: "top 85%", // Trigger when section top hits 85% of viewport
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });

            // 2. Hero Scroll Transition
            // When scrolling down, the Hero section fades slightly, moves up, and scales down
            const heroSection = sections[0];
            if (heroSection) {
                // Select internal components based on classes used in Hero.jsx
                const textLayer = heroSection.querySelector('.whitespace-nowrap');
                const portrait = heroSection.querySelector('.rounded-full.p-2');

                const heroTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: heroSection,
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                    }
                });

                // Hero container fades slightly
                heroTl.to(heroSection, { opacity: 0.3, ease: "none" }, 0);

                // Portrait scales down and moves up
                if (portrait) {
                    heroTl.to(portrait, { scale: 0.85, ease: "none" }, 0);
                }

                // Background typography moves upward faster (parallax)
                if (textLayer) {
                    heroTl.to(textLayer, { y: -200, ease: "none" }, 0);
                }
            }

            // 3. Optional Parallax helper for generic elements added in future phases
            const parallaxLayers = gsap.utils.toArray('.parallax-layer');
            parallaxLayers.forEach((layer) => {
                const speed = layer.dataset.speed || 0.5;
                gsap.to(layer, {
                    y: () => -(ScrollTrigger.maxScroll(window) * speed),
                    ease: "none",
                    scrollTrigger: {
                        trigger: layer,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                });
            });

            ScrollTrigger.refresh();
        });

        return () => ctx.revert();
    }, []);

    return null;
}
