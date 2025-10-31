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

// Lire les données produits depuis <ul id="product-data">
const items = $$('#product-data li').map(li => ({
  image: li.dataset.image || '',
  name : li.dataset.name  || 'Product name',
  desc : li.dataset.desc  || 'Product description'
}));

let i = 0;

function show(index){
  if (!items.length) return;
  i = (index + items.length) % items.length;

  // Effet rebond
  viewer.classList.remove('bounce');
  void viewer.offsetWidth;            // reflow pour redémarrer l’anim
  viewer.classList.add('bounce');

  // Pré-charge et transition image
  const next = new Image();
  next.onload = () => {
    imgEl.src = next.src;
    imgEl.alt = items[i].name || 'Product photo';
    frame.classList.add('loaded');    // masque le placeholder une fois chargée
    imgEl.classList.remove('ready');
    requestAnimationFrame(() => imgEl.classList.add('ready'));
  };
  next.src = items[i].image || '';

  // Texte
  nameEl.textContent = items[i].name;
  descEl.textContent = items[i].desc;
}

// Contrôles
leftBtn?.addEventListener('click',  () => show(i - 1));
rightBtn?.addEventListener('click', () => show(i + 1));

// Clavier
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft')  show(i - 1);
  if (e.key === 'ArrowRight') show(i + 1);
});

// Initialisation
show(0);

