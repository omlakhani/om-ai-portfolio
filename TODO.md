# TODO — OM LAKHANI AI MEDIA PORTFOLIO (ANTIGRAVITY BUILD PLAN)

This document defines the **complete implementation roadmap** for the cinematic AI-media portfolio website.

The project must follow this roadmap strictly.
Each phase must be implemented **in order** to avoid architectural conflicts.

The website is a **single-page cinematic scroll experience** with global animated systems and modular React components.

---

# PHASE 1 — PROJECT INITIALIZATION

Create the project using **Vite + React (JavaScript)**.

Required dependencies:

React
React DOM
GSAP
ScrollTrigger
Three.js
@react-three/fiber
@react-three/drei
TailwindCSS
PostCSS
Autoprefixer

Ensure the project runs successfully with:

```
npm install
npm run dev
```

No UI should be implemented in this phase.

---

# PHASE 2 — PROJECT ARCHITECTURE

Create a clean modular structure inside `src`.

```
src/

components/
Hero/
About/
Skills/
Services/
Projects/
WhyMe/
Footer/

systems/
DroneSystem/
FilmReelSystem/
ScrollSystem/

assets/
images/
models/
sounds/

styles/
global.css

data/

utils/
```

Each section component must initially render a placeholder container.

Global animation systems must exist independently of UI sections.

---

# PHASE 3 — GLOBAL VISUAL FOUNDATION

Implement base visual environment.

Requirements:

Background color: `#0b0b0c`

Add cinematic **film grain texture** across the entire website.

The grain must resemble **old analog film noise** rather than subtle digital noise.

Possible techniques:

CSS noise overlay
Animated SVG noise
Canvas noise layer

The grain must be:

visible
subtle
high resolution
non-distracting

---

# PHASE 4 — GLOBAL DRONE SYSTEM

Create a **global drone animation system**.

The drone must exist across the entire page.

Requirements:

Render drone using **React Three Fiber + Three.js**

The drone model will be loaded from:

```
src/assets/models/drone.glb
```

Animation must use:

GSAP
ScrollTrigger

Drone behavior:

• Drone flies horizontally across the page
• Moves **left → right → left → right repeatedly** while scrolling
• Slight altitude variations
• Subtle rotation
• Smooth cinematic movement

Drone must feel like it is **exploring the page as the user scrolls**.

Canvas requirements:

```
position: fixed
top: 0
left: 0
width: 100%
height: 100%
pointer-events: none
z-index: high
```

The drone must **never block UI interaction**.

---

# PHASE 5 — GLOBAL FILM REEL SYSTEM

Create a **vertical film reel strip** visible on the right side of the screen.

The reel must remain visible across the entire page.

Implementation:

SVG film strip

Visual structure:

• film frames
• sprocket holes
• vertical strip

Animation:

Use GSAP ScrollTrigger.

When the user scrolls:

• the reel scrolls vertically
• frames appear to roll continuously

Frames will later correspond to projects.

Clicking a frame should open the **project modal**.

---

# PHASE 6 — HERO SECTION

Create the cinematic hero section.

Requirements:

Full viewport height.

Elements:

• Large layered typography behind portrait
• Center portrait container
• Intro text

Hero text:

```
Hi, I'm Om Lakhani.
I build AI-driven storytelling systems.
```

Portrait styling:

Circular or slightly rounded frame.

Portrait will be provided later.

Background must include **cinematic grain**.

---

# PHASE 7 — CURSOR INTERACTION

Implement subtle cursor interactions in the hero.

Mouse movement should influence:

• background lighting
• typography layers
• portrait container

Movement must be subtle.

No exaggerated motion.

---

# PHASE 8 — GLOBAL SCROLL ENGINE

Implement scroll animations using:

GSAP
ScrollTrigger

Create a reusable scroll animation utility.

Each section must animate into view.

Example animation:

Initial:

opacity 0
translateY 60px

Final:

opacity 1
translateY 0

Add subtle parallax layers.

---

# PHASE 9 — ABOUT SECTION

Create a narrative introduction section.

Content includes:

Background story
Creative identity
Focus on AI storytelling experimentation

Layout should include:

Text blocks
Visual separators
Scroll animations

---

# PHASE 10 — SKILLS SECTION (SKILL TANK)

Create the **Skill Tank interaction system**.

Skills must be grouped into three categories:

Tech
Creative
AI

Example skills:

Python
Web Development
Computer Vision
Git / GitHub
Scriptwriting
Video Direction
Content Strategy
Prompt Engineering
Diffusion Models
AI Filmmaking
n8n Automation

---

## SKILL TANK INTERACTION

Inside a container, skill elements must float.

Behavior:

When the cursor approaches a skill element:

• the element moves away
• the movement is smooth
• distance based repulsion

Implementation may use:

vector math
requestAnimationFrame
GSAP quickTo

Skills must return to normal position after cursor moves away.

---

# PHASE 11 — SERVICES SECTION

Display services offered.

Examples:

AI Content Creation
Scriptwriting
Video Direction
Web Development
AI Workflow Automation

Display services as animated cards.

Cards must include:

title
short description
icon

Hover effects:

lift animation
glow border
background highlight

---

# PHASE 12 — PROJECTS SYSTEM

Create a projects section.

Project data must be stored in:

```
src/data/projects.js
```

Each project must contain:

title
description
category
image
media link

Display projects as cards.

---

# PHASE 13 — PROJECT MODAL

Create a modal system.

Modal must open when:

• clicking project card
• clicking film reel frame

Modal must display:

project title
description
image/video preview
external link

Modal behavior:

fade in animation
dark background overlay
close on ESC
close on outside click

---

# PHASE 14 — WHY ME SECTION

Explain Om's unique strengths.

Example pillars:

Storytelling mindset
AI experimentation
Technical implementation

Display pillars as animated cards.

---

# PHASE 15 — FOOTER

The website will **not include a contact form**.

Footer must contain social links only.

Links to include:

GitHub
LinkedIn
Instagram
Twitter (X)
Email

Links must be **clickable hyperlinks**.

Icons should be used instead of plain text.

Optional button:

Download Resume.

---

# PHASE 16 — SOUND SYSTEM

Implement subtle cinematic sound effects.

Sounds include:

Ambient background sound
Film reel rolling sound
Drone hum sound

Sounds must be:

subtle
looped
low volume

Add a **sound toggle button** so the user can mute audio.

---

# PHASE 17 — MOBILE RESPONSIVENESS

The website must work on:

desktop
tablet
mobile

Adjust:

reduce animation intensity
reduce drone motion
convert film reel to horizontal slider
adapt skill tank for touch input

---

# PHASE 18 — PERFORMANCE OPTIMIZATION

Ensure smooth performance.

Implement:

lazy loading for models
optimized images
efficient animation loops

Target performance:

**60fps on desktop**

---

# PHASE 19 — FINAL POLISH

Improve visual quality.

Refine:

spacing
typography hierarchy
animation timing
hover states

Ensure the site feels:

creative
elegant
cinematic
professional

---

END OF IMPLEMENTATION PLAN
