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

## Current Implementation Plan

### Objective: Implement a Draggable, Auto-Hiding Navigation Dock

1.  **Simplify Header:** Remove the main navigation links from the `<Header />` component, leaving only the logo and a "Get a Quote" button.
2.  **Create Dock Component:** Build a new `<Dock />` component to serve as the primary navigation. This component will feature icons for each page (Home, Services, About, etc.).
3.  **Style the Dock:** Design the dock with a modern, glass-like effect using `backdrop-filter`. Implement a magnification effect on the icons when the user hovers over them.
4.  **Implement Drag-and-Drop:** Add JavaScript to allow the user to drag and drop the dock anywhere on the screen. The dock's position will be constrained to the viewport to prevent it from being moved off-screen.
5.  **Auto-Hiding Behavior:** Modify the dock's CSS and JavaScript to make it auto-hiding. The dock will be positioned mostly off-screen at the bottom and will slide into view when the user hovers over its designated trigger area. The hover-to-reveal functionality will be disabled while the dock is being dragged.

This plan ensures the creation of a unique and intuitive navigation system that enhances the user experience while maintaining the site's modern and interactive feel.