class HomePage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `

        <style>
        
        .homepage[aria-hidden="false"] {
            display: flex;
            flex-direction: column;
            height: 100%;
        }
        
        .homepage[aria-hidden="true"] {
            display: none;
        }

        .new-releases {
            font-size: 24px;
            font-family: Arial, Helvetica, sans-serif;
            margin: 50px;
          }
          
          .arrow {
            border: solid black;
            border-width: 0 3px 3px 0;
            display: inline-block;
            padding: 8px;
          }
          
          .R {
          transform: rotate(-45deg);
          -webkit-transform: rotate(-45deg);
          }
          
          .L {
          transform: rotate(135deg);
          -webkit-transform: rotate(135deg);
          }
          
          .heading {
            display: flex;
            justify-content: space-between;
          }
          
          .arrows {
            display: flex;
          }
        
          ::slotted(img[slot="header"]) {
            width: 100%;
            height: auto;
        }
        
         ::slotted(img[slot="new-shoes"]) {
            width: 300px;
            height: auto;
        }
            
        
        </style>
        
        <div class="homepage" aria-hidden="false">
          <slot name="header"></slot>
          <div class="new-releases">
            <div class="heading">
              <p>New releases</p>
              <div class="arrows">
                <p><i class="arrow L"></i></p>
                <p><i class="arrow R"></i></p>
              </div>
            </div>
            <slot name="new-shoes"></slot>
          </div>
        </div>
        
        
          `;
    }

    connectedCallback() {
        const headerImg = this.querySelector('img[alt="headerimg"]');
        if (headerImg) {
            headerImg.setAttribute('slot', 'header');
        }

        const newShoes = this.querySelectorAll('.new-shoe');
        newShoes.forEach(img => {
            img.setAttribute('slot', 'new-shoes');
            const dataId = img.getAttribute('data-id');
            const page = this.shadowRoot.querySelector('.homepage')

            img.addEventListener('click', () => {
                console.log(`Image with data-id ${dataId} clicked!`);

                const itemPage = document.querySelector(`item-page[data-id="${dataId}"]`);

                if (itemPage) {
                    console.log('Matching item-page found:', itemPage);
                    page.setAttribute("aria-hidden", "true")

                    
                    // document.querySelectorAll('item-page').forEach(page => {
                    //     page.style.display = 'none';
                    // });

                    itemPage.style.display = 'block';

                } else {
                    console.log('No matching item-page found for data-id:', dataId);
                }

            })

        });

    }
}

window.customElements.define("home-page", HomePage);