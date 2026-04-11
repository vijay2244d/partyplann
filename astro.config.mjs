// @ts-check

import preact from '@astrojs/preact';
import react from '@astrojs/react';
import solid from '@astrojs/solid-js';
import svelte from '@astrojs/svelte';
import vue from '@astrojs/vue';
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://vijay2244d.github.io',
  base: '/partyplann',
  
  // Enable many frameworks to support all different kinds of components.
  integrations: [
      preact({ include: ['**/preact/*'] }),
      solid({ include: ['**/solid/*'] }),
      react({ include: ['**/react/*'] }), // Restrict React to its own folder to prevent conflicts
      svelte(), // Allow svelte to be used anywhere
      vue({ include: ['**/vue/*'] }),
	],

  vite: {
    plugins: [tailwindcss()],
  },
});
