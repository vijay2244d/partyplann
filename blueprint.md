# Project Blueprint

## Overview

This project is a modern, content-focused website for "Party Time," a party planning service. It is built with Astro.js, a static-first web framework, and designed to be highly performant and SEO-friendly. The user interface is clean, modern, and interactive, featuring a unique navigation system and a dynamic theme that can be toggled by the user.

## Core Technologies

- **Framework:** Astro.js
- **Styling:** CSS with a utility-first approach and a dark/light theme switcher.
- **Interactivity:** Vanilla JavaScript for UI enhancements and animations.
- **Deployment:** The project is configured for Firebase Studio and can be easily deployed to Firebase Hosting.

## Key Features & Design Elements

- **Responsive Design:** The layout adapts seamlessly to all screen sizes, from mobile to desktop.
- **Modern Aesthetics:** The design incorporates a bold color palette, custom fonts (Pacifico and Poppins), and subtle animations to create a visually appealing experience.
- **Interactive Dock Navigation:** The primary navigation is a macOS-style dock that is initially hidden at the bottom of the screen. It slides into view when the user hovers over its trigger area and can be dragged and repositioned anywhere on the screen.
- **Dynamic Theme:** Users can toggle between a light and dark theme by clicking the "Party Time" logo in the header. The selected theme is saved in local storage for a persistent experience.
- **Engaging Hero Section:** The home page features a full-screen hero section with an animated, gradient background and a "popper blast" text effect that animates the title into view.
- **Leaflet.js Map Integration:** The contact page includes an interactive map to display the business location.
- **Component-Based Architecture:** The project is built with a modular structure, using reusable Astro components for the header, footer, dock, and other UI elements.
- **Optimized for Performance:** By leveraging Astro's server-first approach, the site delivers minimal JavaScript by default, resulting in fast load times and excellent Core Web Vitals.
- **View Transitions:** Enabled Astro's View Transitions to provide smooth animations between page navigations.
- **Dynamic Contact Page Splash Screen:** The contact page features a full-screen, animated gradient intro. A large, shaking phone icon flies in, and the "Get in Touch!" greeting animates into view using the same "popper blast" effect from the home page. The user must click to dismiss the splash screen, which then shrinks and fades out to reveal the page content.

## Current Implementation Plan

### Objective: Unify Animations by Applying Popper Blast to Contact Page

1.  **Copy Popper Blast Animation:** The CSS keyframes (`popper-blast-in`) and the JavaScript function (`setupPopperAnimation`) were copied from the home page (`index.astro`) to the contact page (`contact.astro`).
2.  **Apply Animation to Greeting:** The `blast-text` class was added to the `h1` element containing the "Get in Touch!" greeting, and the `setupPopperAnimation()` function is now called when the page loads.
3.  **Trigger Animation on Load:** The `setupPopperAnimation()` function is triggered by the `astro:page-load` event, ensuring the text animation runs immediately as the splash screen appears.
4.  **Maintain Layered Animations:** The existing "fly-in" animation for the phone icon and the continuous "shake" animation are preserved, creating a layered and visually rich intro sequence.
5.  **Achieve Brand Consistency:** This change ensures that the primary text animation style is consistent across both the home and contact pages, reinforcing the site's dynamic brand identity.