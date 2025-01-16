export function renderCart(cartItems, container, totalElement) {
    container.innerHTML = ''; // Clear previous content

    let total = 0;

    cartItems.forEach((item, index) => {
        total += parseFloat(item.price);

        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <span>
                ${item.title}<br>
                $${item.price}<br>
                Size: 
                <select class="size-dropdown">
                    ${['40', '41', '42', '43', '44', '45'].map(size => `
                        <option value="${size}" ${size === item.size ? 'selected' : ''}>${size}</option>
                    `).join('')}
                </select><br>
                <button class="remove-btn" data-index="${index}">remove</button><br>
                Antal: ${item.quantity}
            </span>
        `;
        container.appendChild(itemElement);
    });

    // Update total price
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
}
