export function initializeContactForm() {
  const form = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        message: form.message.value,
      };

      try {
        // Send email using EmailJS
        await emailjs.send(
          "service_249wjwf", // Your actual service ID from EmailJS dashboard
          "template_qwsivo6", // Your actual template ID
          {
            from_name: `${formData.firstName} ${formData.lastName}`,
            message: formData.message,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
          }
        );

        // Show success message with animation
        successMessage.classList.remove("hidden");
        successMessage.classList.add("slide-in");
        form.reset();

        // Hide success message after 5 seconds
        setTimeout(() => {
          successMessage.classList.add("slide-out");
          setTimeout(() => {
            successMessage.classList.add("hidden");
            successMessage.classList.remove("slide-in", "slide-out");
          }, 500);
        }, 5000);
      } catch (error) {
        console.error("Error sending email:", error);
        alert("There was an error sending your message. Please try again.");
      }
    });
  }
}
