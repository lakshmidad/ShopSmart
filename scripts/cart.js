document.addEventListener('DOMContentLoaded', () => {
	const container = document.getElementById('cart-container');
	const summary = document.getElementById('cart-summary');
	const emptyMsg = document.getElementById('cart-empty');

	function readCart() {
		try { return JSON.parse(localStorage.getItem('cart')) || []; } catch (e) { return []; }
	}

	function saveCart(list) {
		localStorage.setItem('cart', JSON.stringify(list));
	}

	function formatPrice(p){ return '$' + Number(p).toFixed(2); }

	function render() {
		const list = readCart();
		container.innerHTML = '';
		if (!list.length) {
			emptyMsg.style.display = '';
			summary.innerHTML = '';
			return;
		}
		emptyMsg.style.display = 'none';

		let total = 0;
		list.forEach(item => {
			const row = document.createElement('div');
			row.className = 'cart-row';
			const itemTotal = (item.price || 0) * (item.qty || 1);
			total += itemTotal;

			row.innerHTML = `
				<div class="cart-item-img"><img src="${item.image||'https://via.placeholder.com/120x90?text=Product'}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/120x90?text=Product'"/></div>
				<div class="cart-item-body">
					<h3 class="cart-item-title">${item.name}</h3>
					<div class="cart-item-meta">Price: ${formatPrice(item.price)}</div>
					<div class="cart-item-controls">
						<button class="btn qty-decrease" data-id="${item.id}">-</button>
						<span class="qty">${item.qty||1}</span>
						<button class="btn qty-increase" data-id="${item.id}">+</button>
						<button class="btn remove" data-id="${item.id}">Remove</button>
					</div>
				</div>
				<div class="cart-item-total">${formatPrice(itemTotal)}</div>
			`;

			container.appendChild(row);
		});

		// summary
		summary.innerHTML = `
			<div><strong>Subtotal:</strong> ${formatPrice(total)}</div>
			<div style="margin-top:8px"><a class="btn primary" href="#">Proceed to Checkout</a></div>
		`;

		// wire controls
		container.querySelectorAll('.qty-increase').forEach(b => b.addEventListener('click', (e)=>{
			const id = Number(e.currentTarget.dataset.id);
			const updated = readCart().map(i => i.id === id ? Object.assign({}, i, { qty: (i.qty||1) + 1 }) : i);
			saveCart(updated);
			render();
		}));

		container.querySelectorAll('.qty-decrease').forEach(b => b.addEventListener('click', (e)=>{
			const id = Number(e.currentTarget.dataset.id);
			const updated = readCart().map(i => i.id === id ? Object.assign({}, i, { qty: Math.max(1, (i.qty||1) - 1) }) : i);
			saveCart(updated);
			render();
		}));

		container.querySelectorAll('.remove').forEach(b => b.addEventListener('click', (e)=>{
			const id = Number(e.currentTarget.dataset.id);
			const filtered = readCart().filter(i => i.id !== id);
			saveCart(filtered);
			render();
		}));
	}

	render();
});
