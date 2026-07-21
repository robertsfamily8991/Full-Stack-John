/* ============================================================
   FULL-STACK JOHN
   PROPERTY MEDIA PORTAL
============================================================ */


/* ============================================================
   CONFIGURATION
============================================================ */


/*
    CHANGE THESE THREE VALUES
*/

// const GITHUB_OWNER = "YOUR-GITHUB-USERNAME";
// const GITHUB_REPOSITORY = "YOUR-REPOSITORY-NAME";
// const GITHUB_BRANCH = "main";

const GITHUB_OWNER = "robertsfamily8991.github.io";
const GITHUB_REPOSITORY = "210-s-3rd-ave";
const GITHUB_BRANCH = "main";


/*
    CHANGE THIS PASSWORD FOR EACH PROPERTY
*/

const PORTAL_PASSWORD = "1234";


/*
    MEDIA FOLDERS
*/

const PHOTO_FOLDER = "photos";

const VIDEO_FOLDER = "videos";


/* ============================================================
   ELEMENTS
============================================================ */

const passwordScreen =
    document.getElementById("passwordScreen");

const passwordForm =
    document.getElementById("passwordForm");

const passwordInput =
    document.getElementById("passwordInput");

const passwordError =
    document.getElementById("passwordError");

const portal =
    document.getElementById("portal");

const propertyAddress =
    document.getElementById("propertyAddress");

const propertyLocation =
    document.getElementById("propertyLocation");

const propertyDescription =
    document.getElementById("propertyDescription");

const photoGrid =
    document.getElementById("photoGrid");

const videoGrid =
    document.getElementById("videoGrid");

const photoCount =
    document.getElementById("photoCount");

const videoCount =
    document.getElementById("videoCount");

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxClose =
    document.getElementById("lightboxClose");

const lightboxPrev =
    document.getElementById("lightboxPrev");

const lightboxNext =
    document.getElementById("lightboxNext");


/* ============================================================
   STATE
============================================================ */

let photos = [];

let currentPhotoIndex = 0;


/* ============================================================
   SUPPORTED FILE TYPES
============================================================ */

const imageExtensions = [

    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
    ".gif"

];


const videoExtensions = [

    ".mp4",
    ".webm",
    ".mov"

];


/* ============================================================
   PASSWORD AUTHENTICATION
============================================================ */

passwordForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        const enteredPassword =
            passwordInput.value;

        if (
            enteredPassword === PORTAL_PASSWORD
        ) {

            passwordScreen.style.display =
                "none";

            portal.classList.add(
                "visible"
            );

            loadPortal();

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


/* ============================================================
   LOAD PORTAL
============================================================ */

async function loadPortal() {

    try {

        await loadPropertyInformation();

        await loadPhotos();

        await loadVideos();

    } catch (error) {

        console.error(
            "Portal loading error:",
            error
        );

    }

}


/* ============================================================
   LOAD PROPERTY INFORMATION
============================================================ */

async function loadPropertyInformation() {

    const response =
        await fetch(
            "media.json"
        );

    if (
        !response.ok
    ) {

        throw new Error(
            "Could not load media.json"
        );

    }

    const data =
        await response.json();


    propertyAddress.textContent =
        data.address ||
        "Property Address";


    propertyLocation.textContent =
        `${data.city || ""}, ${data.state || ""}`;


    propertyDescription.textContent =
        data.description ||
        "Professional property photography and video delivered by Full-Stack John.";


    document.title =
        `${data.address || "Property"} | Full-Stack John`;

}


/* ============================================================
   GITHUB API URL
============================================================ */

function getGitHubFolderURL(
    folder
) {

    return `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPOSITORY}/contents/${folder}?ref=${GITHUB_BRANCH}`;

}


/* ============================================================
   LOAD PHOTOS
============================================================ */

async function loadPhotos() {

    const response =
        await fetch(
            getGitHubFolderURL(
                PHOTO_FOLDER
            )
        );


    if (
        !response.ok
    ) {

        throw new Error(
            "Could not load photos folder"
        );

    }


    const files =
        await response.json();


    photos =
        files
            .filter(
                file =>
                    file.type === "file" &&
                    isImageFile(
                        file.name
                    )
            )
            .sort(
                sortFiles
            );


    photoGrid.innerHTML =
        "";


    photoCount.textContent =
        `${photos.length} ${
            photos.length === 1
                ? "Photo"
                : "Photos"
        }`;


    if (
        photos.length === 0
    ) {

        photoGrid.innerHTML =
            `<div class="loading-message">
                No photos found.
            </div>`;

        return;

    }


    photos.forEach(
        function (
            photo,
            index
        ) {

            const photoCard =
                document.createElement(
                    "div"
                );


            photoCard.className =
                "photo-card";


            const image =
                document.createElement(
                    "img"
                );


            image.src =
                photo.download_url;


            image.alt =
                cleanFileName(
                    photo.name
                );


            image.loading =
                "lazy";


            photoCard.appendChild(
                image
            );


            photoCard.addEventListener(
                "click",
                function () {

                    openLightbox(
                        index
                    );

                }
            );


            photoGrid.appendChild(
                photoCard
            );

        }
    );

}


/* ============================================================
   LOAD VIDEOS
============================================================ */

async function loadVideos() {

    const response =
        await fetch(
            getGitHubFolderURL(
                VIDEO_FOLDER
            )
        );


    if (
        !response.ok
    ) {

        throw new Error(
            "Could not load videos folder"
        );

    }


    const files =
        await response.json();


    const videos =
        files
            .filter(
                file =>
                    file.type === "file" &&
                    isVideoFile(
                        file.name
                    )
            )
            .sort(
                sortFiles
            );


    videoGrid.innerHTML =
        "";


    videoCount.textContent =
        `${videos.length} ${
            videos.length === 1
                ? "Video"
                : "Videos"
        }`;


    if (
        videos.length === 0
    ) {

        videoGrid.innerHTML =
            `<div class="loading-message">
                No videos found.
            </div>`;

        return;

    }


    videos.forEach(
        function (
            video
        ) {

            const videoCard =
                document.createElement(
                    "div"
                );


            videoCard.className =
                "video-card";


            const videoElement =
                document.createElement(
                    "video"
                );


            videoElement.src =
                video.download_url;


            videoElement.controls =
                true;


            videoElement.preload =
                "metadata";


            const title =
                document.createElement(
                    "div"
                );


            title.className =
                "video-title";


            title.textContent =
                cleanFileName(
                    video.name
                );


            videoCard.appendChild(
                videoElement
            );


            videoCard.appendChild(
                title
            );


            videoGrid.appendChild(
                videoCard
            );

        }
    );

}


/* ============================================================
   FILE FILTERS
============================================================ */

function isImageFile(
    fileName
) {

    const extension =
        getExtension(
            fileName
        );


    return imageExtensions.includes(
        extension
    );

}


function isVideoFile(
    fileName
) {

    const extension =
        getExtension(
            fileName
        );


    return videoExtensions.includes(
        extension
    );

}


function getExtension(
    fileName
) {

    return fileName
        .toLowerCase()
        .substring(
            fileName.lastIndexOf(
                "."
            )
        );

}


/* ============================================================
   FILE SORTING
============================================================ */

function sortFiles(
    firstFile,
    secondFile
) {

    return firstFile.name.localeCompare(
        secondFile.name,
        undefined,
        {
            numeric: true,
            sensitivity: "base"
        }
    );

}


/* ============================================================
   CLEAN FILE NAMES
============================================================ */

function cleanFileName(
    fileName
) {

    return fileName

        .replace(
            /\.[^/.]+$/,
            ""
        )

        .replace(
            /[-_]/g,
            " "
        )

        .replace(
            /\b\w/g,
            letter =>
                letter.toUpperCase()
        );

}


/* ============================================================
   LIGHTBOX
============================================================ */

function openLightbox(
    index
) {

    if (
        !photos.length
    ) {

        return;

    }


    currentPhotoIndex =
        index;


    updateLightbox();


    lightbox.classList.add(
        "visible"
    );


    document.body.style.overflow =
        "hidden";

}


function updateLightbox() {

    const photo =
        photos[
            currentPhotoIndex
        ];


    lightboxImage.src =
        photo.download_url;


    lightboxImage.alt =
        cleanFileName(
            photo.name
        );

}


function closeLightbox() {

    lightbox.classList.remove(
        "visible"
    );


    document.body.style.overflow =
        "";

}


function showPreviousPhoto() {

    currentPhotoIndex--;


    if (
        currentPhotoIndex < 0
    ) {

        currentPhotoIndex =
            photos.length - 1;

    }


    updateLightbox();

}


function showNextPhoto() {

    currentPhotoIndex++;


    if (
        currentPhotoIndex >=
        photos.length
    ) {

        currentPhotoIndex =
            0;

    }


    updateLightbox();

}


/* ============================================================
   LIGHTBOX EVENTS
============================================================ */

lightboxClose.addEventListener(
    "click",
    closeLightbox
);


lightboxPrev.addEventListener(
    "click",
    showPreviousPhoto
);


lightboxNext.addEventListener(
    "click",
    showNextPhoto
);


lightbox.addEventListener(
    "click",
    function (
        event
    ) {

        if (
            event.target === lightbox
        ) {

            closeLightbox();

        }

    }
);


document.addEventListener(
    "keydown",
    function (
        event
    ) {

        if (
            !lightbox.classList.contains(
                "visible"
            )
        ) {

            return;

        }


        if (
            event.key === "Escape"
        ) {

            closeLightbox();

        }


        if (
            event.key === "ArrowLeft"
        ) {

            showPreviousPhoto();

        }


        if (
            event.key === "ArrowRight"
        ) {

            showNextPhoto();

        }

    }
);