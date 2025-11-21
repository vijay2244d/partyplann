# Project Blueprint

## Overview

A visually stunning and high-performing website for AstroParty, a party planning business.

## Design & Features

*   **Branding:** Elegant, celebratory, and personal, reflecting the AstroParty brand.
*   **Performance:** A fast and responsive user experience.
*   **Visual Enhancements:** A multi-layered, vibrant aurora background effect and consistent, well-proportioned typography.

## Current Plan: Contact Page Redesign & Theme Fix

**Goal:** Overhaul the contact page to match a new, professional design and fix the broken theme-switching functionality.

**Action Plan:**

1.  **Fix Theme Switcher:**
    *   Audit all components for hardcoded color values.
    *   Update component styles to use the centrally-defined CSS theme variables from `MainLayout.astro`.
    *   Ensure that all visual elements respond correctly to the light/dark mode switch.
2.  **Redesign Contact Page:**
    *   Re-implement the `contact.astro` page based on the provided design image.
    *   Create a two-column layout featuring the contact form on the left, and contact information and the interactive map on the right.
    *   Remove the previous full-screen entry animation for a more direct user experience.
    *   Ensure the new design is fully responsive and works seamlessly with the now-functional theme switcher.
