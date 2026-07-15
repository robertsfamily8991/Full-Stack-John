/* =========================================================== FULL-STACK JOHN =========================================================== */


/* =========================================================== MOBILE MENU =========================================================== */

/* =========================================================== MOBILE MENU =========================================================== */

const menuToggle = document.querySelector(".menu-btn");
const nav = document.querySelector(".main-nav");

if (menuToggle && nav) {

    menuToggle.addEventListener("click", () => {

        nav.classList.toggle("active");
        menuToggle.classList.toggle("open");
        menuToggle.textContent = nav.classList.contains("active") ? "✕" : "☰";

    });

    document.querySelectorAll(".main-nav a").forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("active");
            menuToggle.classList.remove("open");
            menuToggle.textContent = "☰";

        });

    });

}

/* =========================================================== CAROUSEL CONTROLS =========================================================== */

function setupSlider(trackSelector, nextSelector, prevSelector) {

    const track = document.querySelector(trackSelector);
    const next = document.querySelector(nextSelector);
    const prev = document.querySelector(prevSelector);

    if (!track || !next || !prev) {
        return;
    }

    const scrollAmount = () => {

        /* Uses card width instead of viewport width. This keeps desktop and mobile movement aligned. */

        const card = track.querySelector(":scope > *");

        if (card) {

            return card.offsetWidth + 20;

        }

        return track.clientWidth * .85;

    };

    next.addEventListener("click", () => {

        track.scrollBy({

            left: scrollAmount(),

            behavior: "smooth"

        });

    });

    prev.addEventListener("click", () => {

        track.scrollBy({

            left: -scrollAmount(),

            behavior: "smooth"

        });

    });

}

setupSlider(
    ".work-track",
    ".work-next",
    ".work-prev"
);

setupSlider(
    ".testimonial-track",
    ".testimonial-next",
    ".testimonial-prev"
);

/* =========================================================== CONTACT FORM =========================================================== */

/* ===========================================================
CONTACT FORM
=========================================================== */

/* ===========================================================
CONTACT FORM
=========================================================== */

const form = document.querySelector(".contact-form");
const success = document.querySelector(".form-success");
const error = document.querySelector(".form-error");

if (form) {

    const button = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", async (event) => {

        event.preventDefault();

        if (success) {
            success.style.display = "none";
        }

        if (error) {
            error.style.display = "none";
        }

        button.disabled = true;
        button.textContent = "Sending...";

        try {

            const response = await fetch(form.action, {
                method: form.method,
                body: new FormData(form),
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.ok) {

                form.reset();

                if (success) {
                    success.style.display = "block";
                }

            } else {

                if (error) {
                    error.style.display = "block";
                }

            }

        } catch {

            if (error) {
                error.style.display = "block";
            }

        }

        button.disabled = false;
        button.textContent = "Send Message";

    });

}

/* =========================================================== SCROLL REVEAL =========================================================== */

const revealElements = document.querySelectorAll(

    ".service-section,\
.work-card,\
.experience-item,\
.testimonial-card,\
.support-card,\
.story-points div"

);

revealElements.forEach(element => {

    element.classList.add("reveal");

});

const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("active");

        }

    });

}, {

    threshold: .15

});

revealElements.forEach(element => {

    revealObserver.observe(element);

});

/* =========================================================== ACTIVE NAVIGATION =========================================================== */

const sections = document.querySelectorAll(
    "section[id]"
);

const navLinks = document.querySelectorAll(
    ".main-nav a"
);

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});
