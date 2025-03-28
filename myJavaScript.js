// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    // Select all navbar links
    const navbarLinks = document.querySelectorAll(".navbar a");

    // Apply initial styles to make them look like buttons
    navbarLinks.forEach(link => {
        link.style.textDecoration = "none";
        link.style.color = "black";
        link.style.padding = "10px 20px";
        link.style.border = "2px solid black";
        link.style.borderRadius = "5px";
        link.style.backgroundColor = "transparent";
        link.style.margin = "0 10px"; // Adds spacing between links
        link.style.transition = "background-color 0.3s, color 0.3s, transform 0.2s";
    });

    // Add hover effects dynamically
    navbarLinks.forEach(link => {
        link.addEventListener("mouseover", () => {
            link.style.backgroundColor = "black";
            link.style.color = "white";
            link.style.transform = "scale(1.1)";
        });

        link.addEventListener("mouseout", () => {
            link.style.backgroundColor = "transparent";
            link.style.color = "black";
            link.style.transform = "scale(1)";
        });
    });
});


function handleSubmit(event) {
    event.preventDefault();
    document.getElementById('responseMessage').textContent = 
        "Thank you for reaching out to us. We have received your inquiry and will review it as soon as possible.";
    document.getElementById('responseMessage').style.display = 'block';
    event.target.reset();
}


    document.addEventListener('DOMContentLoaded', () => {
        const faqQuestions = document.querySelectorAll('.faq-question');

        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling;

                // Toggle the visibility of the answer
                if (answer.style.display === 'block') {
                    answer.style.display = 'none';
                } else {
                    answer.style.display = 'block';
                }
            });
        });
    });
