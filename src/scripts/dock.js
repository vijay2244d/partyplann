document.addEventListener('DOMContentLoaded', () => {
  const dockContainer = document.querySelector('.dock-container');
  if (!dockContainer) return;

  const dock = dockContainer.querySelector('.dock');
  if (!dock) return;

  const items = Array.from(dock.children);
  let isDragging = false;
  let offsetX, offsetY;

  const updateItems = (mouseX) => {
    if (isDragging) return;
    const dockRect = dock.getBoundingClientRect();
    items.forEach((item) => {
      const itemRect = item.getBoundingClientRect();
      const distance = Math.abs(mouseX - (itemRect.left + itemRect.width / 2));
      const maxDistance = dockRect.width * 1.5;
      const normalizedDistance = Math.min(1, distance / maxDistance);
      const scale = 1 + (1 - normalizedDistance) * 0.8;
      item.style.transform = `scale(${Math.max(1, scale)})`;
    });
  };

  dockContainer.addEventListener('mousemove', (e) => {
    updateItems(e.clientX);
  });

  dockContainer.addEventListener('mouseleave', () => {
    if (!isDragging) { // Only reset if not dragging
      items.forEach((item) => {
        item.style.transform = 'scale(1)';
      });
    }
  });

  const onMouseDown = (e) => {
    if (e.target.closest('a')) return;
    isDragging = true;
    dockContainer.classList.add('is-dragged'); // Add class to disable hover
    offsetX = e.clientX - dockContainer.getBoundingClientRect().left;
    offsetY = e.clientY - dockContainer.getBoundingClientRect().top;
    dockContainer.style.cursor = 'grabbing';
    dock.style.transition = 'none';
    items.forEach(item => item.style.transition = 'none');
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;
    let newX = e.clientX - offsetX;
    let newY = e.clientY - offsetY;

    const vw = document.documentElement.clientWidth;
    const vh = document.documentElement.clientHeight;
    const dockWidth = dockContainer.offsetWidth;
    const dockHeight = dockContainer.offsetHeight;

    newX = Math.max(0, Math.min(newX, vw - dockWidth));
    newY = Math.max(0, Math.min(newY, vh - dockHeight));

    dockContainer.style.left = `${newX}px`;
    dockContainer.style.top = `${newY}px`;
    dockContainer.style.transform = 'none';
    dockContainer.style.bottom = 'auto';
  };

  const onMouseUp = () => {
    if (!isDragging) return;
    isDragging = false;
    setTimeout(() => dockContainer.classList.remove('is-dragged'), 0); // Remove class after click event
    dockContainer.style.cursor = 'grab';
    dock.style.transition = '';
    items.forEach(item => {
        item.style.transition = '';
        item.style.transform = 'scale(1)'; // Reset item scale
    });
  };

  dockContainer.addEventListener('mousedown', onMouseDown);
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

  dockContainer.style.cursor = 'grab';
});
