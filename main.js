document.addEventListener("DOMContentLoaded", (event) => {

    const item = document.querySelector('.fa');
    const myComponent = document.querySelector('cart-page');
    const shadowRoot = myComponent.shadowRoot;
    const internalElement = shadowRoot.querySelector('.checkout');

    const pages = document.querySelectorAll('item-page');


    item.addEventListener('click', () => {
        internalElement.setAttribute("aria-hidden", "false");
        pages.forEach(pg => {
            pg.hide();
        })
        
        // intr.setAttribute("aria-hidden", "true");
        // console.log(shadowRoot)
    })

  });