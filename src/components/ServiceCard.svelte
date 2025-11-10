<script>
  export let service;
  let showDescription = false;

  function toggleDescription() {
    showDescription = !showDescription;
  }
</script>

<div class="service-card" on:click={toggleDescription}>
  <div class="service-header">
    <i class="icon">{service.icon}</i>
    <h3>{service.title}</h3>
  </div>
  {#if showDescription}
    <div class="service-description">
      <p>{service.description}</p>
    </div>
  {/if}
</div>

<style>
  .service-card {
    background: #fff;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.05);
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .service-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 25px rgba(0,0,0,0.1);
  }

  .service-header {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }

  .icon {
    font-size: 2.5rem;
    margin-right: 1.5rem;
  }

  h3 {
    font-size: 1.8rem;
    font-weight: 700;
    margin: 0;
  }

  .service-description {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid #eee;
  }

  .service-description p {
    font-size: 1.1rem;
    line-height: 1.6;
  }
</style>