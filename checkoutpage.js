import { renderCart } from './cartTools'; 
class CartPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.cartItems = [];

        this.shadowRoot.innerHTML = `
            <style>
            
            .checkout-container{
                display: flex;
                flex-direction: column;
                min-height: 100vh;
                align-items: center;
            }


            .checkout {
                margin: 200px auto;
                width: 60%;
                height: fit-content;
                align-items: flex-start;
                flex-direction: column;
                border: 3px solid black;
                border-radius: 10px;
                padding: 20px;
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
        
            .checkout-container[aria-hidden="true"] {
                display: none;
            }
            
            .checkout-container[aria-hidden="false"] {
                display: flex;
            }
                
           h3, p {
            font-family: Arial, Helvetica, sans-serif;
           }

           .cart-item img {
            width: 100px;
            height: auto;
            margin-right: 10px;
        }

        .cart-item {
            display: flex;
        }

        .remove-btn {
            all: unset;
            display: block;
            font-family: Arial, Helvetica, sans-serif;
            text-decoration: underline; 
        }

        .remove-btn:hover {
            color: gray;
            cursor: pointer;
        }

            </style>
            <div class="checkout-container" aria-hidden="true">
                <div class="checkout">
                    <h3>Shopping Cart</h3>
                    <div id="cart-items"></div>
                    <p class="cart-total">Total: $0</p>
                    <p id="empty-the-cart" class="emptythecart">Empty the cart</p>
                </div>
            </div>
        `;
    }


  

    connectedCallback() {
        window.addEventListener('add-to-cart', this.addedToCart.bind(this));

        const emptyCartButton = this.shadowRoot.querySelector('#empty-the-cart');
        emptyCartButton.addEventListener('click', this.emptyCart.bind(this));

    }

    show() {
        const view = this.shadowRoot.querySelector('.checkout-container');
        if (view) {
            view.setAttribute("aria-hidden", "false");
        } else {
            console.log('could not find')
        }
    }
    hide() {
        const view = this.shadowRoot.querySelector('.checkout-container');
        view.setAttribute("aria-hidden", "true");
    }

    addedToCart(event) {
        //skapar en variabel som tar alla detaljer om produkten som vi skickade med
        const itemData = event.detail;


        const existingItem = this.cartItems.find(item => item.title === itemData.title && item.size === itemData.size);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cartItems.push(itemData); // lägger till dessa i arrayen cartitems
            console.log('Item added to cart:', itemData); //loggar i konsolen
        }


        this.updateCart(); //updaterar cart utseendet varje gång eventet plockas upp

    }

    updateCart() {
        const cartItemsContainer = this.shadowRoot.querySelector('#cart-items');
        const cartTotalElement = this.shadowRoot.querySelector('.cart-total');

        // Use the shared function to render the cart
        renderCart(this.cartItems, cartItemsContainer, cartTotalElement, (index) => {
            // Optional: Add behavior for remove button
            this.cartItems.splice(index, 1);
            this.updateCart();
        });
    }

    emptyCart() {
        // empty array
        this.cartItems = [];

        this.updateCart();

        const event = new CustomEvent('empty-cart', { bubbles: true, composed: true });
        window.dispatchEvent(event);
    }


}

// define shopping cart element
window.customElements.define('cart-page', CartPage);