document.addEventListener("DOMContentLoaded", (event) => {

    const cart = document.querySelector('.fa');
    const myComponent = document.querySelector('cart-page');
    // const shadowRoot = myComponent.shadowRoot;
    // const internalElement = shadowRoot.querySelector('.checkout');

    const pages = document.querySelectorAll('item-page');

    const homeBtn = document.querySelector('.logo');

    const home = document.querySelector('home-page');

    homeBtn.addEventListener('click', () => {
        home.show();
        myComponent.hide();
        pages.forEach(pg => {
            pg.hide();
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