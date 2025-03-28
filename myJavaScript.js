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

    const reservations = []; // Array to store reservations
    const totalRooms = 8; // Total number of rooms
    
    // Function to update the room availability grid
    function updateRoomAvailability() {
        const roomGrid = document.getElementById('room-availability');
        if (!roomGrid) {
            console.error('Room grid container not found!');
            return;
        }
    
        roomGrid.innerHTML = ''; // Clear the grid
    
        const currentTime = new Date();
    
        for (let i = 1; i <= totalRooms; i++) {
            const roomReservations = reservations.filter(
                (res) => res.roomNumber === i && new Date(res.endTime) > currentTime
            );
    
            const isAvailable = roomReservations.length === 0;
    
            // Create a button for each room
            const roomButton = document.createElement('button');
            roomButton.classList.add('room-button');
            roomButton.textContent = `Room ${i}`;
            roomButton.classList.add(isAvailable ? 'available' : 'reserved');
    
            // Add a tooltip for reserved rooms
            if (!isAvailable) {
                const reservation = roomReservations[0];
                roomButton.title = `Reserved until ${new Date(reservation.endTime).toLocaleString()}`;
            }
    
            roomGrid.appendChild(roomButton);
        }
    }
    
    // Event listener for the reservation form submission
    document.getElementById('reserve-room-form').addEventListener('submit', function (event) {
        event.preventDefault();
    
        const roomNumber = parseInt(document.getElementById('room-number').value, 10);
        const reservationDate = document.getElementById('reservation-date').value;
        const reservationTime = document.getElementById('reservation-time').value;
        const duration = parseInt(document.getElementById('duration').value, 10);
    
        const startTime = new Date(`${reservationDate}T${reservationTime}`);
        const endTime = new Date(startTime.getTime() + duration * 60 * 60 * 1000);
    
        // Check if the room is available for the selected time
        const overlappingReservation = reservations.find(
            (res) =>
                res.roomNumber === roomNumber &&
                ((startTime >= new Date(res.startTime) && startTime < new Date(res.endTime)) ||
                    (endTime > new Date(res.startTime) && endTime <= new Date(res.endTime)))
        );
    
        if (overlappingReservation) {
            alert(`Room ${roomNumber} is already reserved during the selected time.`);
        } else {
            reservations.push({ roomNumber, startTime, endTime });
            updateRoomAvailability();
            alert(`Room ${roomNumber} reserved from ${startTime.toLocaleString()} to ${endTime.toLocaleString()}.`);
        }
    });
    
    // Initialize the room availability display
    document.addEventListener('DOMContentLoaded', () => {
        updateRoomAvailability();
    });

    function updateRoomAvailability() {
        const roomGrid = document.getElementById('room-availability');
        roomGrid.innerHTML = ''; // Clear the grid
    
        const currentTime = new Date();
    
        for (let i = 1; i <= totalRooms; i++) {
            const roomReservations = reservations.filter(
                (res) => res.roomNumber === i && new Date(res.endTime) > currentTime
            );
    
            const isAvailable = roomReservations.length === 0;
    
            // Create a button for each room
            const roomButton = document.createElement('button');
            roomButton.classList.add('room-button');
            roomButton.textContent = `Room ${i}`;
            roomButton.classList.add(isAvailable ? 'available' : 'reserved');
    
            // Add a tooltip for reserved rooms
            if (!isAvailable) {
                const reservation = roomReservations[0];
                roomButton.title = `Reserved until ${new Date(reservation.endTime).toLocaleString()}`;
            } else {
                roomButton.title = 'Available';
            }
    
            roomGrid.appendChild(roomButton);
        }
    }