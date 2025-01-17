class ShoppingCart extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.cartItems = [];

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
                    border: 3px solid black;
                    border-right: 0;
                    border-radius: 10px;
                    border-top-right-radius: 0;
                    border-bottom-right-radius: 0;

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
                    font-family: Arial, Helvetica, sans-serif;

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

        window.addEventListener('empty-cart', this.handleEmptyCart.bind(this));

        window.addEventListener('removeItem', this.handleRemoved.bind(this));

        const btn = this.shadowRoot.querySelector('.close');
        const cartFace = this.shadowRoot.querySelector('.cart')

        //döljer quick view korgen när man klickar på krysset
        btn.addEventListener('click', () => {
            cartFace.setAttribute("aria-hidden", "true");
        });
    }

    handleRemoved(event) {
        //plockar upp det event som skapav när man klickar remove, logiken är exakt likadan som i checkoutpage
        const itemIndex = event.detail.index;
        const itemQuant = event.detail.quantity;



        if (itemQuant < 1) {
            this.cartItems.splice(itemIndex, 1); //i varje eventlistener för varje remove knapp så raderas hela det itemet som finns på indexet för detta varv i loopen(sig själv)
        } else {
            this.cartItems[itemIndex].quantity = itemQuant;
            console.log('removed')
        }


        this.renderCart();
    }

    handleAddToCart(event) {
        //skapar en variabel som tar alla detaljer om produkten som vi skickade med
        const itemData = event.detail;

        const existingItem = this.cartItems.find(item => item.title === itemData.title && item.size === itemData.size);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cartItems.push(itemData); // lägger till dessa i arrayen cartitems
            console.log('Item added to cart:', itemData); //loggar i konsolen
        }

        this.renderCart(); //updaterar cart utseendet varje gång eventet plockas upp
        // döljer från start
        const cartFace = this.shadowRoot.querySelector('.cart')
        cartFace.setAttribute("aria-hidden", "false");

    }

    //tanken är rätt men vi måste radera den 
    handleEmptyCart() {
        this.cartItems = [];
        console.log('Cart emptied');
        this.renderCart();
    }

    renderCart() {
        const cartItemsContainer = this.shadowRoot.querySelector('#cart-items');
        const cartTotalElement = this.shadowRoot.querySelector('.cart-total');

        // Nollställer innehållet i divven för att vi inte ska lägga till det som redan finns eftersom vi ritar allt i arrayen varje gång vi clickar
        cartItemsContainer.innerHTML = '';

        // render each item
        let total = 0;
        this.cartItems.forEach(item => {
            total += parseFloat(item.price * item.quantity); // calculate total price
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <span>${item.title} <br>$${item.price * item.quantity} <br>Size: ${item.size} <br>Quantity: ${item.quantity}</span>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        // update total price
        cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
    }
}

// shopping cart element
customElements.define('shopping-cart', ShoppingCart);