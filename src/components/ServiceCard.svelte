<script>
  export let service;

  let isOverlayActive = false;

  // Interactive animation states
  let weddingAnimationStep = 0;
  let birthdayAnimationStep = 0;
  let corporateAnimationStep = 0;
  let anniversaryAnimationStep = 0; // 0: idle, 1: doodle, 2: filled, 3: explosion
  let isCandleLit = true;

  function openOverlay() {
    isOverlayActive = true;
    document.body.style.overflow = 'hidden';
    switch (service.id) {
      case 'wedding': weddingAnimationStep = 1; break;
      case 'birthday': birthdayAnimationStep = 1; break;
      case 'corporate': corporateAnimationStep = 1; break;
      case 'anniversary': anniversaryAnimationStep = 1; break;
    }
  }

  function closeOverlay() {
    isOverlayActive = false;
    document.body.style.overflow = 'auto';
    setTimeout(() => {
      // Reset all animation states
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
        if (weddingAnimationStep === 1) {
          weddingAnimationStep = 2;
          setTimeout(() => { window.location.href = '/contact'; }, 1500);
        }
        break;
      case 'birthday':
        if (birthdayAnimationStep === 1) {
          isCandleLit = false;
          birthdayAnimationStep = 2;
          setTimeout(() => { window.location.href = '/contact'; }, 1200);
        }
        break;
      case 'corporate':
        if (corporateAnimationStep === 1) {
          corporateAnimationStep = 2;
          setTimeout(() => { window.location.href = '/contact'; }, 1500);
        }
        break;
      case 'anniversary':
        if (anniversaryAnimationStep === 1) {
          anniversaryAnimationStep = 2; // Fill the heart
          setTimeout(() => {
            anniversaryAnimationStep = 3; // Start rain
            setTimeout(() => {
              window.location.href = '/contact';
            }, 5500);
          }, 600); // Wait for fill animation
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
  <div class="overlay-container" role="dialog" aria-modal="true">
    <button class="close-btn" on:click={closeOverlay}>×</button>

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
            <defs>
              <clipPath id="circle-clip"><circle cx="100" cy="100" r="90"></circle></clipPath>
            </defs>
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
            <!-- Increased Volume of Hearts -->
            <div class="particle">❤️</div><div class="particle">❤️</div><div class="particle">❤️</div><div class="particle">❤️</div><div class="particle">❤️</div><div class="particle">❤️</div><div class="particle">❤️</div><div class="particle">❤️</div><div class="particle">❤️</div><div class="particle">❤️</div><div class="particle">❤️</div><div class="particle">❤️</div><div class="particle">❤️</div><div class="particle">❤️</div><div class="particle">❤️</div><div class="particle">❤️</div><div class="particle">❤️</div><div class="particle">❤️</div><div class="particle">❤️</div><div class="particle">❤️</div><div class="particle">❤️</div><div class="particle">❤️</div><div class="particle">❤️</div><div class="particle">❤️</div><div class="particle">❤️</div><div class="particle">❤️</div><div class="particle">❤️</div><div class="particle">❤️</div><div class="particle">❤️</div><div class="particle">❤️</div><div class="particle">❤️</div><div class="particle">❤️</div><div class="particle">❤️</div><div class="particle">❤️</div><div class="particle">❤️</div><div class="particle">❤️</div>
          </div>
        {/if}
        {#if anniversaryAnimationStep === 1}<p class="instruction">Click to celebrate</p>{/if}
      </div>
    {/if}
  </div>
{/if}

<style>
  /* --- Common Styles --- */
  .grid-card { background: #fff; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.07); padding: 2rem; text-align: center; cursor: pointer; transition: transform 0.3s ease, box-shadow 0.3s ease; height: 300px; display: flex; flex-direction: column; align-items: center; justify-content: center; }
  .grid-card:hover { transform: translateY(-8px); box-shadow: 0 15px 40px rgba(196, 167, 231, 0.4); }
  .grid-card-icon .icon { font-size: 5rem; line-height: 1; display: block; }
  .grid-card-title { font-size: 1.6rem; font-weight: 700; color: #333; margin-top: 1.5rem; }
  .overlay-container { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(249, 244, 251, 0.95); backdrop-filter: blur(10px); z-index: 100; display: flex; flex-direction: column; align-items: center; justify-content: center; animation: fade-in 0.5s ease-out; overflow: hidden; }
  .close-btn { position: absolute; top: 2rem; right: 2.5rem; background: none; border: none; font-size: 3.5rem; font-weight: 300; color: #333; cursor: pointer; z-index: 110; }
  .instruction { font-size: 1.2rem; color: #888; margin-top: 1rem; cursor: pointer; text-align: center; }
  .animation-title { font-size: 2rem; font-weight: 700; color: #333; text-align: center; margin-top: 2rem; }
  .wedding-container, .birthday-container, .corporate-container, .anniversary-container { width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; cursor: pointer; }
  .birthday-interaction { display: flex; flex-direction: column; align-items: center; justify-content: center; }
  .cake, .employee, .rings-colliding, .heart-doodle { width: 300px; height: 300px; overflow: visible; }
  
  /* --- Wedding Animation --- */
  .wedding-container.step-2 .ring-1, .wedding-container.step-2 .ring-2 { animation-duration: 1s; animation-timing-function: cubic-bezier(0.68, -0.55, 0.27, 1.55); animation-fill-mode: forwards; }
  /* ... wedding animation keyframes ... */

  /* --- Birthday Animation --- */
  .flame.is-lit { animation: flicker 0.7s ease-in-out infinite alternate; }
  .smoke g { fill: #A9A9A9; animation: puff-out 1.2s ease-out forwards; }
  @keyframes flicker { from { opacity: 0.85; } to { opacity: 1; } }
  @keyframes puff-out { from { transform: scale(0.5) translateY(0); opacity: 0; } to { transform: scale(2.5) translateY(-25px); opacity: 0; } }

  /* --- Corporate Animation --- */
  .corporate-interaction.step-1 .employee { animation: subtle-bob 2.5s ease-in-out infinite; }
  @keyframes subtle-bob { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-10px) scale(1.05); } }

  /* --- Anniversary Animation --- */
  .anniversary-container .heart-doodle path { stroke: #e5a9e5; stroke-width: 2; fill: transparent; transition: fill 0.5s ease-in-out; }
  .anniversary-container.step-2 .heart-doodle path, .anniversary-container.step-3 .heart-doodle path { fill: #FF4757; stroke: #FF4757; }
  .anniversary-container.step-3 .heart-doodle { animation: heart-throb 0.5s ease-in-out infinite alternate; }
  .heart-particles { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; }
  .particle { position: absolute; top: 50%; left: 50%; opacity: 0; animation: spill 3s forwards; }
  @keyframes heart-throb { to { transform: scale(1.05); } }
  @keyframes spill {
    0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
    50% { transform: translate(var(--x-mid), var(--y-mid)) scale(1); opacity: 1; }
    100% { transform: translate(var(--x-end), 100vh) scale(0.8); opacity: 1; }
  }
  /* Add unique properties for each particle */
  .particle:nth-child(odd) { animation-timing-function: cubic-bezier(0.3, 0.9, 0.8, 0.1); }
  .particle:nth-child(even) { animation-timing-function: cubic-bezier(0.6, 0.1, 0.1, 0.9); }
  .particle:nth-child(1) { --x-mid: -80vw; --y-mid: -30vh; --x-end: -60vw; }
  .particle:nth-child(2) { --x-mid: 80vw; --y-mid: -25vh; --x-end: 60vw; }
  /* ... Add many more particle variations for a fuller effect ... */

  /* --- Mobile Responsiveness --- */
  @media (max-width: 768px) {
    .grid-card { height: 250px; padding: 1.5rem; }
    .grid-card-title { font-size: 1.4rem; }
    .grid-card-icon .icon { font-size: 4rem; }
    .cake, .employee, .rings-colliding, .heart-doodle { width: 220px; height: 220px; }
    .animation-title { font-size: 1.5rem; }
    .instruction { font-size: 1rem; }
    .close-btn { font-size: 3rem; top: 1.5rem; right: 1.5rem; }
  }
</style>
