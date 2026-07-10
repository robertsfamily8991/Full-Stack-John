/*
========================================
FULL-STACK JOHN V4
SCRIPT.JS
========================================
*/


/* =========================
MOBILE MENU
========================= */


const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");


if (menuButton && navigation) {


    menuButton.addEventListener("click", () => {


        navigation.classList.toggle("active");


    });


}





/* =========================
CLOSE MOBILE MENU
========================= */


const navLinks = document.querySelectorAll(".main-nav a");


navLinks.forEach(link => {


    link.addEventListener("click", () => {


        if (navigation) {

            navigation.classList.remove("active");

        }


    });


});









/* =========================
PORTFOLIO GALLERIES
========================= */


const galleries = {


    selkirk: [

        "images/selkirk-1.jpg",
        "images/selkirk-2.jpg",
        "images/selkirk-3.jpg",
        "images/selkirk-4.jpg"

    ],



    business: [

        "images/business-1.jpg",
        "images/business-2.jpg",
        "images/business-3.jpg"

    ],



    ecommerce: [

        "images/ecommerce-1.jpg",
        "images/ecommerce-2.jpg",
        "images/ecommerce-3.jpg"

    ]

};






const modal =
document.querySelector(".gallery-modal");


const galleryImage =
document.querySelector(".gallery-image");


const closeButton =
document.querySelector(".gallery-close");


const nextButton =
document.querySelector(".gallery-next");


const previousButton =
document.querySelector(".gallery-prev");



let currentGallery = [];

let currentIndex = 0;








/* =========================
OPEN GALLERY
========================= */


const projectButtons =
document.querySelectorAll(".portfolio-button");



projectButtons.forEach(button => {



    button.addEventListener("click", () => {



        const gallery =
        button.dataset.gallery;



        currentGallery =
        galleries[gallery];



        currentIndex = 0;



        showGallery();



    });



});







function showGallery(){


    if(!modal || !galleryImage) return;



    galleryImage.src =
    currentGallery[currentIndex];



    modal.classList.add("active");



}









/* =========================
CLOSE GALLERY
========================= */


function closeGallery(){


    if(modal){

        modal.classList.remove("active");

    }


}




if(closeButton){


    closeButton.addEventListener(
        "click",
        closeGallery
    );


}







/* =========================
NEXT IMAGE
========================= */


if(nextButton){


    nextButton.addEventListener(
        "click",
        () => {


        currentIndex++;


        if(currentIndex >= currentGallery.length){


            currentIndex = 0;


        }



        galleryImage.src =
        currentGallery[currentIndex];



    });


}








/* =========================
PREVIOUS IMAGE
========================= */


if(previousButton){


    previousButton.addEventListener(
        "click",
        () => {


        currentIndex--;


        if(currentIndex < 0){


            currentIndex =
            currentGallery.length - 1;


        }



        galleryImage.src =
        currentGallery[currentIndex];



    });


}









/* =========================
KEYBOARD CONTROLS
========================= */


document.addEventListener(
"keydown",
(event) => {



    if(!modal ||
       !modal.classList.contains("active")){

        return;

    }




    if(event.key === "Escape"){


        closeGallery();


    }





    if(event.key === "ArrowRight"){


        nextButton.click();


    }





    if(event.key === "ArrowLeft"){


        previousButton.click();


    }



});









/* =========================
CLICK OUTSIDE CLOSE
========================= */


if(modal){


    modal.addEventListener(
    "click",
    (event)=>{


        if(event.target === modal){


            closeGallery();


        }


    });


}









/* =========================
SCROLL ANIMATIONS
========================= */


const animatedElements =
document.querySelectorAll(
`
.info-card,
.service-card,
.portfolio-card,
.plan-card,
.process-card,
.testimonial-card
`
);



const observer =
new IntersectionObserver(
(entries)=>{


entries.forEach(entry=>{


    if(entry.isIntersecting){


        entry.target.classList.add(
            "visible"
        );


    }


});


},
{

threshold:.15

});





animatedElements.forEach(element=>{


    element.classList.add(
        "fade-up"
    );


    observer.observe(element);


});









/* =========================
FORMSPREE FORM UX
========================= */


const contactForm =
document.querySelector(".contact-form");



if(contactForm){



    const submitButton =
    contactForm.querySelector("button");



    contactForm.addEventListener(
    "submit",
    ()=>{


        if(submitButton){


            submitButton.innerHTML =
            "Sending...";


            submitButton.disabled =
            true;


        }


    });


}








/* =========================
FOOTER YEAR
========================= */


const footerText =
document.querySelector(
".footer-bottom p"
);



if(footerText){


    footerText.textContent =
    `© ${new Date().getFullYear()} Full-Stack John. All Rights Reserved.`;


}