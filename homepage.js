class HomePage extends HTMLElement {
  constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = `

      <style>
      
      .homepage[aria-hidden="false"] {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: auto;
          min-height: 100vh;
          overflow-y: auto;
      }
      
      .homepage[aria-hidden="true"] {
          display: none;
      }

      .new-releases {
        display:flex;
        flex-direction: column;
        font-size: 24px;
        font-family: Arial, Helvetica, sans-serif;
        margin: 50px;
      }

      .new-releases slot[name="new-shoes"]::slotted(*) {
        flex: 0 0 auto;
        scroll-snap-align: start;
      }

      .new-releases .thumbnails {
        display: flex;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        gap: 50px;
      }

      .arrows {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
      }

      .arrow {
        pointer-events: auto;
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
        
      .heading {
        display: flex;
        justify-content: space-between;
      }
        
      
      ::slotted(img[slot="header"]) {
        width: 100%;
        height: auto;
      }
      
      ::slotted(img[slot="new-shoes"]) {
        width: 300px;
        height: 300px;
        object-fit: cover;
        cursor: pointer;
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
          <div class="thumbnails">
            <slot name="new-shoes"></slot>
        </div>
      </div>
      
      
        `;
  }

  hide() {
      const home = this.shadowRoot.querySelector('.homepage');
      home.setAttribute("aria-hidden", "true");
  }

  show() {
      const home = this.shadowRoot.querySelector('.homepage');
      home.setAttribute("aria-hidden", "false");
  }

  connectedCallback() {
      const thumbnailsContainer = this.shadowRoot.querySelector('.thumbnails');
      const arrowLeft = this.shadowRoot.querySelector('.L');
      const arrowRight = this.shadowRoot.querySelector('.R');
      const scrollDistance = 350;

      arrowLeft.addEventListener('click', () => {
        thumbnailsContainer.scrollBy({
            left: -scrollDistance,
            behavior: 'smooth',
        });
      });

      arrowRight.addEventListener('click', () => {
        thumbnailsContainer.scrollBy({
            left: scrollDistance,
            behavior: 'smooth',
        });
      });

      const headerImg = this.querySelector('img[alt="headerimg"]');
      if (headerImg) {
          headerImg.setAttribute('slot', 'header'); //sätter in bilden i rätt slot
      }

      const newShoes = this.querySelectorAll('.new-shoe'); // hämtae alla bilden från html filen med klass new-shoe

      newShoes.forEach(img => {
        // för varje bilde som är new shoe sätter vi dem i rätt slot samt hämtar deras data-id attribut
          img.setAttribute('slot', 'new-shoes');
          const dataId = img.getAttribute('data-id');

          img.addEventListener('click', () => {
            // i varje bild lägger vi ett event som gör att vi hamnar på item page somm tillhör 
              console.log(`Image with data-id ${dataId} clicked!`); //loggar den itemen vi klickar på

              const itemPage = document.querySelector(`item-page[data-id="${dataId}"]`); //hämtar den itempage vi har klickat på(matchar data-idt)

              console.log('Matching item-page found:', itemPage);
              this.hide();//gömmer homepage

              itemPage.show();//visar den itempagen vi klickade på
           

          })

      });

  }
}

window.customElements.define("home-page", HomePage);