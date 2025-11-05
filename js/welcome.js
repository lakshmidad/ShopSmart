// Welcome page behavior
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('start-btn');
  if (!btn) return;
  btn.addEventListener('click', async () => {
    // animate the button (scale) then navigate
    btn.style.transform = 'scale(0.98)';
    btn.style.transition = 'transform .12s ease';
    setTimeout(() => { btn.style.transform = ''; window.location.href = '../pages/onboarding.html'; }, 180);
  });
});
