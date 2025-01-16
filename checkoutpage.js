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

            #emptycart {
                all: unset;
                padding: 10px 15px;
                border-radius: 10px;
                color: white;
                font-family: Arial, Helvetica, sans-serif;
                font-size: 16px;
                background-color: black;
                cursor: pointer;
                background-position: center;
                transition: background 0.8s;
            }
        
            #emptycart:hover {
                background-color: #4e4e4e;
                background-image: radial-gradient(circle,transparent 1%, #4e4e4e 1%);
                background-position: center;
                background-size: 15000%;
            }
        
            #emptycart:active {
                transition: background 0s;
                background-color: #c3c3c3;
                background-size: 100%;
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

        #cart-items {
            display: flex;
            gap: 20px;
            flex-direction: column;
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
                    <button id="emptycart">Empty Cart</button>
                </div>
            </div>
        `;
    }


    show() {
        const view = this.shadowRoot.querySelector('.checkout-container');
        view.setAttribute("aria-hidden", "false");
    }
    hide() {
        const view = this.shadowRoot.querySelector('.checkout-container');
        view.setAttribute("aria-hidden", "true");
    }

    connectedCallback() {
        window.addEventListener('add-to-cart', this.addedToCart.bind(this));

        const emptyCartButton = this.shadowRoot.querySelector('#emptycart');
        emptyCartButton.addEventListener('click', this.emptyCart.bind(this));

    }

    addedToCart(event) {
        //skapar en variabel som tar alla detaljer om produkten som vi skickade med
        const itemData = event.detail;


        const existingItem = this.cartItems.find(item => item.title === itemData.title && item.size === itemData.size);

        if (existingItem) {
            existingItem.quantity + 1;
        } else {
            this.cartItems.push(itemData); // lägger till dessa i arrayen cartitems
            console.log('Item added to cart:', itemData); //loggar i konsolen
        }


        this.updateCart(); //updaterar cart utseendet varje gång eventet plockas upp

    }

    updateCart() {
        const cartItemsContainer = this.shadowRoot.querySelector('#cart-items');
        const cartTotalElement = this.shadowRoot.querySelector('.cart-total');

        // Nollställer innehållet i divven för att vi inte ska lägga till det som redan finns eftersom vi ritar allt i arrayen varje gång vi clickar
        cartItemsContainer.innerHTML = '';

        // render each item
        let total = 0;
        this.cartItems.forEach((item, index) => { //lade till index på varje elemnt i loopen
            total += parseFloat(item.price * item.quantity); // calculate total price
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <span>
                    ${item.title}<br>
                    $${item.price * item.quantity}<br>
                    Size: 
                    <select class="size-dropdown">
                        ${['40', '41', '42', '43', '44', '45'].map(size => `
                            <option value="${size}" ${size === item.size ? 'selected' : ''}>${size}</option>
                        `).join('')}
                    </select><br>
                    <button class="remove-btn">remove</button><br>
                    Quantity: ${item.quantity}
                </span>
            `;
            cartItemsContainer.appendChild(itemElement);

            const removeBtn = itemElement.querySelector('.remove-btn');
            removeBtn.addEventListener('click', () => {

                if (item.quantity > 1) {
                    item.quantity -= 0.5; //remove half a shoe because both checkoutpage and cartpage remove at the same time and they both need to in order to sync
                } else {
                    this.cartItems.splice(index, 1); //i varje eventlistener för varje remove knapp så raderas hela det itemet som finns på indexet för detta varv i loopen(sig själv)
                }

                //skapar ett nytt event när man klickar remove som skickar med indexet för den sko man har klickat remove på
                this.dispatchEvent(new CustomEvent('removeItem', {
                    //indexet för detta varv i for loopen som blir den sko vi klickar på
                    detail: { index: index, quantity: item.quantity },
                    bubbles: true,
                }));

                this.updateCart();//uppdaterar carten efter att vi tagit bort det elemntet från arrayen

            });

            // size change dropdown
            const sizeDropdown = itemElement.querySelector('.size-dropdown');
            sizeDropdown.addEventListener('change', (event) => {
                const newSize = event.target.value;
                this.cartItems[index].size = newSize; // update shoesize
                console.log(`Item size updated to: ${newSize}`); // log update
            });

        });



        // total price update
        cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
    }

    emptyCart() {
        // empty array
        setTimeout(() => {

            this.cartItems = [];

            this.updateCart();

            const event = new CustomEvent('empty-cart', { bubbles: true, composed: true });
            window.dispatchEvent(event);
        }, 500);
    }


}

// define shopping cart element
customElements.define('cart-page', CartPage);