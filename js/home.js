// ==========================================
// COLLEGEHUB - HOME PAGE
// ==========================================


// ==========================================
// LOCAL STORAGE DATA
// ==========================================

const homeCompletedQuestions =
    JSON.parse(
        localStorage.getItem("completedQuestions")
    ) || [];


const homeBookmarkedQuestions =
    JSON.parse(
        localStorage.getItem("bookmarkedQuestions")
    ) || [];


const homeMockHistory =
    JSON.parse(
        localStorage.getItem("mockInterviewHistory")
    ) || [];


// ==========================================
// TOTAL INTERVIEW QUESTIONS
// ==========================================

const totalInterviewQuestions = 20;


// ==========================================
// ELEMENTS
// ==========================================

const homeCompleted =
    document.getElementById(
        "homeCompleted"
    );


const homeBookmarks =
    document.getElementById(
        "homeBookmarks"
    );


const homeMock =
    document.getElementById(
        "homeMock"
    );


const homeProgressText =
    document.getElementById(
        "homeProgressText"
    );


const homeProgressBar =
    document.getElementById(
        "homeProgressBar"
    );


const homeProgressPercent =
    document.getElementById(
        "homeProgressPercent"
    );


const homeSearch =
    document.getElementById(
        "homeSearch"
    );


const homeSearchBtn =
    document.getElementById(
        "homeSearchBtn"
    );


// ==========================================
// UPDATE HOME STATISTICS
// ==========================================

function updateHomeStats() {

    const completed =
        Math.min(
            homeCompletedQuestions.length,
            totalInterviewQuestions
        );


    const bookmarks =
        homeBookmarkedQuestions.length;


    const mockTests =
        homeMockHistory.length;


    // Completed

    if (homeCompleted) {

        homeCompleted.textContent =
            completed;

    }


    // Bookmarks

    if (homeBookmarks) {

        homeBookmarks.textContent =
            bookmarks;

    }


    // Mock Tests

    if (homeMock) {

        homeMock.textContent =
            mockTests;

    }

}


// ==========================================
// UPDATE INTERVIEW PROGRESS
// ==========================================

function updateHomeProgress() {

    const completed =
        Math.min(
            homeCompletedQuestions.length,
            totalInterviewQuestions
        );


    const percentage =
        totalInterviewQuestions > 0

        ? Math.round(
            (
                completed /
                totalInterviewQuestions
            ) * 100
        )

        : 0;


    // Progress text

    if (homeProgressText) {

        if (percentage === 0) {

            homeProgressText.textContent =
                "Start practicing interview questions.";

        }

        else if (percentage < 50) {

            homeProgressText.textContent =
                `${completed} questions completed. Keep practicing!`;

        }

        else if (percentage < 100) {

            homeProgressText.textContent =
                `${completed} questions completed. Great progress!`;

        }

        else {

            homeProgressText.textContent =
                "🎉 All interview questions completed!";

        }

    }


    // Progress bar

    if (homeProgressBar) {

        homeProgressBar.style.width =
            `${percentage}%`;

    }


    // Percentage

    if (homeProgressPercent) {

        homeProgressPercent.textContent =
            `${percentage}%`;

    }

}


// ==========================================
// HOME SEARCH
// ==========================================

function searchHomeQuestions() {

    if (!homeSearch) {
        return;
    }


    const searchText =
        homeSearch.value.trim();


    if (!searchText) {

        alert(
            "Please enter a question or topic to search."
        );

        homeSearch.focus();

        return;

    }


    const encodedSearch =
        encodeURIComponent(
            searchText
        );


    window.location.href =
        `pages/interview.html?search=${encodedSearch}`;

}


// ==========================================
// SEARCH BUTTON
// ==========================================

if (homeSearchBtn) {

    homeSearchBtn.addEventListener(
        "click",
        searchHomeQuestions
    );

}


// ==========================================
// ENTER KEY SEARCH
// ==========================================

if (homeSearch) {

    homeSearch.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key === "Enter"
            ) {

                event.preventDefault();

                searchHomeQuestions();

            }

        }
    );

}


// ==========================================
// INITIAL LOAD
// ==========================================

updateHomeStats();

updateHomeProgress();


// ==========================================
// DEBUG
// ==========================================

console.log(
    "CollegeHub Home Loaded"
);

console.log(
    "Completed Questions:",
    homeCompletedQuestions.length
);

console.log(
    "Bookmarked Questions:",
    homeBookmarkedQuestions.length
);

console.log(
    "Mock Interviews:",
    homeMockHistory.length
);