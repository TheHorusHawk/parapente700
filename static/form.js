//Form validation

//gets default border style and sets fail border colours (to use if validation fails)
const borderStyleDefault = document.querySelector('#firstName').style.border
const borderStyleFail = '5px solid red';

//regular expression for validating emails
const reEmail = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/


//Function adds the two functions to the appropriate events - when form is submitted and when button is clicked
document.addEventListener('DOMContentLoaded', event => {
    const submit_button = document.getElementById('form_submit');
    submit_button.addEventListener('click', validation)
    const form = document.getElementById('contact-form');
    form.addEventListener('submit',submission)
})

function validation (event) {
    //form validation - Requires valid email and
    //either being added to mailing list or sending a message
    //gets necessary fields for validation

    const email = document.getElementById('email');
    const mailinglistCheck = document.getElementById('mailinglistCheck')
    const message = document.getElementById('message')

    //resets all borders and fail styling
    email.style.border = borderStyleDefault
    message.style.border = borderStyleDefault
    mailinglistCheck.parentNode.style.border = borderStyleDefault;
    mailinglistCheck.parentNode.style.padding = '0 0rem 0 1.5rem';

    //Removes the email validation field if it exists
    try {
        let emailValidation = document.getElementById("emailValidation");
        emailValidation.remove()
    }
    catch (err) {
        if (err instanceof TypeError) {
            console.log("Expected behaviour, element doesn't exist");
        }
        else {
            console.err(err)
        }
    }

    //boolean keeps track of validation, initialized as true
    let blnValidated = true;

    //verifies there's an email, warns otherwise
    if (!email.value) {
            blnValidated = false;
            //Creates message under email field to indicate error 
            email.insertAdjacentHTML("afterend", "<div id='emailValidation' class='form-text'>Please type in your email</div>");
            //Changes border of email field
            email.style.border = borderStyleFail;
    }
    //verifies the email is valid, warns otherwise
    else if (!reEmail.test(email.value)) {
            blnValidated = false;
            email.insertAdjacentHTML("afterend", "<div id='emailValidation' class='form-text'>Please type in a valid email address</div>");
            //Changes border of email field
            email.style.border = borderStyleFail;
    }
    //verifies there's either a message or a subscription to a mailing list, warns otherwise
    else if (!mailinglistCheck.checked && !message.value) {
        blnValidated = false;
        //changes messageHelp under message field
        let messagehelp = document.getElementById('messageHelp')
        messageHelp.innerHTML = 'Please write us a message or tick below to subscribe to our mailing list';
        //gets and displays modal for error
        let msgModal = new bootstrap.Modal(document.getElementById('msgModal'), {});
        msgModal.show();
        //changes borders to red and adds padding 
        message.style.border = borderStyleFail;
        mailinglistCheck.parentNode.style.border = borderStyleFail;
        mailinglistCheck.parentNode.style.padding = '0 0.5rem 0 2rem';
    }
    //if validation failed do not allow the form to submit the data
    if (!blnValidated) {
        event.preventDefault();
    }
}

function submission(event) {
    event.preventDefault();
    let submittedModal = new bootstrap.Modal(document.getElementById('submittedModal'), {});
    submittedModal.show();
    //Adds text depending on submission, if there was a subscription to the mailing list, message or both
    let text = document.getElementById('modalText')
    if (event.target[4].checked) {
        text.innerHTML += "You have subscribed to our mailing list. ";
    }
    if (event.target[3].value) {
        text.innerHTML += "You have sent us a message. ";
    }
    text.innerHTML += "Thank you."

    //resets form and modal text
    event.target.reset();
    let closeButton = document.getElementById('submitCloseButton')
    closeButton.addEventListener('click',() => text.innerHTML = '')

}
