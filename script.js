
/* =========================================
AKASH PAL - PREMIUM PORTFOLIO
JAVASCRIPT + EMAILJS INTEGRATION
========================================= */


/* 1. TYPING ANIMATION */

const typingText = document.getElementById("typing-text");

const roles = [
    "Python Developer",
    "Full Stack Developer",
    "Web Developer",
    "Problem Solver"
];

let roleIndex = 0;
let characterIndex = 0;
let isDeleting = false;

function typeEffect() {

    if (!typingText) return;

    const currentRole = roles[roleIndex];

    if (isDeleting) {
        characterIndex--;
    } else {
        characterIndex++;
    }

    typingText.textContent =
        currentRole.substring(0, characterIndex);

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && characterIndex === currentRole.length) {

        speed = 1500;
        isDeleting = true;

    } else if (isDeleting && characterIndex === 0) {

        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 400;

    }

    setTimeout(typeEffect, speed);
}

typeEffect();


/* 2. MOBILE NAVIGATION MENU */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        const isOpen = navLinks.classList.contains("active");

        menuToggle.textContent = isOpen ? "✕" : "☰";

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });

    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");
            menuToggle.textContent = "☰";
            menuToggle.setAttribute("aria-expanded", "false");

        });

    });

}


/* 3. DARK / LIGHT MODE */

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("light-theme");

        const isLight =
            document.body.classList.contains("light-theme");

        themeToggle.textContent = isLight ? "☀" : "☾";

        themeToggle.setAttribute(
            "aria-label",
            isLight ? "Switch to dark mode" : "Switch to light mode"
        );

        localStorage.setItem(
            "portfolio-theme",
            isLight ? "light" : "dark"
        );

    });

    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "light") {

        document.body.classList.add("light-theme");
        themeToggle.textContent = "☀";

    }

}


/* 4. SCROLL REVEAL ANIMATION */

const revealElements = document.querySelectorAll(
    ".section, .stat-card, .skill-card, .project-card, .education-card"
);

revealElements.forEach(element => {
    element.classList.add("reveal");
});

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
        (entries, observerInstance) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observerInstance.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {
        observer.observe(element);
    });

} else {

    revealElements.forEach(element => {
        element.classList.add("show");
    });

}


/* 5. ACTIVE NAVBAR LINK */

const sections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(".nav-links a");

function updateActiveLink() {

    let currentSection = "home";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            currentSection = section.id;
        }

    });

    navigationLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }

    });

}

window.addEventListener("scroll", updateActiveLink);

updateActiveLink();


/* 6. EMAILJS CONTACT FORM */

const contactForm = document.getElementById("contact-form");

const SERVICE_ID = "service_rreu1yp";
const TEMPLATE_ID = "template_tt00f8n";
const PUBLIC_KEY = "w7umGPDvpFhKZ1r2E";

if (contactForm) {

    contactForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const name = document.getElementById("contact-name").value.trim();
        const email = document.getElementById("contact-email").value.trim();
        const subject = document.getElementById("contact-subject").value.trim();
        const message = document.getElementById("contact-message").value.trim();

        if (!name || !email || !subject || !message) {

            alert("Please fill in all fields.");
            return;

        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            alert("Please enter a valid email address.");
            return;

        }

        if (!window.emailjs) {

            alert("Email service is not loaded. Please refresh the page.");
            return;

        }

        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        const originalButtonText = submitButton
            ? submitButton.textContent
            : "";

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Sending...";
        }

        const templateParams = {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message
        };

        try {

            await emailjs.send(
                SERVICE_ID,
                TEMPLATE_ID,
                templateParams,
                {
                    publicKey: PUBLIC_KEY
                }
            );

            alert("Message sent successfully! Thank you for contacting me.");

            contactForm.reset();

        } catch (error) {

            console.error("EmailJS Error:", error);

            alert("Message could not be sent. Please try again later.");

        } finally {

            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }

        }

    });

}


/* 7. CONSOLE MESSAGE */

console.log(
    "%c Welcome to Akash Pal's Portfolio! ",
    "background: #7c3aed; color: white; padding: 10px; border-radius: 5px;"
);
