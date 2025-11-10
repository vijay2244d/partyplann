<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let today = new Date();
  let currentMonth = today.getMonth();
  let currentYear = today.getFullYear();
  let selectedDate = null;

  $: daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  $: firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  function previousMonth() {
    if (currentMonth === 0) {
      currentMonth = 11;
      currentYear--;
    } else {
      currentMonth--;
    }
    selectedDate = null;
    dispatch('dateChange', null);
  }

  function nextMonth() {
    if (currentMonth === 11) {
      currentMonth = 0;
      currentYear++;
    } else {
      currentMonth++;
    }
    selectedDate = null;
    dispatch('dateChange', null);
  }

  function selectDate(day) {
    selectedDate = new Date(currentYear, currentMonth, day);
    dispatch('dateChange', selectedDate);
  }
</script>

<div class="calendar">
  <div class="calendar-header">
    <button on:click={previousMonth}>&lt;</button>
    <span class="month-year">{monthNames[currentMonth]} {currentYear}</span>
    <button on:click={nextMonth}>&gt;</button>
  </div>
  <div class="calendar-grid">
    <div class="day-name">Sun</div>
    <div class="day-name">Mon</div>
    <div class="day-name">Tue</div>
    <div class="day-name">Wed</div>
    <div class="day-name">Thu</div>
    <div class="day-name">Fri</div>
    <div class="day-name">Sat</div>
    {#each Array(firstDayOfMonth) as _}
      <div class="empty-day"></div>
    {/each}
    {#each Array(daysInMonth) as _, i}
      {@const day = i + 1}
      <div
        class="day"
        class:selected={selectedDate && selectedDate.getDate() === day && selectedDate.getMonth() === currentMonth && selectedDate.getFullYear() === currentYear}
        on:click={() => selectDate(day)}
      >
        {day}
      </div>
    {/each}
  </div>
</div>

<style>
  .calendar {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    background: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
  }

  .calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .month-year {
    font-size: 1.2rem;
    font-weight: 600;
  }

  .calendar-header button {
    background: #ff69b4;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
  }

  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0.5rem;
    text-align: center;
  }

  .day-name {
    font-weight: 600;
    color: #888;
  }

  .day {
    padding: 0.5rem;
    cursor: pointer;
    border-radius: 50%;
  }

  .day:hover {
    background: #eee;
  }

  .day.selected {
    background: #ff69b4;
    color: white;
  }

  .empty-day {
    visibility: hidden;
  }
</style>