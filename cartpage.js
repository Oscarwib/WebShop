class ShoppingCart extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.cartItems = []; // Internal state for cart items

        // Initial HTML structure for the cart
        this.shadowRoot.innerHTML = `
            <style>
                .cart {
                    position: absolute;
                    top: 56px;
                    right: 0;
                    border: 1px solid #ccc;
                    padding: 10px;
                    max-width: 300px;
                }
                .cart-item {
                    display: flex;
                    align-items: center;
                    margin-bottom: 10px;
                }
                .cart-item img {
                    width: 50px;
                    height: auto;
                    margin-right: 10px;
                }
                .cart-total {
                    font-weight: bold;
                    margin-top: 10px;
                }
            </style>
            <div class="cart">
                <h3>Shopping Cart</h3>
                <div id="cart-items"></div>
                <p class="cart-total">Total: $0</p>
            </div>
        `;
    }

    connectedCallback() {
        // Listen for the "add-to-cart" event
        window.addEventListener('add-to-cart', this.handleAddToCart.bind(this));
    }

    disconnectedCallback() {
        // Clean up event listener when the component is removed
        window.removeEventListener('add-to-cart', this.handleAddToCart.bind(this));
    }

    handleAddToCart(event) {
        // Get item data from the event
        const itemData = event.detail;
        this.cartItems.push(itemData); // Add item to the cart array
        console.log('Item added to cart:', itemData);
        this.renderCart(); // Update the cart UI
    }

    renderCart() {
        const cartItemsContainer = this.shadowRoot.querySelector('#cart-items');
        const cartTotalElement = this.shadowRoot.querySelector('.cart-total');

        // Clear the existing cart UI
        cartItemsContainer.innerHTML = '';

        // Render each item
        let total = 0;
        this.cartItems.forEach(item => {
            total += parseFloat(item.price); // Calculate total price
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <span>${item.title} - ${item.price} (Size: ${item.size})</span>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        // Update the total price
        cartTotalElement.textContent = `Total: ${total.toFixed(2)}`;
    }
}

// Define the custom shopping cart element
customElements.define('shopping-cart', ShoppingCart);
