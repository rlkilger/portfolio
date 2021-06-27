// // There are many ways to pick a DOM node; here we get the form itself and the email
// // input box, as well as the span element into which we will place the error message.
// const form  = document.getElementsByTagName('form')[0];

// const email = document.getElementById('mail');
// const emailError = document.querySelector('#mail + span.error');

// email.addEventListener('input', function (event) {
//   // Each time the user types something, we check if the
//   // form fields are valid.

//   if (email.validity.valid) {
//     // In case there is an error message visible, if the field
//     // is valid, we remove the error message.
//     emailError.textContent = ''; // Reset the content of the message
//     emailError.className = 'error'; // Reset the visual state of the message
//   } else {
//     // If there is still an error, show the correct error
//     showError();
//   }
// });

// form.addEventListener('submit', function (event) {
//   // if the email field is valid, we let the form submit

//   if(!email.validity.valid) {
//     // If it isn't, we display an appropriate error message
//     showError();
//     // Then we prevent the form from being sent by canceling the event
//     event.preventDefault();
//   }
// });

// function showError() {
//   if(email.validity.valueMissing) {
//     // If the field is empty,
//     // display the following error message.
//     emailError.textContent = 'You need to enter an e-mail address.';
//   } else if(email.validity.typeMismatch) {
//     // If the field doesn't contain an email address,
//     // display the following error message.
//     emailError.textContent = 'Entered value needs to be an e-mail address.';
//   } else if(email.validity.tooShort) {
//     // If the data is too short,
//     // display the following error message.
//     emailError.textContent = `Email should be at least ${ email.minLength } characters; you entered ${ email.value.length }.`;
//   }

//   // Set the styling appropriately
//   emailError.className = 'error active';
// }



// There are fewer ways to pick a DOM node with legacy browsers
const form  = document.getElementsByTagName('form')[0];
const email = document.getElementById('mail');

// The following is a trick to reach the next sibling Element node in the DOM
// This is dangerous because you can easily build an infinite loop.
// In modern browsers, you should prefer using element.nextElementSibling
let error = email;
while ((error = error.nextSibling).nodeType != 1);

// As per the HTML5 Specification
const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// Many legacy browsers do not support the addEventListener method.
// Here is a simple way to handle this; it's far from the only one.
function addEvent(element, event, callback) {
  let previousEventCallBack = element["on"+event];
  element["on"+event] = function (e) {
    const output = callback(e);

    // A callback that returns `false` stops the callback chain
    // and interrupts the execution of the event callback.
    if (output === false) return false;

    if (typeof previousEventCallBack === 'function') {
      output = previousEventCallBack(e);
      if(output === false) return false;
    }
  }
};

// Now we can rebuild our validation constraint
// Because we do not rely on CSS pseudo-class, we have to
// explicitly set the valid/invalid class on our email field
addEvent(window, "load", function () {
  // Here, we test if the field is empty (remember, the field is not required)
  // If it is not, we check if its content is a well-formed e-mail address.
  const test = email.value.length === 0 || emailRegExp.test(email.value);

  email.className = test ? "valid" : "invalid";
});

// This defines what happens when the user types in the field
addEvent(email, "input", function () {
  const test = email.value.length === 0 || emailRegExp.test(email.value);
  if (test) {
    email.className = "valid";
    error.textContent = "";
    error.className = "error";
  } else {
    email.className = "invalid";
  }
});

// This defines what happens when the user tries to submit the data
addEvent(form, "submit", function () {
  const test = email.value.length === 0 || emailRegExp.test(email.value);

  if (!test) {
    email.className = "invalid";
    error.textContent = "I expect an e-mail!";
    error.className = "error active";

    // Some legacy browsers do not support the event.preventDefault() method
    return false;
  } else {
    email.className = "valid";
    error.textContent = "";
    error.className = "error";
  }
});