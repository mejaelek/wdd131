 // booking.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("booking-form");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const date = document.getElementById("date").value.trim();

            if (!name || !email || !date) {
                alert("Please fill in all required fields.");
                return;
            }

            localStorage.setItem("userName", name);
            alert("Booking successful. Welcome " + name + "!");
            form.reset();
        });
    }
});