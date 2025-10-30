// --- Helpers -------------------------------------------------
const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

const viewer = $('.viewer');
const imgEl  = $('#product-image');
const nameEl = $('#product-name');
const descEl = $('#product-desc');
const leftBtn  = $('.arrow-left');
const rightBtn = $('.arrow-right');

// Read product data from hidden <ul id="product-data">
const items = $$('#product-data li').map(li => ({
  image: li.dataset.image || '',
  name : li.dataset.name  || 'Product name',
  desc : li.dataset.desc  || 'Product description'
}));

let i = 0;
function show(index){
  if (!items.length) return;
  i = (index + items.length) % items.length;

  // Bounce effect on the white rectangle
  viewer.classList.remove('bounce');
  void viewer.offsetWidth; // reflow to restart animation
  viewer.classList.add('bounce');

  // Smooth image swap with preload
  const next = new Image();
  next.onload = () => {
    imgEl.src = next.src;
    imgEl.alt = items[i].name || 'Product photo';
    imgEl.classList.remove('ready');
    requestAnimationFrame(() => {
      // allow transition to apply
      imgEl.classList.add('ready');
    });
  };
  next.src = items[i].image || '';

  nameEl.textContent = items[i].name;
  descEl.textContent = items[i].desc;
}

// Controls
leftBtn?.addEventListener('click',  () => show(i - 1));
rightBtn?.addEventListener('click', () => show(i + 1));

// Keyboard support
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft')  show(i - 1);
  if (e.key === 'ArrowRight') show(i + 1);
});

// Initialize
show(0);
