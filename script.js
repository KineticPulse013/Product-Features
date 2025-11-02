// Helpers
const $  = (s, c=document) => c.querySelector(s);
const $$ = (s, c=document) => Array.from(c.querySelectorAll(s));

// Elements
const viewer   = $('.viewer');
const frame    = $('#photo-frame');
const imgEl    = $('#product-image');
const nameEl   = $('#product-name');
const descEl   = $('#product-desc');
const leftBtn  = $('.arrow-left');
const rightBtn = $('.arrow-right');

// Read product data from the hidden list
const items = $$('#product-data li').map(li => ({
  image: li.dataset.image || '',
  name : li.dataset.name  || 'Product name',
  desc : li.dataset.desc  || 'Product description'
}));

let i = 0;

// Load & display a product
function show(index){
  if (!items.length) return;

  i = (index + items.length) % items.length;

  // Small bounce
  viewer.classList.remove('bounce'); void viewer.offsetWidth;
  viewer.classList.add('bounce');

  // Preload next image for smooth transition
  const next = new Image();
  next.onload = () => {
    imgEl.src = next.src;
    imgEl.alt = items[i].name || 'Product photo';
    // Toggle loaded + ready states to fade-in
    frame.classList.add('loaded');
    imgEl.classList.remove('ready');
    requestAnimationFrame(() => imgEl.classList.add('ready'));
  };
  next.src = items[i].image || '';

  nameEl.textContent = items[i].name;
  descEl.textContent = items[i].desc;
}

// Controls
leftBtn?.addEventListener('click',  () => show(i - 1));
rightBtn?.addEventListener('click', () => show(i + 1));

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft')  show(i - 1);
  if (e.key === 'ArrowRight') show(i + 1);
});

// Init
document.addEventListener('DOMContentLoaded', () => show(0));
