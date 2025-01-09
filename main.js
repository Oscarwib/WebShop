document.addEventListener("DOMContentLoaded", (event) => {

    const cart = document.querySelector('.fa');
    const myComponent = document.querySelector('cart-page');
    // const shadowRoot = myComponent.shadowRoot;
    // const internalElement = shadowRoot.querySelector('.checkout');

    const shadowRoot = myComponent.shadowRoot;
    const internalElement = shadowRoot.querySelector('.checkout');
    const homepage = document.querySelector('.home-page');
    const pages = document.querySelectorAll('item-page');
    const logo = document.querySelector('.logo');

    logo.addEventListener('click', () => {
        
        pages.forEach(pg => {
            pg.hide();
        })
        homepage.setAttribute("aria-hidden", "false");
    })
        
    // intr.setAttribute("aria-hidden", "true");
    // console.log(shadowRoot)
    

    const homeBtn = document.querySelector('.logo');

    const home = document.querySelector('home-page');

    homeBtn.addEventListener('click', () => {
        home.show();
        myComponent.hide();
        pages.forEach(pg => {
            pg.hide();
        })
        homepage.setAttribute("aria-hidden", "false");
    })
        
    })


    cart.addEventListener('click', () => {
        myComponent.show();
        // internalElement.setAttribute("aria-hidden", "false");
        pages.forEach(pg => {
            pg.hide();
        })
        home.hide();
    })

  });