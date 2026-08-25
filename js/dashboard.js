// ==========================================
// COLLEGEHUB - DASHBOARD
// ==========================================


// ==========================================
// INTERVIEW DATA
// ==========================================

const dashboardInterviewQuestions = [
    1, 2, 3, 4, 5,
    6, 7, 8, 9, 10,
    11, 12, 13, 14, 15,
    16, 17, 18, 19, 20
];


// ==========================================
// LOCAL STORAGE DATA
// ==========================================

const completedQuestions =
    JSON.parse(
        localStorage.getItem("completedQuestions")
    ) || [];


const bookmarkedQuestions =
    JSON.parse(
        localStorage.getItem("bookmarkedQuestions")
    ) || [];


const mockHistory =
    JSON.parse(
        localStorage.getItem("mockInterviewHistory")
    ) || [];


const tasks =
    JSON.parse(
        localStorage.getItem("collegeHubTasks")
    ) || [];


// ==========================================
// ELEMENTS
// ==========================================

const interviewProgress =
    document.getElementById(
        "dashboardInterviewProgress"
    );

const interviewText =
    document.getElementById(
        "dashboardInterviewText"
    );

const dashboardBookmarks =
    document.getElementById(
        "dashboardBookmarks"
    );

const dashboardMockInterviews =
    document.getElementById(
        "dashboardMockInterviews"
    );

const dashboardBestScore =
    document.getElementById(
        "dashboardBestScore"
    );

const dashboardTasks =
    document.getElementById(
        "dashboardTasks"
    );

const dashboardTaskText =
    document.getElementById(
        "dashboardTaskText"
    );

const dashboardProgressPercent =
    document.getElementById(
        "dashboardProgressPercent"
    );

const dashboardProgressBar =
    document.getElementById(
        "dashboardProgressBar"
    );

const dashboardProgressMessage =
    document.getElementById(
        "dashboardProgressMessage"
    );

const performanceTotal =
    document.getElementById(
        "performanceTotal"
    );

const performanceBest =
    document.getElementById(
        "performanceBest"
    );

const performanceAverage =
    document.getElementById(
        "performanceAverage"
    );


// ==========================================
// INTERVIEW PROGRESS
// ==========================================

function updateDashboardInterview() {

    const total =
        dashboardInterviewQuestions.length;

    const completed =
        completedQuestions.filter(
            id =>
                dashboardInterviewQuestions.includes(id)
        ).length;

    const percentage =
        total > 0
            ? Math.min(
                100,
                Math.round(
                    (completed / total) * 100
                )
            )
            : 0;


    if (interviewProgress) {

        interviewProgress.textContent =
            `${percentage}%`;

    }


    if (interviewText) {

        interviewText.textContent =
            `${completed} / ${total} Completed`;

    }


    if (dashboardProgressPercent) {

        dashboardProgressPercent.textContent =
            `${percentage}%`;

    }


    if (dashboardProgressBar) {

        dashboardProgressBar.style.width =
            `${percentage}%`;

    }


    if (dashboardProgressMessage) {

        if (percentage === 0) {

            dashboardProgressMessage.textContent =
                "Start practicing interview questions.";

        }

        else if (percentage < 50) {

            dashboardProgressMessage.textContent =
                "Good start! Keep practicing.";

        }

        else if (percentage < 100) {

            dashboardProgressMessage.textContent =
                "Great progress! Keep going.";

        }

        else {

            dashboardProgressMessage.textContent =
                "🎉 All interview questions completed!";

        }

    }

}


// ==========================================
// BOOKMARKS
// ==========================================

function updateDashboardBookmarks() {

    if (dashboardBookmarks) {

        dashboardBookmarks.textContent =
            bookmarkedQuestions.length;

    }

}


// ==========================================
// MOCK INTERVIEW STATISTICS
// ==========================================

function updateMockStatistics() {

    const totalInterviews =
        mockHistory.length;


    const scores =
        mockHistory.map(
            item =>
                Number(item.percentage) || 0
        );


    const bestScore =
        scores.length > 0
            ? Math.max(...scores)
            : 0;


    const averageScore =
        scores.length > 0
            ? Math.round(
                scores.reduce(
                    (total, score) =>
                        total + score,
                    0
                ) / scores.length
            )
            : 0;


    if (dashboardMockInterviews) {

        dashboardMockInterviews.textContent =
            totalInterviews;

    }


    if (dashboardBestScore) {

        dashboardBestScore.textContent =
            `${bestScore}%`;

    }


    if (performanceTotal) {

        performanceTotal.textContent =
            totalInterviews;

    }


    if (performanceBest) {

        performanceBest.textContent =
            `${bestScore}%`;

    }


    if (performanceAverage) {

        performanceAverage.textContent =
            `${averageScore}%`;

    }

}


// ==========================================
// TASK STATISTICS
// ==========================================

function updateDashboardTasks() {

    const total =
        tasks.length;


    const completed =
        tasks.filter(
            task => task.completed === true
        ).length;


    const pending =
        total - completed;


    if (dashboardTasks) {

        dashboardTasks.textContent =
            total;

    }


    if (dashboardTaskText) {

        dashboardTaskText.textContent =
            `${completed} Completed • ${pending} Pending`;

    }

}


// ==========================================
// INITIAL LOAD
// ==========================================

function loadDashboard() {

    updateDashboardInterview();

    updateDashboardBookmarks();

    updateMockStatistics();

    updateDashboardTasks();

    console.log(
        "CollegeHub Dashboard Loaded"
    );

    console.log(
        "Interview Completed:",
        completedQuestions.length
    );

    console.log(
        "Bookmarks:",
        bookmarkedQuestions.length
    );

    console.log(
        "Mock Interviews:",
        mockHistory.length
    );

    console.log(
        "Tasks:",
        tasks.length
    );

}


// ==========================================
// RUN
// ==========================================

loadDashboard();