/* ============================================================ IDAHO YARD YETI V3 ============================================================ */

/* ============================================================ MOBILE NAVIGATION ============================================================ */

const menuToggle =
document.getElementById(
"menuToggle"
);

const mainNav =
document.getElementById(
"mainNav"
);

if (
menuToggle &&
mainNav
) {

menuToggle.addEventListener(
    "click",
    () => {

        const isOpen =
            mainNav.classList.toggle(
                "active"
            );

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

    }
);

mainNav
    .querySelectorAll(
        "a"
    )
    .forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

                    mainNav.classList.remove(
                        "active"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        }
    );

}

/* ============================================================ FORMSPREE FORM ============================================================ */

const quoteForm =
document.getElementById(
"quoteForm"
);

const formStatus =
document.getElementById(
"formStatus"
);

if (
quoteForm &&
formStatus
) {

quoteForm.addEventListener(
    "submit",
    async event => {

        event.preventDefault();

        const submitButton =
            quoteForm.querySelector(
                "button[type='submit']"
            );

        const originalText =
            submitButton.innerHTML;

        submitButton.disabled =
            true;

        submitButton.innerHTML =
            "Sending...";

        formStatus.textContent =
            "";

        const formData =
            new FormData(
                quoteForm
            );

        try {

            const response =
                await fetch(
                    quoteForm.action,
                    {

                        method: "POST",

                        body: formData,

                        headers: {

                            Accept:
                                "application/json"

                        }

                    }
                );

            if (
                response.ok
            ) {

                quoteForm.reset();

                formStatus.textContent =
                    "Thanks! Your quote request has been sent. We'll be in touch soon.";

                submitButton.innerHTML =
                    "Request Sent ✓";

            } else {

                throw new Error(
                    "Form submission failed."
                );

            }

        } catch (
            error
        ) {

            formStatus.textContent =
                "Something went wrong. Please try again or contact us directly.";

            submitButton.innerHTML =
                originalText;

            submitButton.disabled =
                false;

        }

    }
);

}

/* ============================================================ CLOSE MOBILE MENU WHEN CLICKING OUTSIDE ============================================================ */

document.addEventListener(
"click",
event => {

    if (
        !mainNav ||
        !menuToggle
    ) {
        return;
    }

    const clickedInsideNav =
        mainNav.contains(
            event.target
        );

    const clickedMenuButton =
        menuToggle.contains(
            event.target
        );

    if (
        !clickedInsideNav &&
        !clickedMenuButton
    ) {

        mainNav.classList.remove(
            "active"
        );

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }

}

);
