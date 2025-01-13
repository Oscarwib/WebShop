class ItemPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
        <style>

            .itempage[aria-hidden="true"] {
                display: none;
            }
            
            .itempage[aria-hidden="false"] {
                display: flex;
                width: 70%;
                height: 100%;
                align-items: center;
                margin: 100px auto;
                margin-top: unset;
            }
        
            .right {
                display: flex;
                width: fit-content;
                flex-direction: column;
                align-items: flex-start;
                padding: 25px 50px;
                gap: 30px;
            }
        
            .left {
                display: flex;
                flex-direction: row;
                align-items: center;
                gap: 10px;
            }
        
            .title {
                font-size: 24px;
                color: black;
                font-weight: bold;
                font-family: 'Arial';
            }
        
            .price {
                font-size: 24px;
                font-weight: bold;
                font-family: arial;
            }
        
          
        
            .info {
                font-size: 16px;
                // padding: 10px;
                font-family: 'Arial';
        
            }
        
            #addcart {
                all: unset;
                padding: 10px 15px;
                border-radius: 30px;
                color: white;
                font-family: Arial, Helvetica, sans-serif;
                font-size: 16px;
                background-color: black;
                cursor: pointer;
                background-position: center;
                transition: background 0.8s;
            }
        
            #addcart:hover {
                background-color: #4e4e4e;
                background-image: radial-gradient(circle,transparent 1%, #4e4e4e 1%);
                background-position: center;
                background-size: 15000%;
            }
        
            #addcart:active {
                transition: background 0s;
                background-color: #c3c3c3;
                background-size: 100%;
            }
          
            .image-container {
                width: 600px; 
                height: 600px;
                background-color: black;
            }
        
            .slides {
                width: 100%;
                height: 100%;
            }
        
            .image {
                display: block;
                width: 100%;    
                height: auto;
            }
        
            .arrow {
                border: solid black;
                border-width: 0 3px 3px 0;
                display: inline-block;
                padding: 8px;
                cursor: pointer;
              }
              
            .R {
            transform: rotate(-45deg);
            -webkit-transform: rotate(-45deg);
            }
        
            .L {
            transform: rotate(135deg);
            -webkit-transform: rotate(135deg);
            }
        
            .arrow:active {
            border: solid gray;
            border-width: 0 3px 3px 0;
            }
         
            label {
                font-family: Arial, Helvetica, sans-serif;
            } 
              
         
        
        </style>
        
        <div class="itempage" aria-hidden="true">
        
        <div class="left">
          <p><i class="arrow L"></i></p>
          <div class="image-container">
            <div class="slides"></div>
          </div>
          <p><i class="arrow R"></i></p>
        </div>
        
        <div class="right">
          <div class="title">
            <slot name="title">TITLE GOES HERE</slot>
          </div>
          <div class="price">
            <slot name="price">MESSAGE</slot>
          </div>
          <div class="info">
            <slot name="info">MESSAGE</slot>
          </div>
          <form id="dropdown">
            <label for="options">Size:</label>
            <select id="options" name="number"></select>
          </form>
          <button id="addcart">Add to Shopping Cart</button>
        </div>
        </div>
        
          `;
    }

    show() {
        const itemPage = this.shadowRoot.querySelector('.itempage');
        itemPage.setAttribute("aria-hidden", "false");
    }

    hide() {
        const itemPage = this.shadowRoot.querySelector('.itempage');
        itemPage.setAttribute("aria-hidden", "true");
    }

    connectedCallback() {
        const imageSlot = this.shadowRoot.querySelector('.slides');
        const images = this.querySelectorAll('img');
        const sizes = this.querySelectorAll('option')
        const drop = this.shadowRoot.getElementById('options')

        sizes.forEach(size => {
            drop.appendChild(size);
        })

        images.forEach(image => {
            image.classList.add('image')
            imageSlot.appendChild(image)
            image.style.display = "none";
        });

        let currIndex = 0;
        images[currIndex].style.display = "block";

        function updateDisplay() {
            images.forEach(image => {
                image.style.display = "none";
            });
            images[currIndex].style.display = "block";
        }

        function changeLeft() {
            currIndex--;
            if (currIndex < 0) {
                currIndex = images.length - 1;
            }
            updateDisplay()
        };
        
        function changeRight() {
            currIndex++;
            if (currIndex >= images.length) {
                currIndex = 0;
            }
            updateDisplay()
        };

        const leftArrowButton = this.shadowRoot.querySelector('.arrow.L');
        const rightArrowButton = this.shadowRoot.querySelector('.arrow.R');
        leftArrowButton.addEventListener('click', changeLeft);
        rightArrowButton.addEventListener('click', changeRight);


        const addToCart = this.shadowRoot.querySelector('#addcart');

        let selectedSize = '-1';

        drop.addEventListener('change', (event) => {
            selectedSize = event.target.value;

        });

        addToCart.addEventListener('click', () => {
            if (selectedSize == '-1') {
                setTimeout(() => {
                    alert('Please select a size before adding to the cart!');
                }, 500);

            } else {
                setTimeout(() => {
                const itemData = {
                    image: images.length > 0 ? images[0].src : '', // Get the src of the first image, skickar vidare till korgarna
                    title: this.shadowRoot.querySelector('slot[name="title"]').assignedNodes()[0].textContent.trim() || "Untitled Item", // Get the title from the title slot, det sista visas om inget hittas i modem
                    price: this.shadowRoot.querySelector('slot[name="price"]').assignedNodes()[0].textContent.trim().replace('$','') || "Unknown Price", // Get the price from the price slot, tar bort dollar tecknet för att räkna ut totalpris enklare
                    size: selectedSize
                };
                // skapar eventet som sedan bubblar upp genom shadow DOM med infon om produkten som sedan fångas av quickview och varukorgen
                this.dispatchEvent(new CustomEvent('add-to-cart', {
                    detail: itemData, // Pass item data with the event
                    bubbles: true,     // Allow the event to bubble up
                    // nedanstående kanske inte är nödvändig
                    // composed: false     // Allow the event to cross the shadow DOM boundary
                }));
            }, 500);
            }
        });

    }
}

window.customElements.define("item-page", ItemPage);