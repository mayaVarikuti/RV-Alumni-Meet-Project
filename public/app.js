/**
 * Author: Maya Varikuti
 * Date: 06/07/2026
 * Citations (for index.html, styles.css, app.js):
 * - HTML, CSS, JS Docs from Mozilla: https://developer.mozilla.org/en-US/
 */

// Keeps track of the number of people
var i = 1;
// Event Listeners:
document.getElementById("plus").addEventListener('click', addMorePeople);
document.getElementById("paypal").addEventListener("change", paymentSelection);
document.getElementById("qr").addEventListener("change", paymentSelection);
document.registrationForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const scriptURL = "https://script.google.com/macros/s/AKfycbxvtFqoTn00dt7hju5fwMRfAJTh3IzVFrpAH71XP1UjYOuiCykAL6TWlUMxFI3C9FQSmA/exec";
    const formData =  new FormData(document.registrationForm);

    fetch(scriptURL, { method: 'POST', body: formData})
      .then(response => response.json())
      .then(data => {
        if (data.result === 'success') {
          document.registrationForm.reset();
          document.registrationForm.innerHTML = "<p>Form submitted! We'll review the information and contact you with further steps.</p>";
        } else {
          throw new Error('Form submission failed');
        }
      })
      .catch(error => {
        console.error('Error!', error.message);
    });
  });


/**
 * Function that adds more personal info slots when the group size input changes.
 */
function addMorePeople() {
    // Increment the number of people
    i++;

    // for every additional person, add a new block for personal info
    var text = `<h4>Person ${i}</h4>
        <label for="firstName${i}">First name:</label>
        <input type="text" name="firstName${i}" required>
        <br>

        <label for="lastName${i}">Last name:</label>
        <input type="text" name="lastName${i}" required>
        <br>

        <label for="email${i}">Primary Email:</label>
        <input type="email" 
            name="email${i}"
            required>
        <br>

        <label for="emailSec${i}">Secondary Email (Optional):</label>
        <input type="email"
            name="emailSec${i}">
        <br>

        <label for="phone${i}">Phone number (with country code):</label>
        <input type="tel" 
            name="phone${i}" 
            minlength="11"
            placeholder=""
            required>
        <br>

        <label for="address${i}">Address:</label>
        <input type="text" 
            name="address${i}" 
            size="40"
            required>
        <br>

        <p class="formLabel">Gender:</p>
        <input type="radio" id="m${i}" name="gender${i}" value="Male" required>
        <label for="m${i}">Male</label>
        <input type="radio" id="f${i}" name="gender${i}" value="Female" required>
        <label for="f${i}">Female</label>
        <br>

        <p class="formLabel">Class Year:</p>
        <input type="radio" id="icse${i}" name="class${i}" value="ICSE" required>
        <label for="icse${i}">ICSE</label>
        <input type="radio" id="isc${i}" name="class${i}" value="ISC" required>
        <label for="isc${i}">ISC</label>
        <input type="text" 
            name="year${i}" 
            inputmode="numeric" 
            size="4"
            maxlength="4"
            minlength="4"
            required>
        <br>

        <p class="formLabel">Shirt size:</p>
        <input type="radio" id="small${i}" name="size${i}" value="Small" required>
        <label for="small${i}">Small</label>
        <input type="radio" id="medium${i}" name="size${i}" value="Medium" required>
        <label for="medium${i}">Medium</label>
        <input type="radio" id="large${i}" name="size${i}" value="Large" required>
        <label for="large${i}">Large</label>
        <br>`;

    // add the blocks to html page
    document.querySelector("#additionalPersonalInfo").innerHTML += text;

}

/**
 * Function that displays steps for the selected payment method.
 * For PayPal, it will show a Paypal interface.
 * For QR code, an image of the QR code and a place to upload confirmation.
 */
function paymentSelection() {
    // get the inputted payment type
    var payment = document.registrationForm.payment.value;

    // display next steps for payment depending on which payment was chosen
    if(payment == "paypal") {
        document.querySelector("#paymentMethod").innerHTML = "<p>Placeholder for PayPal</p>";
    } else {
        document.querySelector("#paymentMethod").innerHTML = `<p>Placeholder for QR Code</p>
        <p id="confirmationRequest">Please upload an image confirming your payment.</p>
        <input type="file" id="paymentConfirmation" accept="image/*" name="filename" required>`;
    }
}
