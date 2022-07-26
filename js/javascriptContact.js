/* Contact */
const contactFieldset = document.querySelector(".contact__fieldset-message");
async function postContactForm(Event) {
    Event.preventDefault();
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
            "name":"value" //==> Esto funciona porque es fake, aquí iría un objecto con los campos que mandamos al backend
         }),
    });
    const finalRes = await res.status;

    const contactFields = document.querySelectorAll(".contact__form-element");       
    contactFields.forEach(
        (el) => {
                if (el.getAttribute("required") === "true") {
                    const fieldName=el.getAttribute("name");
                    const fieldValue=el.getAttribute("value");
                    statusResponse(finalRes, fieldName, el.value ,contactFieldset);
                }
           }
    );
 
    


}
const contactButton = document.querySelector('.contact__button');
contactButton.addEventListener("click", postContactForm);
/* End Contact*/