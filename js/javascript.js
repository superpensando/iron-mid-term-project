
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

    /* Projects */
    const recentProjectsTitle = document.querySelectorAll(".projects__title");
    const recentProjectsBody = document.querySelectorAll(".projects__description");
    const recentProjectsImg = document.querySelectorAll(".projects__img");
    const getDom = (selectDom,selectDomType,finalResId, finalResEl) => {
        selectDom.forEach(
            (el2, index) => {
                const indexEl2 = index + 1;
                if (indexEl2 === finalResId && finalResId < 4) {  
                    if (selectDomType === "img") {
                        el2.src = `${finalResEl}`;
                    } else {
                        el2.innerHTML = `${finalResEl}`;
                    }
                }                                     
            }
        );
    };

    async function getPosts() {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        const finalRes = await res.json(); 
        finalRes.forEach(
            (el1) => {
                getDom(recentProjectsTitle,"",el1.id, el1.title);
                getDom(recentProjectsBody,"",el1.id, el1.body);       
            }
        );     
    }

    async function getPostsImg() {
        const res = await fetch("https://jsonplaceholder.typicode.com/photos");
        const finalRes = await res.json(); 
        finalRes.forEach(
            (el1) => {   
                getDom(recentProjectsImg,"img",el1.id, el1.url);       
            }
        );     
    }

    getPosts();
    getPostsImg();
    /* End Projects */

    /* Newsletter */
    async function createEmail(e) {
        e.preventDefault();
        console.log(newsletterEmail)
        const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            email: newsletterEmail,
          }),
        });
        const finalRes = await res.status;
        console.log(finalRes);
      }
      
    
    const newsletterEmail = document.querySelector('.newsletter__input-email').value;
    const newsletterButton = document.querySelector('.newsletter__button');
    newsletterButton.addEventListener("click", createEmail);
    /* End Newsletter*/

