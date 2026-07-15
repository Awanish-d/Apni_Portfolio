const toast = document.getElementById("toast");

const toastMessage = document.getElementById("toast-message");
function showToast(message, type = "success") {

    toastMessage.textContent = message;

    toast.classList.remove("show", "error");

    if (type === "error") {
        toast.classList.add("error");
    }

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 5000);

}
const submitBtn = document.getElementById("submit-btn");
const form = document.getElementById("contact-form");

const fields = {
    name: document.getElementById("name"),
    email: document.getElementById("email"),
    subject: document.getElementById("subject"),
    message: document.getElementById("message")
};

function setError(input, message) {

    const group = input.parentElement;
    const error = group.querySelector(".error");

    input.classList.add("input-error");
    input.classList.remove("input-success");

    error.textContent = message;
}

function setSuccess(input) {

    const group = input.parentElement;
    const error = group.querySelector(".error");

    input.classList.remove("input-error");
    input.classList.add("input-success");

    error.textContent = "";

}

function isValidEmail(email) {

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);

}

function validateForm() {

    let valid = true;

    // Name

    if(fields.name.value.trim() === ""){

        setError(fields.name,"Please enter your name");

        valid = false;

    }else{

        setSuccess(fields.name);

    }

    // Email

    if(!isValidEmail(fields.email.value.trim())){

        setError(fields.email,"Please enter a valid email");

        valid = false;

    }else{

        setSuccess(fields.email);

    }

    // Subject

    if(fields.subject.value.trim() === ""){

        setError(fields.subject,"Please enter subject");

        valid = false;

    }else{

        setSuccess(fields.subject);

    }

    // Message

    if(fields.message.value.trim().length < 15){

        setError(fields.message,"Message must contain at least 15 characters");

        valid = false;

    }else{

        setSuccess(fields.message);

    }

    return valid;

}

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    if (!validateForm()) {

        showToast("Please fix the highlighted fields", "error");

        return;

    }

    submitBtn.disabled = true;

    submitBtn.innerHTML = `
        <i data-lucide="loader-circle"></i>
        <span>Sending...</span>
    `;

    lucide.createIcons();

    try {

        await emailjs.send(

            "service_717v01b",

            "template_xinmn2a",

            {

                name: fields.name.value,

                email: fields.email.value,

                subject: fields.subject.value,

                message: fields.message.value

            }

        );

        showToast(
    "🎉 Thank you! Your message has been sent successfully."
);

        form.reset();

        document.querySelectorAll("input,textarea").forEach(input=>{

            input.classList.remove("input-success");

        });

    }

    catch(error){

        console.error(error);

        showToast("Failed to send message","error");

    }

    finally{

        submitBtn.disabled=false;

        submitBtn.innerHTML=`

            <i data-lucide="send"></i>

            <span>Send Message</span>

        `;

        lucide.createIcons();

    }

});