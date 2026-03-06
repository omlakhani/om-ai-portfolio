# OM LAKHANI — AI MEDIA PORTFOLIO

## Overview

This project is a **cinematic, single-page portfolio website** built to present **Om Lakhani** as a creator who merges **technology, artificial intelligence, and storytelling**.

The purpose of this website is not just to show projects, but to create a **visual experience** that communicates a creative identity:

> **A developer experimenting with AI-driven storytelling and media.**

The website should feel like a **guided cinematic journey**, where the user scrolls through different parts of Om’s creative and technical world.

The design combines **film-inspired visuals**, **interactive web technology**, and **modern frontend engineering**.

---

# Identity

Primary identity communicated through the website:

**Om is a developer experimenting with AI media.**

Hero message displayed on the site:

```id="k5c2rp"
Hi, I'm Om Lakhani.
I build AI-driven storytelling systems.
```

The entire experience must reinforce this identity by blending **storytelling, technology, and cinematic aesthetics**.

---

# Design Philosophy

The design language should feel:

Creative
Elegant
Cinematic
Minimal
Modern

The website must feel closer to an **interactive digital film experience** rather than a traditional developer portfolio.

Key inspirations include:

• Apple product pages
• modern film studio websites
• cinematic storytelling platforms
• immersive creative portfolios

---

# Visual Style

## Color Palette

Primary background:

```id="l7kshv"
#0b0b0c
```

Accent colors:

• warm cinematic gold
• deep teal / blue highlights

These colors should appear subtly in hover effects, glow accents, and interactive elements.

---

# Cinematic Grain Background

The background must include a **visible film grain texture** inspired by old-school analog cinema.

Characteristics:

• textured film noise
• subtle movement or layered grain
• visible but not distracting
• covers entire page

The effect should resemble **classic film stock rather than digital noise**.

Implementation can use:

CSS noise overlay
SVG noise
Canvas-based grain layer

---

# Website Structure

The website is a **single-page scroll experience**.

Sections appear sequentially as the user scrolls.

Section order:

1. Hero
2. About
3. Skills
4. Services
5. Projects
6. Why Me
7. Footer

Each section must transition smoothly using **scroll-based animations**.

---

# Global Animation Systems

Two visual systems must exist globally across the entire website.

These are not sections.
They must remain active across all sections.

---

# Drone System

A **3D drone model** moves across the page while the user scrolls.

Purpose:

Represents experimentation with technology, filmmaking tools, and cinematic exploration.

Implementation:

Three.js
React Three Fiber
GSAP ScrollTrigger

Drone model location:

```id="2pn6v1"
src/assets/models/drone.glb
```

Drone behavior:

• moves horizontally across the page
• travels left → right → left → right repeatedly
• slight altitude changes
• subtle rotations
• smooth cinematic motion

The drone should feel like it is **exploring the page alongside the user**.

The drone canvas must not block interactions.

Example properties:

```id="6km9i3"
pointer-events: none
position: fixed
```

---

# Film Reel System

A **film reel strip** appears on the right side of the screen.

Purpose:

Visually represent storytelling and filmmaking.

The reel must remain visible across the entire page.

Structure:

• vertical film strip
• sprocket holes
• frame windows

Animation:

When the user scrolls, the reel should appear to **roll continuously**.

Implementation:

SVG + GSAP ScrollTrigger.

Each reel frame represents a project.

Clicking a frame opens the **project modal viewer**.

---

# Hero Section

The hero is the introduction to the portfolio.

Elements include:

Large layered typography behind the portrait.

Example background text:

```id="mrc61t"
OM LAKHANI
CREATIVE
PORTFOLIO
MEETS TECH
```

The portrait appears in the center.

Portrait style:

• circular or rounded frame
• subtle glow or gradient border
• cinematic styling

The hero also includes the introduction text:

```id="g1rv6s"
Hi, I'm Om Lakhani.
I build AI-driven storytelling systems.
```

---

# Cursor Interaction

Subtle cursor motion should influence the hero section.

Mouse movement can affect:

• typography layers
• background lighting
• portrait container

Motion must be minimal and elegant.

No exaggerated animation.

---

# Scroll Experience

Scrolling through the website should feel cinematic.

Use GSAP ScrollTrigger to create:

• section reveal animations
• parallax layers
• smooth transitions

Typical section animation:

opacity 0 → 1
translateY 60px → 0

The scroll experience should feel fluid and immersive.

---

# About Section

The About section introduces Om’s background.

Content themes:

• interest in storytelling
• exploration of AI filmmaking
• experimentation with creative technology

The layout may include:

text blocks
visual separators
scroll animations

---

# Skills Section

The skills section includes an interactive system called the **Skill Tank**.

Skills are grouped into categories:

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

## Skill Tank Interaction

Inside a container, skill elements float freely.

Behavior:

When the cursor moves near a skill:

• the skill moves away
• motion depends on cursor distance
• smooth physics-like interaction

Skills return to original position when the cursor moves away.

---

# Services Section

This section presents services Om can provide.

Examples:

AI Content Creation
Scriptwriting
Video Direction
Web Development
AI Workflow Automation

Each service appears as an animated card.

Card interactions include:

hover glow
slight lift animation
background highlight

---

# Projects System

The Projects section displays Om’s work.

Project data must be stored in:

```id="vtxvcm"
src/data/projects.js
```

Each project includes:

title
description
category
image
media link

Projects appear as cards and also connect to **film reel frames**.

---

# Project Modal Viewer

Clicking a project card or film reel frame opens a modal.

The modal displays:

project title
description
media preview
external link

Modal behavior:

fade-in animation
background dark overlay
close on ESC
close on outside click

---

# Why Me Section

This section explains Om’s strengths.

Example pillars:

Storytelling mindset
AI experimentation
Technical implementation

These pillars should be presented as animated cards.

---

# Footer

The website will **not include a contact form**.

The footer must contain clickable links to:

GitHub
LinkedIn
Instagram
Twitter (X)
Email

These must appear as **icon-based hyperlinks**.

Optional button:

Download Resume.

---

# Sound Design

The website includes subtle cinematic audio.

Audio types:

ambient background sound
film reel sound
drone hum sound

All sounds must be:

low volume
non-intrusive
looped

A sound toggle button must allow users to mute audio.

---

# Mobile Responsiveness

The site must work smoothly on:

desktop
tablet
mobile

Adjustments include:

reduced animation intensity
simplified drone motion
film reel becomes horizontal slider
skill tank supports touch input

---

# Performance Requirements

Performance must remain smooth.

Key requirements:

lazy loading for heavy assets
optimized images
efficient animation loops

Target performance:

**60fps on desktop devices**

---

# Final Goal

The finished website should feel like a **cinematic journey through Om’s creative and technical work**.

Visitors should leave understanding that Om builds:

**AI-powered storytelling experiences that combine creativity with technology.**
