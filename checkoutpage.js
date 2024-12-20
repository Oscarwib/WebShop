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

            </style>
            <div class="checkout" aria-hidden="true">
                <h3>Shopping Cart</h3>
                <div id="cart-items"></div>
                <p class="cart-total">Total: $0</p>
            </div>
        `;
    }

    connectedCallback() {
       
        window.addEventListener('add-to-cart', this.addedToCart.bind(this));


    }



    addedToCart(event) {
        //skapar en variabel som tar alla detaljer om produkten som vi skickade med
        const itemData = event.detail;
        this.cartItems.push(itemData); // lägger till dessa i arrayen cartitems
        console.log('Item added to cart:', itemData);
        this.updateCart(); //updaterar cart utseendet varje gång eventet plockas upp
        // döljer från start
        const cartFace = this.shadowRoot.querySelector('.cart')
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
                <span>${item.title} - $${item.price} (Size: ${item.size})</span>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        // Update the total price
        cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
    }
}

// Define the custom shopping cart element
customElements.define('cart-page', CartPage);
