<script>
  import { onMount } from 'svelte';
  export let service;

  let isOverlayActive = false;
  let cardRect = {};

  // Interactive animation states
  let weddingAnimationStep = 0;
  let birthdayAnimationStep = 0;
  let corporateAnimationStep = 0;
  let anniversaryAnimationStep = 0;
  let isCandleLit = true;

  let anniversaryParticles = [];
  $: if (service.id === 'anniversary') {
    anniversaryParticles = Array.from({ length: 40 }).map((_, i) => {
      const angle = (i / 40) * 2 * Math.PI;
      const radius = 150 + Math.random() * 100;
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        delay: Math.random() * 0.2,
        size: 1 + Math.random() * 1.5,
      };
    });
  }

  function openOverlay(event) {
    const card = event.currentTarget;
    cardRect = card.getBoundingClientRect();
    isOverlayActive = true;
    document.body.style.overflow = 'hidden';
    
    requestAnimationFrame(() => {
      switch (service.id) {
        case 'wedding': weddingAnimationStep = 1; break;
        case 'birthday': birthdayAnimationStep = 1; break;
        case 'corporate': corporateAnimationStep = 1; break;
        case 'anniversary': anniversaryAnimationStep = 1; break;
      }
    });
  }

  function closeOverlay() {
    isOverlayActive = false;
    document.body.style.overflow = 'auto';
    setTimeout(() => {
      isCandleLit = true;
      weddingAnimationStep = 0;
      birthdayAnimationStep = 0;
      corporateAnimationStep = 0;
      anniversaryAnimationStep = 0;
    }, 500);
  }

  function handleInteraction(type) {
    switch (type) {
      case 'wedding':
        if (weddingAnimationStep === 1) { weddingAnimationStep = 2; setTimeout(() => { window.location.href = '/contact'; }, 2000); }
        break;
      case 'birthday':
        if (birthdayAnimationStep === 1) { isCandleLit = false; birthdayAnimationStep = 2; setTimeout(() => { window.location.href = '/contact'; }, 1200); }
        break;
      case 'corporate':
        if (corporateAnimationStep === 1) { corporateAnimationStep = 2; setTimeout(() => { window.location.href = '/contact'; }, 1500); }
        break;
      case 'anniversary':
        if (anniversaryAnimationStep === 1) {
          anniversaryAnimationStep = 2;
          setTimeout(() => {
            anniversaryAnimationStep = 3;
            setTimeout(() => { window.location.href = '/contact'; }, 4000);
          }, 500);
        }
        break;
    }
  }
</script>

<!-- Grid Card -->
<div class="grid-card" on:click={openOverlay}>
  <div class="grid-card-icon"><span class="icon">{service.icon}</span></div>
  <h3 class="grid-card-title">{service.title}</h3>
</div>

<!-- Full-Screen Overlay -->
{#if isOverlayActive}
  <div 
    class="overlay-container"
    style="--top: {cardRect.top}px; --left: {cardRect.left}px; --width: {cardRect.width}px; --height: {cardRect.height}px;"
    class:is-active={isOverlayActive}
    role="dialog" 
    aria-modal="true"
  >
    <button class="close-btn" on:click={closeOverlay}>×</button>
    <div class="overlay-content">
      {#if service.id === 'wedding'}
        <div class="wedding-container step-{weddingAnimationStep}" on:click={() => handleInteraction('wedding')}>
          <svg class="rings-colliding" viewBox="-10 -10 120 120">
            <g class="ring-1"><circle cx="50" cy="50" r="25" stroke="#C0C0C0" stroke-width="8" fill="none"/></g>
            <g class="ring-2"><circle cx="50" cy="50" r="25" stroke="#FFD700" stroke-width="8" fill="none"/></g>
          </svg>
          {#if weddingAnimationStep === 1}<p class="instruction">Click to Unite</p>{/if}
        </div>
      {:else if service.id === 'birthday'}
        <div class="birthday-container" on:click={() => handleInteraction('birthday')}>
          <div class="birthday-interaction">
            <svg class="cake" viewBox="0 0 100 100">
              <g class="cake-body">
                <rect x="10" y="60" width="80" height="35" rx="5" fill="#F0E4D7"/>
                <rect x="20" y="35" width="60" height="25" rx="5" fill="#F9A8D4"/>
                <rect x="10" y="60" width="80" height="10" fill="#F472B6"/>
              </g>
              <rect x="47.5" y="15" width="5" height="20" fill="#FFFFFF"/>
              {#if isCandleLit}
                <g class="flame is-lit"><path d="M50 15 Q52.5 10 50 5 Q47.5 10 50 15Z" fill="#FFD700"/></g>
              {:else}
                <g class="smoke"><circle cx="50" cy="5" r="3"/><circle cx="52" cy="1" r="4"/><circle cx="48" cy="-3" r="3.5"/></g>
              {/if}
            </svg>
            <h3 class="animation-title">{service.title}</h3>
          </div>
          {#if birthdayAnimationStep === 1}<p class="instruction">Click to make a wish!</p>{/if}
        </div>
      {:else if service.id === 'corporate'}
        <div class="corporate-container" on:click={() => handleInteraction('corporate')}>
          <div class="corporate-interaction step-{corporateAnimationStep}">
            <svg class="employee" viewBox="0 0 200 200">
              <defs><clipPath id="circle-clip"><circle cx="100" cy="100" r="90"></circle></clipPath></defs>
              <circle cx="100" cy="100" r="95" fill="none" stroke="#2C3E50" stroke-width="10"></circle>
              <g clip-path="url(#circle-clip)">
                <path fill="#2C3E50" d="M100 110c-16.5 0-30 13.5-30 30v40h60v-40c0-16.5-13.5-30-30-30zm-15 45v-15c0-8.3 6.7-15 15-15s15 6.7 15 15v15h-30z"></path>
                <path fill="#2C3E50" d="M100 20c-16.5 0-30 13.5-30 30s13.5 30 30 30 30-13.5 30-30-13.5-30-30-30zm0 45c-8.3 0-15-6.7-15-15s6.7-15 15-15 15 6.7 15 15-6.7 15-15 15z"></path>
                <path fill="#2C3E50" d="M92.5 90 C 95 95, 105 95, 107.5 90 L 115 120 L 85 120 Z"></path>
              </g>
            </svg>
          </div>
          <h3 class="animation-title">{service.title}</h3>
          {#if corporateAnimationStep === 1}<p class="instruction">Click to get started</p>{/if}
        </div>
      {:else if service.id === 'anniversary'}
        <div class="anniversary-container step-{anniversaryAnimationStep}" on:click={() => handleInteraction('anniversary')}>
          <svg class="heart-doodle" viewBox="0 0 100 100"><path d="M50,30 C25,10 0,35 50,70 C100,35 75,10 50,30 Z"></path></svg>
          {#if anniversaryAnimationStep === 3}
            <div class="heart-particles">
              {#each anniversaryParticles as particle}
                <div 
                  class="particle" 
                  style="--x: {particle.x}px; --y: {particle.y}px; animation-delay: {particle.delay}s; font-size: {particle.size}rem;"
                ></div>
              {/each}
            </div>
          {/if}
          {#if anniversaryAnimationStep === 1}<p class="instruction">Click to celebrate</p>{/if}
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  /* Base & Overlay Styles */
  .grid-card { background: #fff; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.07); padding: 2rem; text-align: center; cursor: pointer; transition: transform 0.3s ease, box-shadow 0.3s ease; display: flex; flex-direction: column; align-items: center; justify-content: center; will-change: transform; }
  .grid-card:hover { transform: translateY(-8px); box-shadow: 0 15px 40px rgba(196, 167, 231, 0.4); }
  .grid-card-icon .icon { font-size: 6.5rem; line-height: 1; color: #8a4baf; }
  .grid-card-title { font-size: 1.6rem; font-weight: 700; color: #333; margin-top: 1.5rem; }
  
  .overlay-container { position: fixed; top: var(--top); left: var(--left); width: var(--width); height: var(--height); background-color: rgba(249, 244, 251, 0.95); backdrop-filter: blur(10px); z-index: 100; overflow: hidden; border-radius: 20px; will-change: top, left, width, height, border-radius; transition: top 0.5s ease-in-out, left 0.5s ease-in-out, width 0.5s ease-in-out, height 0.5s ease-in-out, border-radius 0.5s ease-in-out; }
  .overlay-container.is-active { top: 0; left: 0; width: 100vw; height: 100vh; border-radius: 0; }
  .overlay-content { width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; opacity: 0; transform: scale(0.8); transition: opacity 0.4s 0.3s ease, transform 0.4s 0.3s ease; }
  .overlay-container.is-active .overlay-content { opacity: 1; transform: scale(1); }
  .close-btn { position: absolute; top: 2rem; right: 2.5rem; background: none; border: none; font-size: 3.5rem; color: #333; cursor: pointer; z-index: 110; opacity: 0; transition: opacity 0.3s 0.5s ease; }
  .overlay-container.is-active .close-btn { opacity: 1; }
  .instruction { font-size: 1.2rem; color: #888; margin-top: 1rem; cursor: pointer; text-align: center; }
  .animation-title { font-size: 2rem; font-weight: 700; color: #333; text-align: center; margin-top: 2rem; }
  .cake, .employee, .rings-colliding, .heart-doodle { width: 60vmin; height: 60vmin; max-width: 400px; max-height: 400px; overflow: visible; will-change: transform, opacity; }

  /* --- Animation-Specific Styles --- */

  /* Wedding */
  .wedding-container { width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; cursor: pointer; }
  .rings-colliding .ring-1, .rings-colliding .ring-2 { transition: transform 1s cubic-bezier(0.68, -0.55, 0.27, 1.55); transform-origin: center; opacity: 0; transform: scale(0.5); }
  .wedding-container.step-1 .ring-1 { transform: translateX(-80px) scale(0.8); opacity: 1; }
  .wedding-container.step-1 .ring-2 { transform: translateX(80px) scale(0.8); opacity: 1; transition-delay: 0.1s; }
  .wedding-container.step-2 .ring-1 { transform: translateX(-15px) scale(1); opacity: 1; }
  .wedding-container.step-2 .ring-2 { transform: translateX(15px) scale(1); opacity: 1; }
  .wedding-container.step-2 .rings-colliding { animation: flash-bright 1.5s ease-out 0.5s forwards; }
  @keyframes flash-bright { 0% { filter: none; } 50% { filter: drop-shadow(0 0 35px gold) brightness(1.7); transform: scale(1.1); } 100% { filter: drop-shadow(0 0 15px gold) brightness(1.2); transform: scale(1.05); } }

  /* Birthday */
  .birthday-container { width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; cursor: pointer; }
  .flame.is-lit { animation: flicker 1.5s infinite; }
  @keyframes flicker { 0%, 100% { transform: scaleY(1); opacity: 1; } 50% { transform: scaleY(0.95) skewX(5deg); opacity: 0.9; } }
  .smoke { animation: drift-up 2s ease-out forwards; }
  @keyframes drift-up { from { opacity: 1; transform: translateY(0) scale(1); } to { opacity: 0; transform: translateY(-30px) scale(2); } }

  /* Corporate */
  .corporate-container { width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; cursor: pointer; }
  .corporate-interaction.step-2 .employee { animation: pop-in 1s forwards; }
  @keyframes pop-in { 0% { transform: scale(0.8); } 100% { transform: scale(1); } }

  /* Anniversary */
  .anniversary-container { width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; cursor: pointer; position: relative; }
  .heart-doodle path { fill: transparent; stroke: #e11d48; stroke-width: 2; transition: fill 0.5s ease-in-out; }
  .anniversary-container.step-2 .heart-doodle path, .anniversary-container.step-3 .heart-doodle path { fill: #e11d48; }
  .anniversary-container.step-2 .heart-doodle, .anniversary-container.step-3 .heart-doodle { transform: scale(1.1); filter: drop-shadow(0 0 20px #e11d48); transition: transform 0.5s ease, filter 0.5s ease; }
  
  .heart-particles { 
    position: absolute; 
    top: 50%; 
    left: 50%; 
    width: 1px; 
    height: 1px; 
  }

  .heart-particles .particle {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    transform-origin: center;
    animation: heart-burst 1.2s cubic-bezier(0.17, 0.89, 0.32, 1.28) forwards;
  }
  
  .heart-particles .particle::before {
    content: '❤️';
    position: absolute;
    left: -1rem;
    top: -1rem;
    font-size: inherit;
  }

  @keyframes heart-burst {
    0% {
      transform: translate(-50%, -50%) scale(0.5);
      opacity: 1;
    }
    100% {
      transform: translate(var(--x), var(--y)) scale(0);
      opacity: 0;
    }
  }

  /* --- Responsive Styles --- */
  @media (max-width: 768px) {
    .grid-card-icon .icon { font-size: 5rem; }
    .grid-card-title { font-size: 1.4rem; }
    .cake, .employee, .rings-colliding, .heart-doodle { width: 85vmin; height: 85vmin; max-width: 90vw; max-height: 90vw; }
    .animation-title { font-size: 1.5rem; }
    .instruction { font-size: 1rem; }
    .close-btn { font-size: 4rem; top: 1rem; right: 1.5rem; }
  }
</style>