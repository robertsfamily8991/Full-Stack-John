/* ============================================================
   FULL-STACK JOHN
   PROPERTY MEDIA PORTAL
============================================================ */


/* ============================================================
   PASSWORD
============================================================ */

const PORTAL_PASSWORD =
    "1234";


/* ============================================================
   ELEMENTS
============================================================ */

const passwordScreen =
    document.getElementById(
        "passwordScreen"
    );


const passwordForm =
    document.getElementById(
        "passwordForm"
    );


const passwordInput =
    document.getElementById(
        "passwordInput"
    );


const passwordError =
    document.getElementById(
        "passwordError"
    );


const portal =
    document.getElementById(
        "portal"
    );


/* ============================================================
   PASSWORD LOGIN
============================================================ */

passwordForm.addEventListener(
    "submit",
    function (
        event
    ) {

        event.preventDefault();


        const enteredPassword =
            passwordInput.value;


        if (
            enteredPassword ===
            PORTAL_PASSWORD
        ) {

            passwordScreen.style.display =
                "none";


            portal.classList.add(
                "visible"
            );


        } else {

            passwordError.classList.add(
                "visible"
            );


            passwordInput.value =
                "";


            passwordInput.focus();

        }

    }
);