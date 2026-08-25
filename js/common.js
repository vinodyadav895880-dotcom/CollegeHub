// ==========================================
// COLLEGEHUB - COMMON JAVASCRIPT
// ==========================================


// ==========================================
// THEME
// ==========================================

const themeBtn =
    document.getElementById("themeBtn");


// ==========================================
// LOAD SAVED THEME
// ==========================================

const savedTheme =
    localStorage.getItem("collegeHubTheme");


if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

}


updateThemeButton();


// ==========================================
// UPDATE THEME BUTTON
// ==========================================

function updateThemeButton() {

    if (!themeBtn) {
        return;
    }


    if (
        document.body.classList.contains(
            "dark-mode"
        )
    ) {

        themeBtn.textContent = "☀️";

        themeBtn.title =
            "Switch to Light Mode";

    }

    else {

        themeBtn.textContent = "🌙";

        themeBtn.title =
            "Switch to Dark Mode";

    }

}


// ==========================================
// TOGGLE THEME
// ==========================================

if (themeBtn) {

    themeBtn.addEventListener(
        "click",
        function() {

            document.body.classList.toggle(
                "dark-mode"
            );


            const isDark =
                document.body.classList.contains(
                    "dark-mode"
                );


            localStorage.setItem(
                "collegeHubTheme",
                isDark
                    ? "dark"
                    : "light"
            );


            updateThemeButton();

        }
    );

}


// ==========================================
// ACTIVE NAVIGATION
// ==========================================

const currentPage =
    window.location.pathname
        .split("/")
        .pop();


const navLinks =
    document.querySelectorAll(
        ".topbar nav a"
    );


navLinks.forEach(link => {

    const linkPage =
        link.getAttribute("href")
            ?.split("/")
            .pop();


    if (
        linkPage === currentPage
    ) {

        link.classList.add("active");

    }

});


// ==========================================
// COLLEGEHUB COMMON LOADED
// ==========================================

console.log(
    "CollegeHub Common JS Loaded"
);