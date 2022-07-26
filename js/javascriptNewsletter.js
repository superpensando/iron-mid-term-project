/* Newsletter */
const newsletterFieldset = document.querySelector(".newsletter__fieldset");
async function postNewsForm(Event) {
    Event.preventDefault();
    const newsletterEmail = document.getElementById('email');
    if (newsletterEmail.getAttribute("required") === "true") {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                email: newsletterEmail.value,
            }),
        });
        const finalRes = await res.status;
        statusResponse(finalRes, "email", newsletterEmail.value, newsletterFieldset);
    }
  
}

const newsletterButton = document.querySelector('.newsletter__button');
newsletterButton.addEventListener("click", postNewsForm);
/* End Newsletter*/
