// Mock Database Array holding existing bookings
const bookedSlots = [
    { resource: "Computer Lab 1", date: "2026-07-10", slot: "09:00 - 11:00" },
    { resource: "Seminar Hall A", date: "2026-07-11", slot: "11:00 - 01:00" }
];

// Wait for HTML to load completely
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent page from refreshing

    // Grab input data from user form
    const selectedResource = document.getElementById('resource').value;
    const selectedDate = document.getElementById('date').value;
    const selectedSlot = document.getElementById('slot').value;
    const messageBox = document.getElementById('message');

    // CRITICAL CORE LOGIC: Double-Booking Validation Check
    // This loops through the array to check if exact match exists
    const isAlreadyBooked = bookedSlots.some(booking => 
        booking.resource === selectedResource &&
        booking.date === selectedDate &&
        booking.slot === selectedSlot
    );

    if (isAlreadyBooked) {
        // Conflict detected! Deny booking.
        messageBox.innerText = `❌ Error: ${selectedResource} is already reserved for this time slot!`;
        messageBox.className = "message error";
    } else {
        // Slot is free! Save it to our array data.
        bookedSlots.push({
            resource: selectedResource,
            date: selectedDate,
            slot: selectedSlot
        });

        messageBox.innerText = `✅ Success! Your reservation has been locked in.`;
        messageBox.className = "message success";

        // Refresh our display dashboard
        renderTable();
    }
});

// Function to pull database array items onto user screen
function renderTable() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = ""; // Clear old visual rows

    bookedSlots.forEach(booking => {
        const row = `<tr>
            <td>${booking.resource}</td>
            <td>${booking.date}</td>
            <td>${booking.slot}</td>
            <td><span class="status-badge">Confirmed</span></td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

// Automatically load existing default bookings when opening application
renderTable();
