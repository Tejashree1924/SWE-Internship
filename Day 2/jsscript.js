let submissions = [];

let form = document.getElementById("contactForm");
let list = document.getElementById("list");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    // Get values from the form
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let email = document.getElementById("email").value;
    let queryType = document.querySelector('input[name="queryType"]:checked').value;
    let message = document.getElementById("message").value;
    let consent = document.getElementById("consent").checked;

    // Create the inner object
    let user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        queryType: queryType,
        message: message,
        consent: consent
    };

    // Create the outer object
    let submission = {
        user: user
    };

    // Store the outer object inside the array
    submissions.push(submission);

    console.log(submissions);

    // Clear previous list
    list.innerHTML = "";

    // Display all submissions
    submissions.forEach(function (person) {

        let li = document.createElement("li");

        li.textContent =
            "First Name: " + person.user.firstName +
            " | Last Name: " + person.user.lastName +
            " | Email: " + person.user.email +
            " | Query: " + person.user.queryType +
            " | Message: " + person.user.message +
            " | Consent: " + person.user.consent;

        list.appendChild(li);

    });

    alert("Form Submitted Successfully");

    form.reset();

});