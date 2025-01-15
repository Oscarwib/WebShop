class CartPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.cartItems = []; // Internal state for cart items

        // Initial HTML structure for the cart
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
            align-items:
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

        const emptyCartButton = this.shadowRoot.querySelector('#empty-the-cart');
        emptyCartButton.addEventListener('click', this.emptyCart.bind(this));

        //     drop.addEventListener('change', (event) => {
        //         selectedSize = event.target.value;
        // });

    }

    addedToCart(event) {
        //skapar en variabel som tar alla detaljer om produkten som vi skickade med
        const itemData = event.detail;
        this.cartItems.push(itemData); // lägger till dessa i arrayen cartitems
        console.log('Item added to cart:', itemData); //loggar i konsolen
        this.updateCart(); //updaterar cart utseendet varje gång eventet plockas upp


        // döljer från start, kan tas bort minns ej vad de gör
        //const cartFace = this.shadowRoot.querySelector('.checkout')
        // cartFace.setAttribute("aria-hidden", "false");

    }

    updateCart() {
        const cartItemsContainer = this.shadowRoot.querySelector('#cart-items');
        const cartTotalElement = this.shadowRoot.querySelector('.cart-total');

        // Nollställer innehållet i divven för att vi inte ska lägga till det som redan finns eftersom vi ritar allt i arrayen varje gång vi clickar
        cartItemsContainer.innerHTML = '';

        // Render each item
        let total = 0;
        this.cartItems.forEach((item, index) => { //lade till index på varje elemnt i loopen
            total += parseFloat(item.price); // Calculate total price
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
                    </select>
                    <button class="remove-btn">remove</button>
                </span>
            `;
            cartItemsContainer.appendChild(itemElement);

            const removeBtn = itemElement.querySelector('.remove-btn');
            removeBtn.addEventListener('click', () => {


                //skapar ett nytt event när man klickar remove som skickar med indexet för den sko man har klickat remove på
                this.dispatchEvent(new CustomEvent('removeItem', {
                    //indexet för detta varv i for loopen som blir den sko vi klickar på
                    detail: { index: index },
                    bubbles: true,
                }));


                this.cartItems.splice(index, 1); //i varje eventlistener för varje remove knapp så raderas hela det itemet som finns på indexet för detta varv i loopen(sig själv)
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



        // Update the total price
        cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
    }

    emptyCart() {
        // Clear the cart items array
        this.cartItems = [];

        // Update the cart UI
        this.updateCart();

        const event = new CustomEvent('empty-cart', { bubbles: true, composed: true });
        window.dispatchEvent(event);
    }


}

// Define the custom shopping cart element
customElements.define('cart-page', CartPage);