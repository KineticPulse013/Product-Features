// Helpers
const $  = (s, c=document) => c.querySelector(s);
const $$ = (s, c=document) => Array.from(c.querySelectorAll(s));

const viewer   = $('.viewer');
const frame    = $('#photo-frame');
const imgEl    = $('#product-image');
const nameEl   = $('#product-name');
const descEl   = $('#product-desc');
const leftBtn  = $('.arrow-left');
const rightBtn = $('.arrow-right');

const items = $$('#product-data li').map(li => ({
  image: li.dataset.image || '',
  name : li.dataset.name  || 'Product name',
  desc : li.dataset.desc  || 'Product description'
}));

let i = 0;

function show(index){
  if (!items.length) return;
  i = (index + items.length) % items.length;

  // bounce
  viewer.classList.remove('bounce');
  void viewer.offsetWidth;
  viewer.classList.add('bounce');

  // image preload + fade-in
  const next = new Image();
  next.onload = () => {
    imgEl.src = next.src;
    imgEl.alt = items[i].name || 'Product photo';
    frame.classList.add('loaded');
    imgEl.classList.remove('ready');
    requestAnimationFrame(() => imgEl.classList.add('ready'));
  };
  next.src = items[i].image || '';

  nameEl.textContent = items[i].name;
  descEl.textContent = items[i].desc;
}

leftBtn?.addEventListener('click',  () => show(i - 1));
rightBtn?.addEventListener('click', () => show(i + 1));
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft')  show(i - 1);
  if (e.key === 'ArrowRight') show(i + 1);
});

show(0);

