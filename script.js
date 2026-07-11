/*
==========================================
FULL-STACK JOHN V7
SCRIPT.JS

Features:
- Mobile Navigation
- Project Gallery Slider
- Scroll Animations
- Form UX
- Footer Year
==========================================
*/


/* ======================================
   MOBILE NAVIGATION
====================================== */

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");


if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {

        mainNav.classList.toggle("active");

        menuToggle.classList.toggle("open");

    });

}



document.querySelectorAll(".main-nav a")
    .forEach(link => {

        link.addEventListener("click", () => {

            if (mainNav) {

                mainNav.classList.remove("active");

            }

        });

    });






/* ======================================
   PROJECT GALLERY
====================================== */


const galleries = {

    selkirk: [

        "images/portfolio/selkirk-1.webp",
        "images/portfolio/selkirk-2.webp",
        "images/portfolio/selkirk-3.webp",
        "images/portfolio/selkirk-4.webp"

    ],


    business: [

        "images/portfolio/business-1.webp",
        "images/portfolio/business-2.webp",
        "images/portfolio/business-3.webp"

    ],


    ecommerce: [

        "images/portfolio/ecommerce-1.webp",
        "images/portfolio/ecommerce-2.webp",
        "images/portfolio/ecommerce-3.webp"

    ]

};





const galleryModal = document.querySelector(".gallery-modal");
const galleryImage = document.querySelector(".gallery-image");

const galleryClose = document.querySelector(".gallery-close");
const galleryNext = document.querySelector(".gallery-next");
const galleryPrev = document.querySelector(".gallery-prev");


let currentGallery = [];
let currentIndex = 0;






/* Open Gallery */


document.querySelectorAll(".portfolio-button")
    .forEach(button => {

        button.addEventListener("click", () => {


            const galleryName =
                button.dataset.gallery;


            currentGallery =
                galleries[galleryName];


            currentIndex = 0;


            updateGallery();


            galleryModal.classList.add("active");


            document.body.style.overflow = "hidden";


        });

    });






function updateGallery() {


    if (
        galleryImage &&
        currentGallery.length
    ) {

        galleryImage.src =
            currentGallery[currentIndex];

    }


}







/* Next Image */


if (galleryNext) {

    galleryNext.addEventListener("click", () => {


        currentIndex++;


        if (currentIndex >= currentGallery.length) {

            currentIndex = 0;

        }


        updateGallery();


    });

}






/* Previous Image */


if (galleryPrev) {

    galleryPrev.addEventListener("click", () => {


        currentIndex--;


        if (currentIndex < 0) {

            currentIndex =
                currentGallery.length - 1;

        }


        updateGallery();


    });

}






/* Close Gallery */


function closeGallery() {


    if (galleryModal) {


        galleryModal.classList.remove("active");


        document.body.style.overflow = "auto";


    }


}




if (galleryClose) {

    galleryClose.addEventListener(
        "click",
        closeGallery
    );

}





if (galleryModal) {

    galleryModal.addEventListener(
        "click",
        event => {


            if (event.target === galleryModal) {

                closeGallery();

            }


        }
    );

}


/* ======================================
   KEYBOARD GALLERY CONTROLS
====================================== */


document.addEventListener("keydown", event => {


    if (
        !galleryModal ||
        !galleryModal.classList.contains("active")
    ) {

        return;

    }



    if (event.key === "Escape") {

        closeGallery();

    }



    if (event.key === "ArrowRight" && galleryNext) {

        galleryNext.click();

    }



    if (event.key === "ArrowLeft" && galleryPrev) {

        galleryPrev.click();

    }


});








/* ======================================
   SCROLL REVEAL ANIMATIONS
====================================== */


const revealElements =
    document.querySelectorAll(
        `
.outcome-card,
.service-card,
.portfolio-card,
.testimonial-card,
.about-card,
.process-card,
.plan-card
`
    );



revealElements.forEach(element => {


    element.style.opacity = "0";

    element.style.transform =
        "translateY(25px)";

    element.style.transition =
        "opacity .6s ease, transform .6s ease";


});






const revealObserver =
    new IntersectionObserver(entries => {


        entries.forEach(entry => {


            if (entry.isIntersecting) {


                entry.target.style.opacity = "1";


                entry.target.style.transform =
                    "translateY(0)";


                revealObserver.unobserve(
                    entry.target
                );


            }


        });


    },
        {
            threshold: .15
        });






revealElements.forEach(element => {

    revealObserver.observe(element);

});








/* ======================================
   FORMSPREE AJAX SUBMISSION
   Keeps visitors on this page
====================================== */

const contactForm =
    document.querySelector(".contact-form");


if (contactForm) {

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();


        const button =
            contactForm.querySelector(".submit-btn");


        const successMessage =
            contactForm.querySelector(".form-success");


        const formData =
            new FormData(contactForm);


        button.textContent =
            "Sending...";


        button.disabled = true;



        try {


            const response =
                await fetch(
                    contactForm.action,
                    {
                        method: "POST",
                        body: formData,
                        headers: {
                            "Accept": "application/json"
                        }
                    }
                );



            if (response.ok) {


                contactForm.reset();


                button.style.display = "none";


                successMessage.style.display = "block";


            }
            else {


                button.textContent =
                    "Try Again";


                button.disabled = false;


            }



        } catch (error) {


            button.textContent =
                "Try Again";


            button.disabled = false;


        }


    });

}








/* ======================================
   FOOTER YEAR
====================================== */


const footerYear =
    document.querySelector(".footer-bottom p");




if (footerYear) {


    footerYear.textContent =
        `© ${new Date().getFullYear()} Full-Stack John. All Rights Reserved.`;


}








/* ======================================
   SMOOTH SCROLL OFFSET
====================================== */


document.querySelectorAll('a[href^="#"]')
    .forEach(anchor => {


        anchor.addEventListener("click", function (event) {


            const target =
                document.querySelector(
                    this.getAttribute("href")
                );



            if (target) {


                event.preventDefault();



                const headerOffset = 90;



                const position =
                    target.offsetTop - headerOffset;



                window.scrollTo({

                    top: position,

                    behavior: "smooth"

                });


            }


        });


    });
