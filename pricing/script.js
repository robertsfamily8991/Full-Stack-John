/* ========================================================= PRIVATE PRICING STRUCTURE ========================================================= */


/* =========================================================
   PASSWORD PROTECTION
========================================================= */

const correctPassword = "roberts";


const passwordScreen = document.getElementById(
    "password-screen"
);


const pricingContent = document.getElementById(
    "pricing-content"
);


const passwordForm = document.getElementById(
    "password-form"
);


const passwordInput = document.getElementById(
    "password"
);


const passwordError = document.getElementById(
    "password-error"
);


function unlockPricing() {

    passwordScreen.style.display = "none";
    pricingContent.style.display = "block";
    sessionStorage.setItem(
        "pricingAccess",
        "granted"
    );

}


if (
    sessionStorage.getItem("pricingAccess") === "granted"
) {

    unlockPricing();

}


passwordForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        if (
            passwordInput.value === correctPassword
        ) {

            unlockPricing();

        } else {

            passwordError.style.display = "block";
            passwordInput.value = "";
            passwordInput.focus();

        }

    }
);

/* =========================================================
   CARD HOVER INTERACTION
========================================================= */

const pricingCards = document.querySelectorAll(
    ".pricing-card"
);

pricingCards.forEach(
    function (card) {

        card.addEventListener(
            "mouseenter",
            function () {

                card.style.transform =
                    "translateY(-5px)";

            }
        );

        card.addEventListener(
            "mouseleave",
            function () {

                card.style.transform =
                    "translateY(0)";

            }
        );

    }
);