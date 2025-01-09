class ShoppingCart extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.cartItems = []; // Internal state for cart items

        // Initial HTML structure for the cart
        this.shadowRoot.innerHTML = `
            <style>
                .cart[aria-hidden = "true"] {
                    display: none;
                }

                .cart[aria-hidden = "false"] {
                    background-color: white;
                    position: absolute;
                    top: 56px;
                    right: 0;
                    padding: 10px;
                    width: 25%;
                    box-shadow: -10px 10px 8px #888888;

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

                .close {
                    width: 40px;
                    height: 40px;
                    background-color: #f0f0f0;
                    border: none;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    position: relative;
                }
        
                .close:active {
                    background-color: #e0e0e0;
                }
        
                .close:before,
                .close:after {
                    content: '';
                    position: absolute;
                    width: 20px;
                    height: 2px;
                    background-color: #333;
                }
        
                .close:before {
                    transform: rotate(45deg);
                }
        
                .close:after {
                    transform: rotate(-45deg);
                }

                h3 {
                    margin: 0;
                }

                .toprow {
                    margin-bottom: 20px;
                    display: flex;
                    align-items: center;
                    gap: 20px;
                }
                
           
            </style>
            <div class="cart" aria-hidden="true">
                <div class="toprow">
                    <button class="close"></button>
                    <h3>Shopping Cart</h3>
                </div>
                <div id="cart-items"></div>
                <p class="cart-total">Total: $0</p>
            </div>
        `;
    }


 

    connectedCallback() {
        // lyssnar efter att eventet startade i item componenten
        // bind försäkrar att rätt instans skickas med
        window.addEventListener('add-to-cart', this.handleAddToCart.bind(this));

        const btn = this.shadowRoot.querySelector('.close');
        const cartFace = this.shadowRoot.querySelector('.cart')

        //döljer quick view korgen när man klickar på krysset
        btn.addEventListener('click', () => {
            cartFace.setAttribute("aria-hidden", "true");
        });
    }


    handleAddToCart(event) {
        //skapar en variabel som tar alla detaljer om produkten som vi skickade med
        const itemData = event.detail;
        this.cartItems.push(itemData); // lägger till dessa i arrayen cartitems
        console.log('Item added to cart:', itemData);
        this.renderCart(); //updaterar cart utseendet varje gång eventet plockas upp
        // döljer från start
        const cartFace = this.shadowRoot.querySelector('.cart')
        cartFace.setAttribute("aria-hidden", "false");

    }

    renderCart() {
        const cartItemsContainer = this.shadowRoot.querySelector('#cart-items');
        const cartTotalElement = this.shadowRoot.querySelector('.cart-total');

        // Nollställer innehållet i divven för att vi inte ska lägga till det som redan finns eftersom vi ritar allt i arrayen varje gång vi clickar
        cartItemsContainer.innerHTML = '';

        // Render each item
        let total = 0;
        this.cartItems.forEach(item => {
            total += parseFloat(item.price); // Calculate total price
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <span>${item.title} - $${item.price} (Size: ${item.size})</span>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        // Update the total price
        cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
    }
}

// Define the custom shopping cart element
customElements.define('shopping-cart', ShoppingCart);
