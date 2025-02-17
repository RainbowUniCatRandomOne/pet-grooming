document.addEventListener("DOMContentLoaded", function () {
    // Select only top-level nav items (exclude dropdown items)
    const navItems = document.querySelectorAll(".nav-links > li > .nav-item");
    const sections = document.querySelectorAll("section");
    const highlight = document.createElement("div");
    highlight.classList.add("highlight");
    document.querySelector(".nav-links").appendChild(highlight);

    let activeSection = ""; // Track the active section

    // Function to move the highlight for the navbar
    function moveHighlight(element) {
        const width = element.offsetWidth - 10;
        const height = element.offsetHeight - 20;
        const left = element.offsetLeft + 3;
        const top = element.offsetTop + 9;

        highlight.style.width = `${width}px`;
        highlight.style.height = `${height}px`;
        highlight.style.left = `${left}px`;
        highlight.style.top = `${top}px`;
    }

    // Function to highlight the active link in the navbar
    function highlightNav() {
        let currentSection = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionBottom = sectionTop + sectionHeight;

            // Check if the scroll position is within the current section
            if (window.scrollY >= sectionTop - window.innerHeight / 3 && window.scrollY < sectionBottom - window.innerHeight / 3) {
                currentSection = section.getAttribute("id");
            }
        });

        // Update the active section
        activeSection = currentSection;

        navItems.forEach((item) => {
            if (item.getAttribute("href").includes(activeSection)) {
                moveHighlight(item);
            }
        });
    }

    // Highlight on scroll
    window.addEventListener("scroll", highlightNav);

    // Highlight on resize (to handle switching between mobile and desktop views)
    window.addEventListener("resize", highlightNav);

    // Highlight on click for navbar items
    navItems.forEach((item) => {
        item.addEventListener("click", function (e) {
            const targetId = item.getAttribute("href");

            // Check if the target is an external link
            if (targetId.startsWith("http") || targetId.endsWith(".html")) {
                return; // Allow default behavior for external links
            }

            e.preventDefault();
            const targetSection = document.querySelector(targetId);

            // Check if the target section exists
            if (targetSection) {
                // Scroll to the target section
                targetSection.scrollIntoView({ behavior: "smooth" });

                // Update the active section
                activeSection = targetId.replace("#", "");
                highlightNav();
            } else {
                console.error(`Target section not found: ${targetId}`);
            }
        });
    });

    // Highlight the correct link immediately on page load
    highlightNav();

    // Hamburger toggle for mobile navigation
    const hamburgerIcon = document.getElementById("hamburger-icon");
    const hamburgerLinks = document.querySelector(".hamburger-links");

    hamburgerIcon.addEventListener("mouseenter", () => {
        hamburgerLinks.classList.add("active");
    });

    hamburgerIcon.addEventListener("mouseleave", () => {
        hamburgerLinks.classList.remove("active");
    });

    // Toggle dropdown for "Services" in mobile view
    const servicesDropdown = document.querySelector(".hamburger-links .dropdown > .nav-item");
    if (servicesDropdown) {
        servicesDropdown.addEventListener("click", function (e) {
            if (window.innerWidth <= 950) {
                e.preventDefault();
                const dropdownMenu = this.nextElementSibling;
                dropdownMenu.classList.toggle("active");
            }
        });
    }

    // Scroll-triggered behavior for service content
    const servicesHeader = document.querySelector(".services-header");
    const serviceContents = document.querySelectorAll(".service-content");

    window.addEventListener("scroll", function () {
        const scrollY = window.scrollY;

        // Make the header sticky
        if (scrollY > 0) {
            servicesHeader.style.position = "sticky";
            servicesHeader.style.top = "0";
        } else {
            servicesHeader.style.position = "relative";
        }

        // Handle scroll-triggered behavior for service content
        serviceContents.forEach((content, index) => {
            const contentTop = content.offsetTop;
            const contentHeight = content.offsetHeight;

            if (scrollY >= contentTop - window.innerHeight / 2 && scrollY < contentTop + contentHeight - window.innerHeight / 2) {
                content.style.opacity = "1";
                content.style.transform = "translateY(0)";
            } else {
                content.style.opacity = "0";
                content.style.transform = "translateY(50px)";
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Select the up arrow
    const upArrow = document.getElementById("upArrow");

    // Function to check scroll position and show/hide the arrow
    function toggleUpArrow() {
        const servicesSection = document.getElementById("services");
        const servicesTop = servicesSection.offsetTop;
        const servicesHeight = servicesSection.clientHeight;
        const scrollY = window.scrollY;

        // Show the arrow if the user has scrolled past the middle of the Services section
        if (scrollY > servicesTop + servicesHeight / 7) {
            upArrow.classList.add("visible");
        } else {
            upArrow.classList.remove("visible");
        }
    }

    // Add scroll event listener to toggle the arrow
    window.addEventListener("scroll", toggleUpArrow);

    // Add click event listener to scroll back to the top of the Services section
    upArrow.addEventListener("click", function (e) {
        e.preventDefault();
        document.getElementById("services").scrollIntoView({ behavior: "smooth" });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const dateInput = document.getElementById('date-input');
    const currentMonthYear = document.getElementById('current-month-year');
    const dateGrid = document.querySelector('.date-grid');
    let currentDate = new Date();
    let selectedDate = null;

    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();

        currentMonthYear.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

        dateGrid.innerHTML = '';

        for (let i = 0; i < startingDay; i++) {
            dateGrid.innerHTML += `<div class="day"></div>`;
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const day = document.createElement('div');
            day.classList.add('day');
            day.textContent = i;
            day.addEventListener('click', function () {
                selectedDate = new Date(year, month, i);
                dateInput.value = selectedDate.toLocaleDateString();
                renderCalendar();
            });

            if (selectedDate && selectedDate.getDate() === i && selectedDate.getMonth() === month && selectedDate.getFullYear() === year) {
                day.classList.add('selected');
            }

            dateGrid.appendChild(day);
        }
    }

    function changeMonth(offset) {
        currentDate.setMonth(currentDate.getMonth() + offset);
        renderCalendar();
    }

    renderCalendar();
});

document.addEventListener('DOMContentLoaded', function () {
    // Function to get URL parameters
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Get the selected service from the URL
    const selectedService = getQueryParam('service');

    // If a service is selected, pre-select it
    if (selectedService) {
        const serviceInput = document.querySelector(`input[name="service-type"][value="${selectedService}"]`);
        if (serviceInput) {
            serviceInput.checked = true; // Pre-select the service
        }
    }
});