// Project thumbnails (imported so Vite can bundle them)
import aiSynthesisThumb from '../assets/images/ai-synthesis.jpeg';
import narrativesThumb from '../assets/images/narratives-and-scriptwriting.jpeg';
import webDevThumb from '../assets/images/web-dev.jpeg';
import heroPortrait from '../assets/images/hero-portrait.png';

export const projectsData = [
    {
        id: "ai-storytelling",
        title: "AI Synthesis: Storytelling Beyond Limits",
        description: "An experimental AI filmmaking project exploring how generative tools can be used to create cinematic narratives. The project combines storytelling, visual generation, and AI-assisted creative workflows to push the boundaries of digital filmmaking.",
        category: "AI FILMMAKING",
        thumbnail: aiSynthesisThumb,
        videoPreview: null,
        externalLink: "https://drive.google.com/file/d/1ZcbFOE_cB8qWpLdpzw3mfoUqSmDBmeMY/view?usp=sharing"
    },
    {
        id: "web-interactive",
        title: "Narratives & Scriptwriting",
        description: "A collection of original writing including short film scripts, storytelling experiments, and narrative-driven content written across multiple genres such as drama, comedy, romance, and slice-of-life.",
        category: "WRITING",
        thumbnail: narrativesThumb,
        videoPreview: null,
        externalLink: "https://docs.google.com/document/d/1d57nXPxW0BMv6nFiB3SYfSX2JW1Zvjvlmz5tlUzbifc/edit?usp=sharing"
    },
    {
        id: "cinematic-direction",
        title: "Interactive Portfolio Website",
        description: "A cinematic personal portfolio website built with modern web technologies, featuring advanced UI animations, interactive systems, and experimental creative design elements.",
        category: "WEB DEVELOPMENT",
        thumbnail: webDevThumb,
        videoPreview: null,
        externalLink: "https://github.com/om-ai-portfolio"
    }
];
