/* =========================================================
   PRIVATE REAL ESTATE MEDIA PRICING
   PASSWORD PROTECTION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const correctPassword = "roberts";

    const passwordScreen = document.getElementById("password-screen");
    const pricingContent = document.getElementById("pricing-content");
    const passwordForm = document.getElementById("password-form");
    const passwordInput = document.getElementById("password");
    const passwordError = document.getElementById("password-error");

    /* --------------------------------------------------------- INITIAL STATE --------------------------------------------------------- */

    pricingContent.style.display = "none";

    /* --------------------------------------------------------- UNLOCK PRICING --------------------------------------------------------- */

    function unlockPricing() {

        passwordScreen.style.display = "none";
        pricingContent.style.display = "block";

        sessionStorage.setItem(
            "pricingAccess",
            "granted"
        );

    }

    /* --------------------------------------------------------- CHECK EXISTING SESSION --------------------------------------------------------- */

    if (
        sessionStorage.getItem("pricingAccess") === "granted"
    ) {

        unlockPricing();

    }

    /* --------------------------------------------------------- PASSWORD FORM --------------------------------------------------------- */

    passwordForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const enteredPassword =
                passwordInput.value.trim();

            if (
                enteredPassword === correctPassword
            ) {

                unlockPricing();

            } else {

                passwordError.style.display = "block";
                passwordInput.value = "";
                passwordInput.focus();

            }

        }
    );

    /* --------------------------------------------------------- HIDE ERROR WHEN USER TYPES AGAIN --------------------------------------------------------- */

    passwordInput.addEventListener(
        "input",
        function () {

            passwordError.style.display = "none";

        }
    );

    /* --------------------------------------------------------- CARD HOVER INTERACTION --------------------------------------------------------- */

    const pricingCards =
        document.querySelectorAll(".pricing-card");

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

});