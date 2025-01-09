document.addEventListener("DOMContentLoaded", (event) => {

    const item = document.querySelector('.fa');
    const myComponent = document.querySelector('cart-page');
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
    


    item.addEventListener('click', () => {
        internalElement.setAttribute("aria-hidden", "false");
        pages.forEach(pg => {
            pg.hide();
        })
        
        // intr.setAttribute("aria-hidden", "true");
        // console.log(shadowRoot)
    })

  });