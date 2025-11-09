# Project Blueprint

## Overview

This project is a static-first web application built with Astro.js for a party business. The goal is to create a visually appealing and highly performant website that attracts customers and showcases the services offered.

## Design and Features

### Style and Design

*   **Color Palette:** A vibrant and energetic color palette is used to create a fun and exciting atmosphere. The primary colors are bright pinks, purples, and blues, with accents of gold and silver.
*   **Typography:** A playful and modern font pairing (Poppins) is used to enhance the website's personality.
*   **Animations:** Subtle animations are used throughout the website to create a dynamic and engaging user experience. This includes on-scroll animations, hover effects, and a hero section with an animated background.
*   **Iconography:** Custom icons are used to represent the different services offered.

### Features

*   **Hero Section:** A full-screen hero section with a captivating headline, a call-to-action button, and an animated background.
*   **Services Section:** A section showcasing the different party services offered, with custom icons and brief descriptions.
*   **Gallery Section:** A gallery of images from past parties.
*   **About Us Section:** A section introducing the team and the story behind the business.
*   **Contact Section:** A contact form and contact information.
*   **Navigation:** A clear and intuitive navigation bar.

## Implemented Changes

1.  **Updated `index.astro`:**
    *   Added a new HTML structure with a hero section, services section, and a footer.
    *   Incorporated a vibrant color scheme with a gradient background.
    *   Used a modern, playful font (Poppins).
    *   Added animations to the hero section and other elements.
2.  **Updated `global.css`:**
    *   Added new styles for the updated `index.astro`.
    *   Added styles for the new color palette, fonts, and animations.
3.  **Added New Files:**
    *   Created a `Header.astro` component for the navigation bar.
    *   Created a `Footer.astro` component.
    *   Created a `Services.astro` component.
    *   Added SVG icons for the services section in `public/icons/`
