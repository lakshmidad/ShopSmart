// Simple hero image rotator (subtle background transitions)
document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero-landing');
  if (!hero) return;

  const images = [
    'https://images.unsplash.com/photo-1510557880182-3eec3d47d6c0?w=1600&q=60&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1503602642458-232111445657?w=1600&q=60&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=60&auto=format&fit=crop'
  ];
  let idx = 0;
  function setBg(i){
    hero.style.backgroundImage = `linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.08)), url("${images[i]}")`;
    hero.style.backgroundSize = 'cover';
    hero.style.backgroundPosition = 'center';
  }
  setBg(0);
  setInterval(() => { idx = (idx + 1) % images.length; setBg(idx); }, 6000);
});
