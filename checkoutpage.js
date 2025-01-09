class CartPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.cartItems = []; // Internal state for cart items

        // Initial HTML structure for the cart
        this.shadowRoot.innerHTML = `
            <style>
            .checkout {
                margin: 200px auto;
                width: 60%;
                height: fit-content;
                align-items: flex-start;
                flex-direction: column;
                border: 1px solid black;
            }

            .emptythecart {
                cursor: pointer;
                color: white;
                font-weight: bold;
                font-family: Arial, Helvetica, sans-serif;
                margin-top: 10px;
                text-align: center;
                background-color: red;
                padding: 10px 20px;
                border: 2px solid darkred;
                border-radius: 10px;
                display: inline-block;
                transition: background-color 0.3s ease, transform 0.2s ease;
            }

            .emptythecart:hover {
                background-color: darkred;
            }

            .emptythecart:active {
                background-color: crimson;
            }
        
            .checkout[aria-hidden="true"] {
                display: none;
            }
            
            .checkout[aria-hidden="false"] {
                display: flex;
            }
                
           h3, p {
            font-family: Arial, Helvetica, sans-serif;
           }

           .cart-item img {
            width: 50px;
            height: auto;
            margin-right: 10px;
        }

        .cart-item {
            display: flex;
            align-items:
        }

            </style>
            <div class="checkout" aria-hidden="true">
                <h3>Shopping Cart</h3>
                <div id="cart-items"></div>
                <p class="cart-total">Total: $0</p>
                <p id="empty-the-cart" class="emptythecart">Empty the cart</p>
            </div>
        `;
    }


    show() {
        const view = this.shadowRoot.querySelector('.checkout');
        view.setAttribute("aria-hidden", "false");
    }
    hide() {
        const view = this.shadowRoot.querySelector('.checkout');
        view.setAttribute("aria-hidden", "true");
    }

    connectedCallback() { 
        window.addEventListener('add-to-cart', this.addedToCart.bind(this));

        const emptyCartButton = this.shadowRoot.querySelector('#empty-the-cart');
        emptyCartButton.addEventListener('click', this.emptyCart.bind(this));
        
        drop.addEventListener('change', (event) => {
            selectedSize = event.target.value;
    });

    }

    addedToCart(event) {
        //skapar en variabel som tar alla detaljer om produkten som vi skickade med
        const itemData = event.detail;
        this.cartItems.push(itemData); // lägger till dessa i arrayen cartitems
        console.log('Item added to cart:', itemData);
        this.updateCart(); //updaterar cart utseendet varje gång eventet plockas upp
        // döljer från start
        const cartFace = this.shadowRoot.querySelector('.checkout')
        cartFace.setAttribute("aria-hidden", "false");

    }

    updateCart() {
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
                <span>${item.title}<br>$${item.price}<br>Size: ${item.size}</span>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        // Update the total price
        cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
    }

    emptyCart() {
        // Clear the cart items array
        this.cartItems = [];
        
        // Update the cart UI
        this.updateCart();

        console.log('Cart has been emptied.');
    }

    
}

// Define the custom shopping cart element
customElements.define('cart-page', CartPage);