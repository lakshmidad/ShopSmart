document.addEventListener('DOMContentLoaded', function () {
	const navToggle = document.querySelector('.nav-toggle');
	const navMenu = document.getElementById('nav-menu');

	if (!navToggle || !navMenu) return;

	// Toggle mobile navigation
	navToggle.addEventListener('click', function () {
		const expanded = navToggle.getAttribute('aria-expanded') === 'true';
		navToggle.setAttribute('aria-expanded', String(!expanded));
		navMenu.classList.toggle('open');
	});

	// Close menu when a navigation link is clicked (mobile)
	navMenu.addEventListener('click', function (e) {
		const target = e.target;
		if (target.tagName === 'A') {
			navMenu.classList.remove('open');
			navToggle.setAttribute('aria-expanded', 'false');
		}
	});
});
