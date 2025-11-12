<script>
  export let service;

  let isOverlayActive = false;
  let isFlipped = false; // This will now control the state inside the overlay

  // Animation-specific states
  let isCandleLit = true;
  let isWeddingAnimated = false;

  function openOverlay() {
    isOverlayActive = true;
    // Lock body scroll when overlay is active
    document.body.style.overflow = 'hidden';
  }

  function closeOverlay() {
    isOverlayActive = false;
    document.body.style.overflow = 'auto';
    // Reset all states after a delay to allow for the fade-out animation
    setTimeout(() => {
      isFlipped = false;
      isCandleLit = true;
      isWeddingAnimated = false;
    }, 500);
  }

  function handleInteraction() {
    if (isFlipped) return;

    if (service.id === 'birthday') {
      if (isCandleLit) {
        isCandleLit = false;
        setTimeout(() => { isFlipped = true; }, 800);
      }
    } else if (service.id === 'wedding') {
      if (!isWeddingAnimated) {
        isWeddingAnimated = true;
        setTimeout(() => { isFlipped = true; }, 1500);
      }
    } else {
      isFlipped = true;
    }
  }

</script>

<!-- The card visible in the grid -->
<div class="grid-card" on:click={openOverlay}>
  <div class="grid-card-icon">
    <span class="icon">{service.icon}</span>
  </div>
  <h3 class="grid-card-title">{service.title}</h3>
</div>

<!-- The full-screen overlay -->
{#if isOverlayActive}
  <div class="overlay-container" role="dialog" aria-modal="true">
    <button class="close-btn" on:click={closeOverlay}>×</button>
    
    <div class="scene-full-screen">
      <div class="card {isFlipped ? 'is-flipped' : ''}">
        <!-- Front of the Card (Animation Side) -->
        <div class="card-face card-front" on:click={handleInteraction}>
          <div class="animation-container">

            {#if service.id === 'birthday'}
              <div class="birthday-interaction">
                <svg class="cake" viewBox="0 0 100 100">
                  <rect x="20" y="60" width="60" height="30" fill="#FFDDC1"/><rect x="20" y="60" width="60" height="10" fill="#F9A8D4"/><rect x="47.5" y="40" width="5" height="20" fill="#FFFFFF"/>
                  {#if isCandleLit}<g class="flame is-lit"><path d="M50 40 Q52.5 35 50 30 Q47.5 35 50 40Z" fill="#FFD700"/></g>{:else}<g class="smoke"><circle cx="50" cy="28" r="2" fill="#A9A9A9"/><circle cx="52" cy="24" r="3" fill="#A9A9A9"/><circle cx="48" cy="20" r="2.5" fill="#A9A9A9"/></g>{/if}
                </svg>
                <p class="instruction">{isCandleLit ? 'Click the flame to make a wish!' : 'Wish granted!'}</p>
              </div>

            {:else if service.id === 'wedding'}
              <div class="wedding-interaction {isWeddingAnimated ? 'is-animating' : ''}">
                <svg class="rings" viewBox="0 0 100 100"><circle cx="43" cy="50" r="18" stroke="#C0C0C0" stroke-width="5" fill="none"/><circle cx="57" cy="50" r="18" stroke="#FFD700" stroke-width="5" fill="none"/></svg>
                <p class="instruction">Click the rings to begin</p>
              </div>

            {:else if service.id === 'corporate'}
              <div class="corporate-interaction">
                <svg class="briefcase" viewBox="0 0 100 100"><rect x="20" y="35" width="60" height="45" rx="5" fill="#5A4F4F"/><rect x="15" y="40" width="70" height="10" fill="#4A3F3F"/><rect x="45" y="25" width="10" height="10" fill="#C0C0C0"/></svg>
                <p class="instruction">Click to open</p>
              </div>

            {:else}
              <div class="default-interaction"><span class="default-icon">{service.icon}</span></div>
            {/if}

            <h3 class="animation-title">{service.title}</h3>
          </div>
        </div>

        <!-- Back of the Card (Form Side) -->
        <div class="card-face card-back">
          <h3 class="card-title-back">{service.title}</h3>
          <p class="card-description">{service.description}</p>
          <form class="service-form" on:submit|preventDefault>
            <textarea placeholder="Tell us more..." on:click|stopPropagation></textarea>
            <button type="submit" class="submit-btn" on:click|stopPropagation>Send Inquiry</button>
          </form>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  /* --- Grid Card Styles --- */
  .grid-card {
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.07);
    padding: 2rem;
    text-align: center;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .grid-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 40px rgba(196, 167, 231, 0.4);
  }
  .grid-card-icon .icon {
    font-size: 5rem;
    line-height: 1;
    display: block;
  }
  .grid-card-title {
    font-size: 1.6rem;
    font-weight: 700;
    color: #333;
    margin-top: 1.5rem;
  }

  /* --- Full-Screen Overlay Styles --- */
  .overlay-container {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background-color: rgba(249, 244, 251, 0.95);
    backdrop-filter: blur(10px);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fade-in 0.5s ease-out;
  }
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .close-btn {
    position: absolute;
    top: 2rem; right: 2.5rem;
    background: none; border: none;
    font-size: 3.5rem; font-weight: 300;
    color: #333;
    cursor: pointer; z-index: 110;
    transition: transform 0.3s ease;
  }
  .close-btn:hover { transform: scale(1.1); }

  /* --- Overlay Content (Scene & Card) --- */
  .scene-full-screen { width: 400px; height: 400px; perspective: 1500px; }
  .card { width: 100%; height: 100%; position: relative; transform-style: preserve-3d; transition: transform 0.8s cubic-bezier(0.76, 0, 0.24, 1); }
  .card.is-flipped { transform: rotateY(180deg); }
  .card-face { position: absolute; width: 100%; height: 100%; backface-visibility: hidden; border-radius: 20px; background: #fff; box-shadow: 0 15px 45px rgba(0,0,0,0.15); display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; }
  .card-front { cursor: pointer; }
  .card-back { transform: rotateY(180deg); padding: 2.5rem; }

  /* --- Animations within Overlay --- */
  .animation-container { width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 2rem; }
  .animation-title { font-size: 2rem; font-weight: 700; color: #333; margin-top: auto; }
  .instruction { font-size: 1rem; color: #888; margin-top: 1rem; }
  .cake, .rings, .briefcase { width: 200px; height: 200px; }
  .default-icon { font-size: 7rem; }

  /* (Existing animation keyframes for cake, rings, briefcase go here) */
  .flame.is-lit { animation: flicker 1s ease-in-out infinite alternate; }
  @keyframes flicker { 0% { opacity: 1; } 50% { opacity: 0.8; } 100% { opacity: 1; } }
  .smoke { animation: puff-out 0.8s ease-out forwards; transform-origin: 50% 100%; }
  @keyframes puff-out { 0% { transform: scale(0.5); opacity: 0; } 50% { transform: scale(1.2); opacity: 0.5; } 100% { transform: scale(2) translateY(-15px); opacity: 0; } }
  .wedding-interaction.is-animating .rings { animation: ring-pulse 1.5s ease-out forwards; }
  @keyframes ring-pulse {
    0% { transform: scale(1); filter: drop-shadow(0 0 0px #fff); }
    50% { transform: scale(1.1); filter: drop-shadow(0 0 15px #FFD700); }
    100% { transform: scale(1.1); filter: drop-shadow(0 0 15px #FFD700); opacity: 1; }
  }
  .corporate-interaction .briefcase { animation: briefcase-shake 0.5s ease-in-out; }
    @keyframes briefcase-shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }

  /* --- Form Styles on Back --- */
  .card-title-back { font-size: 1.8rem; font-weight: 700; margin-bottom: 1rem; color: #c4a7e7; }
  .card-description { font-size: 1rem; color: #666; margin-bottom: 1.5rem; flex-grow: 1; }
  .service-form textarea { width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 8px; font-family: 'Poppins', sans-serif; font-size: 0.9rem; min-height: 100px; margin-bottom: 1rem; }
  .submit-btn { width: 100%; padding: 0.8rem; background-color: #c4a7e7; color: white; border: none; border-radius: 8px; font-weight: 700; cursor: pointer; transition: background-color 0.3s ease; }
  .submit-btn:hover { background-color: #b390d6; }
</style>