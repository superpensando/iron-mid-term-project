
window.addEventListener('load', () => {
    /* Header */
    const menuOpenClose = document.querySelector('.header__menu');
    menuOpenClose.addEventListener('click', () => {
        menuOpenClose.classList.toggle("isOpen");
    });

    
  
    const navigationAll = document.querySelectorAll('.header__navigation-list-item');
    navigationAll.forEach(element => {
        element.addEventListener('click', (Event) => {
            const navigationActive = document.querySelector('.isActive');
            navigationActive.classList.remove("isActive");
            Event.path[1].classList.add("isActive");
        });
    });
    
 
    /* End Header */
});
