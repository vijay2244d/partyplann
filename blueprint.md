# Project Blueprint

## Overview

A visually stunning and high-performing website for AstroParty, a party planning business.

## Design & Features

*   **Branding:** Elegant, celebratory, and personal, reflecting the AstroParty brand.
*   **Performance:** A fast and responsive user experience.
*   **Visual Enhancements:** A multi-layered, vibrant aurora background effect and consistent, well-proportioned typography.

## Current Plan: Performance Overhaul & Feature Correction

**Goal:** Drastically improve site loading speed, fix the broken contact page map, and implement a redesigned, functional theme switcher integrated into the site logo.

**Action Plan:**

1.  **Performance Optimization:**
    *   Diagnose the root cause of the slow load times, focusing on the homepage's aurora background effect.
    *   Re-implement the background effect with a more performant CSS solution to ensure a fast, fluid user experience.

2.  **Fix Contact Page Map:**
    *   Troubleshoot the map initialization script on `contact.astro`.
    *   Ensure the Leaflet.js library is loaded correctly and the map displays reliably.

3.  **Redesign Theme Switcher:**
    *   Remove the existing `ThemeSwitcher.astro` component entirely.
    *   Modify the `Header.astro` component to remove the old switcher.
    *   Integrate the theme-switching functionality directly into the "Party Time" logo.
    *   Update the global script in `MainLayout.astro` to handle theme toggling when the logo is clicked, ensuring the change is persisted in `localStorage`.

4.  **Final Verification:**
    *   Perform a final check to confirm all fixes are implemented, the site is fast, all features work as expected, and no new errors have been introduced.
