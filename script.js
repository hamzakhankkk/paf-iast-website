// Navbar scroll effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Reveal on scroll
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;

    revealElements.forEach(el => {
        const elTop = el.getBoundingClientRect().top;

        if (elTop < triggerBottom) {
            el.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial check

// Smooth scrolling for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form Handling
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', async (e) => {
    // Basic validation is handled by 'required' and 'email' types
    // We can add custom validation if needed

    e.preventDefault();
    formStatus.innerHTML = "<p style='color: var(--accent-color);'>Sending message...</p>";

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            formStatus.innerHTML = "<p style='color: #4caf50;'>Message sent successfully! We'll get back to you soon.</p>";
            contactForm.reset();
        } else {
            const result = await response.json();
            if (Object.hasOwn(result, 'errors')) {
                formStatus.innerHTML = result.errors.map(error => error.message).join(", ");
            } else {
                formStatus.innerHTML = "<p style='color: #f44336;'>Oops! There was a problem submitting your form.</p>";
            }
        }
    } catch (error) {
        formStatus.innerHTML = "<p style='color: #f44336;'>Oops! There was a problem submitting your form. Please try again later.</p>";
    }
});
