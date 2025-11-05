document.addEventListener('DOMContentLoaded', () => {
	const container = document.getElementById('wishlist-container');
	const emptyMsg = document.getElementById('empty-msg');

	function readList() {
		try { return JSON.parse(localStorage.getItem('wishlist')) || []; } catch (e) { return []; }
	}

	function saveList(list) {
		localStorage.setItem('wishlist', JSON.stringify(list));
	}

	function render() {
		const list = readList();
		container.innerHTML = '';
		if (!list.length) {
			emptyMsg.style.display = '';
			return;
		}
		emptyMsg.style.display = 'none';

		list.forEach(item => {
			const card = document.createElement('div');
			card.className = 'wish-card';
			card.innerHTML = `
				<div class="wish-img"><img src="${item.image||'https://via.placeholder.com/200x150?text=Product'}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/200x150?text=Product'"/></div>
				<div class="wish-body">
					<h3 class="wish-title">${item.name}</h3>
					<div class="wish-meta">Price: $${Number(item.price).toFixed(2)}</div>
					<div class="wish-actions">
						<button class="btn remove-btn" data-id="${item.id}">Remove</button>
						<a class="btn ghost" href="product-list.html">Continue shopping</a>
					</div>
				</div>
			`;

			container.appendChild(card);
		});

		// wire remove buttons
		container.querySelectorAll('.remove-btn').forEach(b => b.addEventListener('click', (e) => {
			const id = Number(e.currentTarget.dataset.id);
			const filtered = readList().filter(i => i.id !== id);
			saveList(filtered);
			render();
		}));
	}

	render();
});
