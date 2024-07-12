async function sendMail(contactForm) {
    // Validate inputs
    if (!contactForm.name.value || !contactForm.emailaddress.value || !contactForm.projectsummary.value) {
        alert("Please fill in all fields");
        return false;
    }

    // Disable submit button to prevent multiple submissions
    const submitButton = contactForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;

    try {
        const response = await emailjs.send(
            "service_vcwvv4p",
            "personal", {
                "from_name": contactForm.name.value,
                "from_email": contactForm.emailaddress.value,
                "message": contactForm.projectsummary.value
            }
        );
        console.log("SUCCESS", response);
        Swal.fire({
            title: 'Success!',
            text: 'Email sent successfully!',
            icon: 'success',
            confirmButtonText: 'Cool'
        });
    } catch (error) {
        console.log("FAILED", error);
        Swal.fire({
            title: 'Error!',
            text: 'Failed to send email. Please try again later.',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
    } finally {
        // Re-enable submit button
        submitButton.disabled = false;
    }
}

// Event listener outside the async function
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        sendMail(this);
    });
});