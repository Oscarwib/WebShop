class ShoppingCart extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
        <style>
            /* Styles for the shopping cart */
            .cart[aria-hidden="true"] {
                display: none;
            }

            .cart[aria-hidden="false"] {
                display: block;
                background-color: white;
                position: fixed;
                top: 0;
                right: 0;
                padding: 20px;
                box-shadow: -4px 4px 10px rgba(0, 0, 0, 0.3);
                width: 300px;
            }
        </style>
        <div class="cart" aria-hidden="true">
            <h3>Shopping Cart</h3>
            <div id="cart-items"></div>
            <p class="cart-total">Total: $0</p>
        </div>
        `;
    }

    connectedCallback() {
        // Any other setup logic for the cart component
    }
}

customElements.define('shopping-cart', ShoppingCart);
