document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll(".tab");
    const tabContents = document.querySelectorAll(".tab-content");

    // Function to activate a tab
    function activateTab(tabName) {
        tabs.forEach(t => t.classList.remove("active"));
        tabContents.forEach(tc => tc.classList.remove("active"));

        const activeTab = document.querySelector(`.tab[data-tab="${tabName}"]`);
        const activeContent = document.getElementById(tabName);

        if (activeTab && activeContent) {
            activeTab.classList.add("active");
            activeContent.classList.add("active");
        }
    }

    // Check local storage for the active tab
    const savedTab = localStorage.getItem("activeTab") || "details";
    activateTab(savedTab);

    tabs.forEach(tab => {
        tab.addEventListener("click", function () {
            const target = this.getAttribute("data-tab");

            // Save the active tab to local storage
            localStorage.setItem("activeTab", target);

            activateTab(target);

            // Populate Confirmation Tab if it's opened
            if (target === "confirmation") {
                populateConfirmationTab();
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const timeOptions = document.querySelectorAll('.time-option');

    timeOptions.forEach(option => {
        option.addEventListener('click', function () {
            // Remove 'selected' class from all options
            timeOptions.forEach(opt => opt.classList.remove('selected'));
            // Add 'selected' class to the clicked option
            option.classList.add('selected');
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Get references to the elements
    const paymentButton = document.querySelector('.payment-button');
    const savedInfoContainer = document.getElementById('saved-info');
    const serviceImage = document.getElementById('service-img');

    // Get references to input fields
    const dateInput = document.getElementById('appointment-date');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const petTypeInput = document.getElementById('pet-type');
    const petBreedInput = document.getElementById('pet-breed');
    const serviceOptions = document.querySelectorAll('input[name="service-type"]');

    // Handle Payment Button Click
    paymentButton.addEventListener('click', function () {
        // Get selected date
        const selectedDate = dateInput.value;

        // Get selected time
        const selectedTime = document.querySelector('.time-option.selected')?.textContent || 'No time selected';

        // Get selected service
        let selectedService = '';
        serviceOptions.forEach(option => {
            if (option.checked) {
                selectedService = option.value;
            }
        });

        // Get email and phone
        const email = emailInput.value;
        const phone = phoneInput.value;

        // Get pet type and breed
        const petType = petTypeInput.value;
        const petBreed = petBreedInput.value;

        // Create HTML to display saved information
        const savedInfoHTML = `
            <p><strong>Date:</strong> ${selectedDate}</p>
            <p><strong>Time:</strong> ${selectedTime}</p>
            <p><strong>Service:</strong> ${selectedService}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Pet Type:</strong> ${petType}</p>
            <p><strong>Pet Breed:</strong> ${petBreed}</p>
        `;

        // Update the saved info container
        savedInfoContainer.innerHTML = savedInfoHTML;

        // Set the service image
        if (selectedService) {
            serviceImage.src = `assets/${selectedService}.png`;
            serviceImage.alt = `${selectedService} Image`;
        } else {
            serviceImage.src = ''; // Clear the image if no service is selected
            serviceImage.alt = 'No Service Selected';
        }

        // Switch to the Payment tab
        const paymentTab = document.querySelector('.tab[data-tab="payment"]');
        paymentTab.click();
    });

    // Handle Time Option Selection
    const timeOptions = document.querySelectorAll('.time-option');
    timeOptions.forEach(option => {
        option.addEventListener('click', function () {
            // Remove 'selected' class from all options
            timeOptions.forEach(opt => opt.classList.remove('selected'));
            // Add 'selected' class to the clicked option
            option.classList.add('selected');
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const serviceOptions = document.querySelectorAll('input[name="service-type"]');
    const subtotalElement = document.getElementById('subtotal');
    const grandTotalElement = document.getElementById('grand-total');

    const prices = {
        'fur_cutting': 35,
        'skin_care': 40,
        'bathing': 25,
        'spa_time': 50
    };

    const bookingFee = 0.50;
    const taxes = 0.50;

    serviceOptions.forEach(option => {
        option.addEventListener('change', function () {
            const selectedService = this.value;
            const servicePrice = prices[selectedService];
            const subtotal = servicePrice + bookingFee + taxes;
            const grandTotal = subtotal;

            subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
            grandTotalElement.textContent = `$${grandTotal.toFixed(2)}`;
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Get references to the Pay button
    const payButton = document.querySelector('.pay-button');

    // Handle Pay Button Click
    payButton.addEventListener('click', function () {
        // Switch to the Confirmation tab
        const confirmationTab = document.querySelector('.tab[data-tab="confirmation"]');
        if (confirmationTab) {
            confirmationTab.click(); // Simulate a click on the Confirmation tab
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const accordionHeader = document.querySelector('.accordion-header');
    const accordionContent = document.querySelector('.accordion-content');
    const thankYouMessage = document.querySelector('.thank-you');

    accordionHeader.addEventListener('click', function () {
        const accordion = document.querySelector('.accordion');
        accordion.classList.toggle('open');

        // Hide Thank You message when accordion is open
        if (accordion.classList.contains('open')) {
            thankYouMessage.style.display = 'none';
        } else {
            thankYouMessage.style.display = 'block';
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Function to populate Confirmation Tab with data
    function populateConfirmationTab() {
        // Get references to elements in the Confirmation tab
        const confirmationDate = document.querySelector('.confirmation-container .date-time');
        const confirmationService = document.querySelector('.confirmation-container .detail-value.service');
        const confirmationName = document.querySelector('.confirmation-container .detail-value.name');
        const confirmationEmail = document.querySelector('.confirmation-container .detail-value.email');
        const confirmationNumber = document.querySelector('.confirmation-container .detail-value.number');
        const confirmationAmount = document.querySelector('.confirmation-container .detail-value.amount');
        const serviceImage = document.querySelector('.confirmation-container .service-image'); // Service image

        // Get data from the Details tab
        const dateInput = document.getElementById('appointment-date');
        const timeOption = document.querySelector('.time-option.selected');
        const serviceOption = document.querySelector('input[name="service-type"]:checked');
        const nameInput = document.getElementById('pet-type'); // Assuming name is entered in Pet Type
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');

        // Get data from the Payment tab
        const amountElement = document.getElementById('grand-total');

        // Populate Confirmation Tab with data
        if (dateInput && timeOption) {
            const date = new Date(dateInput.value).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });
            const time = timeOption.textContent;
            confirmationDate.textContent = `${date}, ${time}`;
        }

        if (serviceOption) {
            const serviceValue = serviceOption.value.replace(/_/g, ' ');
            confirmationService.textContent = serviceValue;

            // Set the service image dynamically
            serviceImage.src = `assets/${serviceOption.value}.png`;
            serviceImage.alt = `${serviceValue} Image`;
        }

        if (nameInput) {
            confirmationName.textContent = nameInput.value;
        }

        if (emailInput) {
            confirmationEmail.textContent = emailInput.value;
        }

        if (phoneInput) {
            confirmationNumber.textContent = phoneInput.value;
        }

        if (amountElement) {
            confirmationAmount.textContent = amountElement.textContent;
        }
    }

    // Trigger the function when the Confirmation tab is opened
    const confirmationTab = document.querySelector('.tab[data-tab="confirmation"]');
    if (confirmationTab) {
        confirmationTab.addEventListener('click', populateConfirmationTab);
    }

    // Handle Change Appointment Button Click
    const changeAppointmentButton = document.querySelector('.appointment-actions .action:first-child');
    const changeAppointmentPopup = document.getElementById('change-appointment-popup');
    const closePopupButton = document.querySelector('.close-popup');

    if (changeAppointmentButton && changeAppointmentPopup && closePopupButton) {
        changeAppointmentButton.addEventListener('click', function () {
            changeAppointmentPopup.style.display = 'flex';
        });

        closePopupButton.addEventListener('click', function () {
            changeAppointmentPopup.style.display = 'none';
        });

        // Close popup when clicking outside the popup content
        window.addEventListener('click', function (event) {
            if (event.target === changeAppointmentPopup) {
                changeAppointmentPopup.style.display = 'none';
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // Get references to the Change button and popup
    const changeButton = document.querySelector('.payment-button');
    const editAppointmentPopup = document.getElementById('change-appointment-popup');
    const closePopupButton = document.querySelector('.close-popup');
    const saveChangesButton = document.querySelector('.save-changes-button');

    // Open the popup when the Change button is clicked
    if (changeButton && editAppointmentPopup) {
        changeButton.addEventListener('click', function () {
            editAppointmentPopup.style.display = 'flex';
        });
    }

    // Close the popup when the close button is clicked
    if (closePopupButton && editAppointmentPopup) {
        closePopupButton.addEventListener('click', function () {
            editAppointmentPopup.style.display = 'none';
        });
    }

    // Close the popup when clicking outside the popup content
    window.addEventListener('click', function (event) {
        if (event.target === editAppointmentPopup) {
            editAppointmentPopup.style.display = 'none';
        }
    });

    // Save changes and update the Confirmation tab
    if (saveChangesButton) {
        saveChangesButton.addEventListener('click', function () {
            // Get values from the popup inputs
            const editDate = document.getElementById('edit-appointment-date').value;
            const editTime = document.querySelector('.time-selection .time-option.selected')?.textContent;
            const editEmail = document.getElementById('edit-email').value;
            const editPhone = document.getElementById('edit-phone').value;
            const editPetType = document.getElementById('edit-pet-type').value;
            const editPetBreed = document.getElementById('edit-pet-breed').value;

            // Update the Confirmation tab
            const confirmationDate = document.querySelector('.confirmation-container .date-time');
            const confirmationEmail = document.querySelector('.confirmation-container .detail-value.email');
            const confirmationNumber = document.querySelector('.confirmation-container .detail-value.number');
            const confirmationName = document.querySelector('.confirmation-container .detail-value.name');

            if (confirmationDate && editDate && editTime) {
                const date = new Date(editDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });
                confirmationDate.textContent = `${date}, ${editTime}`;
            }

            if (confirmationEmail) {
                confirmationEmail.textContent = editEmail;
            }

            if (confirmationNumber) {
                confirmationNumber.textContent = editPhone;
            }

            if (confirmationName) {
                confirmationName.textContent = editPetType;
            }

            // Close the popup
            editAppointmentPopup.style.display = 'none';
        });
    }
});