
/* Header */
const menuOpenClose = document.querySelector('.header__menu');
menuOpenClose.addEventListener('click', () => {
    menuOpenClose.classList.toggle("isOpen");
});

const navigationButton = document.querySelector('.header__button');
navigationButton.addEventListener('click', () => {
    window.location.href = '/contact.html';
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


const typeDom = (finalDomEl, selectDomType, finalResId, finalResEl) => {
    switch (selectDomType) {
        case "img":
            finalDomEl.src = `${finalResEl}`;
            break;
        case "alt":
            finalDomEl.alt = `${finalResEl}`;
            break;
        case "href":
            finalDomEl.href = `${finalResEl}?id=${finalResId}`;
            break;
        default:
            finalDomEl.innerHTML = `${finalResEl}`;
            break;
    }
}

const setDom = (selectDom, selectDomType, finalResId, finalResEl) => {
    if (selectDom.length > 0) {
        selectDom.forEach(
            (el2, index) => {
                const indexEl2 = index + 1;
                if (indexEl2 === finalResId && finalResId < 4) {
                    typeDom(el2, selectDomType, finalResId, finalResEl,);
                }
            }
        );
    } else {
        typeDom(selectDom, selectDomType, finalResId, finalResEl);
    }

};



/* Projects */
const recentProjectsTitle = document.querySelectorAll(".projects__title");
const recentProjectsBody = document.querySelectorAll(".projects__description");
const recentProjectsImg = document.querySelectorAll(".projects__img");
const recentProjectsLink = document.querySelectorAll(".projects__link");

async function getPosts() {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const finalRes = await res.json();
    finalRes.forEach(
        (el1) => {
            const postTitle = el1.title;
            const postTitleShort = postTitle.substring(0, 30) + "...";
            const postBody = el1.body;
            const postBodyShort = postBody.substring(0, 160) + "...";
            setDom(recentProjectsTitle, "", el1.id, postTitleShort);
            setDom(recentProjectsBody, "", el1.id, postBodyShort);
            setDom(recentProjectsImg, "alt", el1.id, postTitleShort);
            setDom(recentProjectsLink, "href", el1.id, "project.html");

        }
    );
}

async function getPostsImg() {
    const res = await fetch("https://jsonplaceholder.typicode.com/photos");
    const finalRes = await res.json();
    finalRes.forEach(
        (el1) => {
            setDom(recentProjectsImg, "img", el1.id, el1.url);
        }
    );
}

getPosts();
getPostsImg();
/* End Projects */

/* Project Details*/
const detailProjectTitle = document.querySelector(".project-detail__title");
const detailProjectBody = document.querySelector(".project-detail__description");
const detailProjectBodyFull = document.querySelector(".project-detail__full-description");
const detailProjectsImg = document.querySelector(".project-detail__image");

async function getPostDetail(urlId) {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const finalRes = await res.json();
    finalRes.forEach(
        (el) => {
            if (el.id === urlId) {
                const postTitle = el.title;
                const postTitleShort = postTitle.substring(0, 10) + "...";
                const postBody = el.body;
                const postBodyShort = postBody.substring(0, 20) + "...";
                setDom(detailProjectTitle, "", el.id, postTitleShort);
                setDom(detailProjectBody, "", el.id, postBodyShort);
                setDom(detailProjectBodyFull, "", el.id, postBody);
                setDom(detailProjectsImg, "alt", el.id, postTitleShort);
            }
        }
    );
}
async function getPostDetailImg(urlId) {
    const res = await fetch("https://jsonplaceholder.typicode.com/photos");
    const finalRes = await res.json();
    finalRes.forEach(
        (el) => {
            if (el.id === urlId) {
                setDom(detailProjectsImg, "img", el.id, el.url);
            }
        }
    );
}
window.addEventListener('load', () => {
    const urlSearch = window.location.search;
    if (urlSearch) {
        const urlParams = new URLSearchParams(urlSearch);
        const urlId = urlParams.get('id');
        getPostDetail(Number(urlId));
        getPostDetailImg(Number(urlId));
    }
});
/* Project Details*/


/* Form Validate */
const expresions = {
    name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    comment: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    phone: /^\d{7,14}$/ // 7 a 14 numeros.
}

const flagFields = {
    formValidate:false,
}

const validateField = (fieldName, fieldValue, messageStatus) => {
    let fieldValidation;
    switch(fieldName){
        case "name":
            fieldValidation = expresions.name; 
            break;
        case "email":
            fieldValidation = expresions.email; 
            break;
        case "phone":
            fieldValidation = expresions.phone; 
            break;
        case "comment":
            fieldValidation = expresions.comment; 
            break;     
    }
    
    if (fieldValidation.test(fieldValue)) {
        document.getElementById(`${fieldName}`).classList.remove('error');
        formValidate = true; 
   } else {
        document.getElementById(`${fieldName}`).classList.add('error');
        formValidate = false; 
    }
    const errorFields = document.querySelectorAll(".contact__form-element.error");
    if (errorFields.length === 0 && formValidate === true) {
        messageStatus.innerHTML = "<div class='send__message'>Thank you! Your submission has been received!</div>";
    }
}

const statusResponse = (finalRes, fieldName, fieldValue, messageStatus) => {
    switch (finalRes) {
        case 201:
            validateField(fieldName, fieldValue, messageStatus);
            break;
        default:
            messageStatus.innerHTML = "<div class='fail__message'>I'm sorry! Your submission have a problem, contact with the administrator</div>";
            break;
    }
}
/* Form Validate */


