
const cart = {};

function addToCart(cakeName, price) {
    if (cart[cakeName]) {
        cart[cakeName].quantity += 1;
    } else {
        cart[cakeName] = { price: price, quantity: 1 };  // Correct object assignment
    }
    renderCart();
}

function removeFromCart(cakeName) {
    delete cart[cakeName];
    renderCart();
}

function updateQuantity(cakeName, quantity) {
    if (quantity <= 0) {
        removeFromCart(cakeName);
    } else {
        cart[cakeName].quantity = quantity;
    }
    renderCart();
}

function renderCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';  // Clear previous cart display
    let totalPrice = 0;

    for (const [cakeName, item] of Object.entries(cart)) {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        cartItemDiv.innerHTML = `
            <span>${cakeName} ($${item.price.toFixed(2)})</span>
            <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${cakeName}', this.value)">
            <button onclick="removeFromCart('${cakeName}')">Remove</button>
        `;
        cartItemsDiv.appendChild(cartItemDiv);
    }

    document.getElementById('total-price').innerText = totalPrice.toFixed(2);
}

