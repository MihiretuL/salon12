document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        alert("Your message has been sent!");
        form.reset();
    });

    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    hamburger.addEventListener("click", function() {
        navMenu.classList.toggle("active");
    });
});


document.addEventListener("DOMContentLoaded", function() {
    // Contact Form Submission
    const form = document.getElementById("contact-form");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        alert("Thank you for reaching out! We’ll get back to you soon.");
        form.reset();
    });

    // Testimonial Slider (Auto-scroll)
    const testimonialContainer = document.querySelector(".testimonial-container");
    let scrollAmount = 0;

    function autoScrollTestimonials() {
        if (scrollAmount < testimonialContainer.scrollWidth - testimonialContainer.clientWidth) {
            scrollAmount += 320; 
        } else {
            scrollAmount = 0;
        }
        testimonialContainer.scrollTo({
            left: scrollAmount,
            behavior: "smooth"
        });
    }

    setInterval(autoScrollTestimonials, 3000); // Auto-scroll every 3 seconds
});
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("show");
    });
});


// Import mysql2 package
const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',          // Host where your MySQL is running (usually localhost for local setup)
  user: 'root',               // Your MySQL username (default is 'root' if you haven't changed it)
  password: '',               // Your MySQL password (leave it empty if you haven't set one)
  database: 'beauty_salon'    // The name of your database (replace 'beauty_salon' with your actual database name)
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the MySQL database');
});

// Example: Running a simple query to check connection
connection.query('SELECT NOW()', (err, results) => {
  if (err) throw err;
  console.log('Current time:', results);
});

// Don't forget to close the connection when done
// connection.end();
document.addEventListener("DOMContentLoaded", function () {
    const bookingForm = document.getElementById("booking-form");
    const bookingStatus = document.getElementById("booking-status");

    bookingForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent form from refreshing the page

        // Get form data
        const formData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            date: document.getElementById("date").value,
            time: document.getElementById("time").value
        };

        try {
            // Send data to the server
            const response = await fetch("http://localhost:5000/api/bookings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                bookingStatus.style.color = "green";
                bookingStatus.textContent = result.message;
                bookingForm.reset(); // Clear the form after successful submission
            } else {
                bookingStatus.style.color = "red";
                bookingStatus.textContent = result.message;
            }
        } catch (error) {
            bookingStatus.style.color = "red";
            bookingStatus.textContent = "Something went wrong. Please try again.";
            console.error("Error:", error);
        }
    });
});
