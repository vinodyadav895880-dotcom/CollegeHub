// ==========================================
// COLLEGEHUB - INTERVIEW PREPARATION
// ==========================================


// ==========================================
// INTERVIEW QUESTIONS
// ==========================================

const questions = [

    // =========================
    // HTML
    // =========================

    {
        id: 1,
        category: "HTML",
        question: "What is semantic HTML?",
        difficulty: "Easy",
        answer: "Semantic HTML uses meaningful tags such as header, nav, main, section, article and footer to clearly describe the purpose of content."
    },

    {
        id: 2,
        category: "HTML",
        question: "What is the difference between div and section?",
        difficulty: "Easy",
        answer: "The div element is a generic container without semantic meaning, while section represents a meaningful section of related content."
    },

    {
        id: 3,
        category: "HTML",
        question: "What is the purpose of the alt attribute?",
        difficulty: "Easy",
        answer: "The alt attribute provides alternative text for an image. It helps screen readers and is displayed when the image cannot be loaded."
    },

    {
        id: 4,
        category: "HTML",
        question: "What is the difference between id and class?",
        difficulty: "Easy",
        answer: "An id uniquely identifies an element, while a class can be used on multiple elements."
    },


    // =========================
    // CSS
    // =========================

    {
        id: 5,
        category: "CSS",
        question: "What is Flexbox?",
        difficulty: "Easy",
        answer: "Flexbox is a CSS layout system used to arrange elements in rows or columns and control alignment, spacing and direction."
    },

    {
        id: 6,
        category: "CSS",
        question: "What is CSS Grid?",
        difficulty: "Medium",
        answer: "CSS Grid is a two-dimensional layout system that allows developers to create layouts using rows and columns."
    },

    {
        id: 7,
        category: "CSS",
        question: "What is the difference between margin and padding?",
        difficulty: "Easy",
        answer: "Margin is the space outside an element's border, while padding is the space between the content and the element's border."
    },

    {
        id: 8,
        category: "CSS",
        question: "What is responsive design?",
        difficulty: "Medium",
        answer: "Responsive design makes a website adapt to different screen sizes such as mobile phones, tablets and desktop computers."
    },


    // =========================
    // JAVASCRIPT
    // =========================

    {
        id: 9,
        category: "JavaScript",
        question: "What is the DOM?",
        difficulty: "Easy",
        answer: "DOM stands for Document Object Model. It represents an HTML document as a tree of objects that JavaScript can access and modify."
    },

    {
        id: 10,
        category: "JavaScript",
        question: "What is the difference between let, const and var?",
        difficulty: "Medium",
        answer: "var is function-scoped, while let and const are block-scoped. let allows reassignment whereas const does not."
    },

    {
        id: 11,
        category: "JavaScript",
        question: "What is the difference between == and ===?",
        difficulty: "Easy",
        answer: "== compares values after type conversion, while === compares both value and data type without type conversion."
    },

    {
        id: 12,
        category: "JavaScript",
        question: "What is a Promise?",
        difficulty: "Medium",
        answer: "A Promise represents the eventual result of an asynchronous operation. It can be pending, fulfilled or rejected."
    },

    {
        id: 13,
        category: "JavaScript",
        question: "What is a closure?",
        difficulty: "Hard",
        answer: "A closure occurs when a function remembers and can access variables from its outer scope even after the outer function has finished executing."
    },

    {
        id: 14,
        category: "JavaScript",
        question: "What is hoisting?",
        difficulty: "Medium",
        answer: "Hoisting is JavaScript's behavior where declarations are processed before code execution."
    },

    {
        id: 15,
        category: "JavaScript",
        question: "What is an arrow function?",
        difficulty: "Easy",
        answer: "An arrow function is a shorter way to write a function using the => syntax."
    },

    {
        id: 16,
        category: "JavaScript",
        question: "What is localStorage?",
        difficulty: "Easy",
        answer: "localStorage allows websites to store key-value data in the browser that remains available even after the browser is closed."
    },

    {
        id: 17,
        category: "JavaScript",
        question: "What is event delegation?",
        difficulty: "Hard",
        answer: "Event delegation is a technique where an event listener is attached to a parent element to handle events from child elements."
    },

    {
        id: 18,
        category: "JavaScript",
        question: "What is asynchronous JavaScript?",
        difficulty: "Medium",
        answer: "Asynchronous JavaScript allows tasks to run without blocking other code. Promises, callbacks and async/await are common examples."
    },

    {
        id: 19,
        category: "JavaScript",
        question: "What is async/await?",
        difficulty: "Medium",
        answer: "async/await provides a cleaner way to work with Promises. The async keyword makes a function return a Promise and await waits for a Promise to settle."
    },


    // =========================
    // DSA
    // =========================

    {
        id: 20,
        category: "DSA",
        question: "What is time complexity?",
        difficulty: "Medium",
        answer: "Time complexity describes how the running time of an algorithm grows as input size increases. Common examples are O(1), O(log n), O(n) and O(n²)."
    }

];


// ==========================================
// GET HTML ELEMENTS
// ==========================================

const questionsContainer =
    document.getElementById("questions");

const searchInput =
    document.getElementById("searchInput");

const categoryFilter =
    document.getElementById("categoryFilter");

const difficultyFilter =
    document.getElementById("difficultyFilter");

const statusFilter =
    document.getElementById("statusFilter");

const progressText =
    document.getElementById("progressText");

const progressBar =
    document.getElementById("progressBar");

const progressPercentage =
    document.getElementById("progressPercentage");

const categoryProgress =
    document.getElementById("categoryProgress");

const randomQuestionBtn =
    document.getElementById("randomQuestionBtn");

const randomQuestionContainer =
    document.getElementById("randomQuestion");

const startMockBtn =
    document.getElementById("startMockBtn");

const mockInterview =
    document.getElementById("mockInterview");

const mockTimer =
    document.getElementById("mockTimer");


// ==========================================
// LOCAL STORAGE
// ==========================================

let completedQuestions =
    JSON.parse(
        localStorage.getItem("completedQuestions")
    ) || [];


let bookmarkedQuestions =
    JSON.parse(
        localStorage.getItem("bookmarkedQuestions")
    ) || [];


// ==========================================
// MOCK INTERVIEW VARIABLES
// ==========================================

let mockQuestions = [];

let currentMockQuestion = 0;

let mockScore = 0;

let mockTimerInterval = null;

let mockTimeLeft = 600;


// ==========================================
// MOCK HISTORY
// ==========================================

let mockHistory =
    JSON.parse(
        localStorage.getItem(
            "mockInterviewHistory"
        )
    ) || [];


// ==========================================
// CATEGORY DROPDOWN
// ==========================================

function createCategoryDropdown() {

    if (!categoryFilter) {
        return;
    }

    const counts = {};

    questions.forEach(item => {

        if (!counts[item.category]) {

            counts[item.category] = 0;

        }

        counts[item.category]++;

    });


    Object.keys(counts).forEach(category => {

        const option =
            document.createElement("option");

        option.value = category;

        option.textContent =
            `${category} (${counts[category]})`;

        categoryFilter.appendChild(option);

    });

}


createCategoryDropdown();


// ==========================================
// READ URL SEARCH / CATEGORY
// ==========================================

const urlParams =
    new URLSearchParams(
        window.location.search
    );


const urlSearch =
    urlParams.get("search");


const urlCategory =
    urlParams.get("category");


if (
    urlSearch &&
    searchInput
) {

    searchInput.value =
        urlSearch;

}


if (
    urlCategory &&
    categoryFilter
) {

    categoryFilter.value =
        urlCategory;

}


// ==========================================
// DISPLAY QUESTIONS
// ==========================================

function displayQuestions() {

    if (!questionsContainer) {
        return;
    }


    questionsContainer.innerHTML = "";


    const searchText =
        searchInput
            ? searchInput.value
                .toLowerCase()
                .trim()
            : "";


    const selectedCategory =
        categoryFilter
            ? categoryFilter.value
            : "all";


    const selectedDifficulty =
        difficultyFilter
            ? difficultyFilter.value
            : "all";


    const selectedStatus =
        statusFilter
            ? statusFilter.value
            : "all";


    const filteredQuestions =
        questions.filter(item => {

            const searchMatch =
                item.question
                    .toLowerCase()
                    .includes(searchText)
                ||
                item.answer
                    .toLowerCase()
                    .includes(searchText);


            const categoryMatch =
                selectedCategory === "all"
                ||
                item.category === selectedCategory;


            const difficultyMatch =
                selectedDifficulty === "all"
                ||
                item.difficulty === selectedDifficulty;


            let statusMatch = true;


            if (
                selectedStatus === "completed"
            ) {

                statusMatch =
                    completedQuestions.includes(
                        item.id
                    );

            }


            if (
                selectedStatus === "pending"
            ) {

                statusMatch =
                    !completedQuestions.includes(
                        item.id
                    );

            }


            if (
                selectedStatus === "bookmarked"
            ) {

                statusMatch =
                    bookmarkedQuestions.includes(
                        item.id
                    );

            }


            return (
                searchMatch &&
                categoryMatch &&
                difficultyMatch &&
                statusMatch
            );

        });


    if (
        filteredQuestions.length === 0
    ) {

        questionsContainer.innerHTML = `

            <div class="no-results">

                <h3>
                    No questions found
                </h3>

                <p>
                    Try another search or filter.
                </p>

            </div>

        `;

        return;

    }


    filteredQuestions.forEach(item => {

        const faqItem =
            document.createElement("div");


        faqItem.className =
            "faq-item";


        const isCompleted =
            completedQuestions.includes(
                item.id
            );


        const isBookmarked =
            bookmarkedQuestions.includes(
                item.id
            );


        if (isCompleted) {

            faqItem.classList.add(
                "completed"
            );

        }


        faqItem.innerHTML = `

            <div class="faq-question">

                <div class="question-content">

                    <span class="category">
                        ${item.category}
                    </span>

                    <span class="difficulty ${item.difficulty.toLowerCase()}">
                        ${item.difficulty}
                    </span>

                    <span class="question-text">
                        ${item.question}
                    </span>

                </div>


                <div class="question-actions">

                    <button
                        class="bookmark-btn"
                        title="Bookmark"
                    >
                        ${
                            isBookmarked
                                ? "★"
                                : "☆"
                        }
                    </button>


                    <span class="faq-icon">
                        +
                    </span>

                </div>

            </div>


            <div class="faq-answer">

                <p>
                    ${item.answer}
                </p>


                <button class="complete-btn">

                    ${
                        isCompleted
                            ? "✓ Completed"
                            : "✓ Mark as Completed"
                    }

                </button>

            </div>

        `;


        questionsContainer.appendChild(
            faqItem
        );


        // OPEN / CLOSE

        const questionElement =
            faqItem.querySelector(
                ".faq-question"
            );


        questionElement.addEventListener(
            "click",
            function(event) {

                if (
                    event.target.closest(
                        ".bookmark-btn"
                    )
                ) {

                    return;

                }


                faqItem.classList.toggle(
                    "active"
                );


                const icon =
                    faqItem.querySelector(
                        ".faq-icon"
                    );


                icon.textContent =
                    faqItem.classList.contains(
                        "active"
                    )
                        ? "−"
                        : "+";

            }
        );


        // BOOKMARK

        const bookmarkBtn =
            faqItem.querySelector(
                ".bookmark-btn"
            );


        bookmarkBtn.addEventListener(
            "click",
            function(event) {

                event.stopPropagation();


                if (
                    bookmarkedQuestions.includes(
                        item.id
                    )
                ) {

                    bookmarkedQuestions =
                        bookmarkedQuestions.filter(
                            id => id !== item.id
                        );

                } else {

                    bookmarkedQuestions.push(
                        item.id
                    );

                }


                localStorage.setItem(
                    "bookmarkedQuestions",
                    JSON.stringify(
                        bookmarkedQuestions
                    )
                );


                displayQuestions();

            }
        );


        // COMPLETE

        const completeButton =
            faqItem.querySelector(
                ".complete-btn"
            );


        completeButton.addEventListener(
            "click",
            function(event) {

                event.stopPropagation();


                if (
                    completedQuestions.includes(
                        item.id
                    )
                ) {

                    completedQuestions =
                        completedQuestions.filter(
                            id => id !== item.id
                        );

                } else {

                    completedQuestions.push(
                        item.id
                    );

                }


                localStorage.setItem(
                    "completedQuestions",
                    JSON.stringify(
                        completedQuestions
                    )
                );


                displayQuestions();

                updateProgress();

            }
        );

    });

}


// ==========================================
// OVERALL PROGRESS
// ==========================================

function updateProgress() {

    const total =
        questions.length;


    const completed =
        completedQuestions.length;


    const percentage =
        total > 0
            ? Math.round(
                (completed / total) * 100
            )
            : 0;


    if (progressText) {

        progressText.textContent =
            `${completed} / ${total} Completed`;

    }


    if (progressPercentage) {

        progressPercentage.textContent =
            `${percentage}%`;

    }


    if (progressBar) {

        progressBar.style.width =
            `${percentage}%`;

    }


    updateCategoryProgress();

}


// ==========================================
// CATEGORY PROGRESS
// ==========================================

function updateCategoryProgress() {

    if (!categoryProgress) {
        return;
    }


    categoryProgress.innerHTML = "";


    const categories = {};


    questions.forEach(item => {

        if (!categories[item.category]) {

            categories[item.category] = {
                total: 0,
                completed: 0
            };

        }

        categories[item.category].total++;

    });


    questions.forEach(item => {

        if (
            completedQuestions.includes(
                item.id
            )
        ) {

            categories[item.category].completed++;

        }

    });


    Object.keys(categories).forEach(
        category => {

            const data =
                categories[category];


            const percentage =
                Math.round(
                    (
                        data.completed /
                        data.total
                    ) * 100
                );


            const card =
                document.createElement("div");


            card.className =
                "category-progress";


            card.innerHTML = `

                <div class="category-progress-header">

                    <strong>
                        ${category}
                    </strong>

                    <span>
                        ${data.completed}/${data.total}
                    </span>

                </div>


                <div class="small-progress-track">

                    <div
                        class="small-progress-fill"
                        style="width:${percentage}%"
                    ></div>

                </div>

            `;


            categoryProgress.appendChild(
                card
            );

        }
    );

}


// ==========================================
// RANDOM QUESTION
// ==========================================

function showRandomQuestion() {

    if (!randomQuestionContainer) {
        return;
    }


    const randomIndex =
        Math.floor(
            Math.random() *
            questions.length
        );


    const item =
        questions[randomIndex];


    const isBookmarked =
        bookmarkedQuestions.includes(
            item.id
        );


    const isCompleted =
        completedQuestions.includes(
            item.id
        );


    randomQuestionContainer.innerHTML = `

        <div class="random-question-box">

            <div class="random-question-header">

                <span class="category">
                    ${item.category}
                </span>

                <span class="difficulty ${item.difficulty.toLowerCase()}">
                    ${item.difficulty}
                </span>

            </div>


            <h3>
                ${item.question}
            </h3>


            <button
                id="showRandomAnswer"
                class="show-answer-btn"
            >
                👁 Show Answer
            </button>


            <div
                id="randomAnswer"
                class="random-answer"
            >
                ${item.answer}
            </div>


            <div class="random-actions">

                <button
                    id="randomCompleteBtn"
                    class="complete-btn"
                >
                    ${
                        isCompleted
                            ? "✓ Completed"
                            : "✓ Mark as Completed"
                    }
                </button>


                <button
                    id="randomBookmarkBtn"
                    class="random-bookmark-btn"
                >
                    ${
                        isBookmarked
                            ? "★ Bookmarked"
                            : "☆ Bookmark"
                    }
                </button>

            </div>

        </div>

    `;


    const showAnswerBtn =
        document.getElementById(
            "showRandomAnswer"
        );


    const randomAnswer =
        document.getElementById(
            "randomAnswer"
        );


    showAnswerBtn.addEventListener(
        "click",
        function() {

            randomAnswer.classList.toggle(
                "show"
            );


            showAnswerBtn.textContent =
                randomAnswer.classList.contains(
                    "show"
                )
                    ? "🙈 Hide Answer"
                    : "👁 Show Answer";

        }
    );


    const randomBookmarkBtn =
        document.getElementById(
            "randomBookmarkBtn"
        );


    randomBookmarkBtn.addEventListener(
        "click",
        function() {

            if (
                bookmarkedQuestions.includes(
                    item.id
                )
            ) {

                bookmarkedQuestions =
                    bookmarkedQuestions.filter(
                        id => id !== item.id
                    );

                randomBookmarkBtn.textContent =
                    "☆ Bookmark";

            } else {

                bookmarkedQuestions.push(
                    item.id
                );

                randomBookmarkBtn.textContent =
                    "★ Bookmarked";

            }


            localStorage.setItem(
                "bookmarkedQuestions",
                JSON.stringify(
                    bookmarkedQuestions
                )
            );


            displayQuestions();

        }
    );


    const randomCompleteBtn =
        document.getElementById(
            "randomCompleteBtn"
        );


    randomCompleteBtn.addEventListener(
        "click",
        function() {

            if (
                completedQuestions.includes(
                    item.id
                )
            ) {

                completedQuestions =
                    completedQuestions.filter(
                        id => id !== item.id
                    );

                randomCompleteBtn.textContent =
                    "✓ Mark as Completed";

            } else {

                completedQuestions.push(
                    item.id
                );

                randomCompleteBtn.textContent =
                    "✓ Completed";

            }


            localStorage.setItem(
                "completedQuestions",
                JSON.stringify(
                    completedQuestions
                )
            );


            updateProgress();

            displayQuestions();

        }
    );

}


// ==========================================
// MOCK INTERVIEW TIMER
// ==========================================

function startMockTimer() {

    clearInterval(
        mockTimerInterval
    );


    mockTimeLeft = 600;


    updateMockTimer();


    mockTimerInterval =
        setInterval(
            function() {

                mockTimeLeft--;

                updateMockTimer();


                if (
                    mockTimeLeft <= 0
                ) {

                    clearInterval(
                        mockTimerInterval
                    );

                    finishMockInterview();

                }

            },
            1000
        );

}


// ==========================================
// UPDATE TIMER
// ==========================================

function updateMockTimer() {

    if (!mockTimer) {
        return;
    }


    const minutes =
        Math.floor(
            mockTimeLeft / 60
        );


    const seconds =
        mockTimeLeft % 60;


    mockTimer.textContent =
        `⏱ ${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;


    if (
        mockTimeLeft <= 60
    ) {

        mockTimer.classList.add(
            "danger"
        );

    } else {

        mockTimer.classList.remove(
            "danger"
        );

    }

}


// ==========================================
// START MOCK INTERVIEW
// ==========================================

function startMockInterview() {

    clearInterval(
        mockTimerInterval
    );


    currentMockQuestion = 0;

    mockScore = 0;


    const shuffledQuestions =
        [...questions].sort(
            () => Math.random() - 0.5
        );


    mockQuestions =
        shuffledQuestions.slice(0, 10);


    if (mockInterview) {

        mockInterview.scrollIntoView({
            behavior: "smooth"
        });

    }


    startMockTimer();

    showMockQuestion();

}


// ==========================================
// SHOW MOCK QUESTION
// ==========================================

function showMockQuestion() {

    if (
        !mockInterview ||
        mockQuestions.length === 0
    ) {

        return;

    }


    const item =
        mockQuestions[
            currentMockQuestion
        ];


    const questionNumber =
        currentMockQuestion + 1;


    const totalQuestions =
        mockQuestions.length;


    mockInterview.innerHTML = `

        <div class="mock-question-box">

            <div class="mock-header">

                <span>
                    Question
                    ${questionNumber}
                    /
                    ${totalQuestions}
                </span>


                <span class="mock-category">
                    ${item.category}
                </span>

            </div>


            <div class="mock-progress-track">

                <div
                    class="mock-progress-fill"
                    style="width:${
                        (
                            questionNumber /
                            totalQuestions
                        ) * 100
                    }%"
                ></div>

            </div>


            <h2 class="mock-question">
                ${item.question}
            </h2>


            <div class="mock-difficulty">

                <span
                    class="difficulty ${item.difficulty.toLowerCase()}"
                >
                    ${item.difficulty}
                </span>

            </div>


            <button
                id="mockShowAnswer"
                class="show-answer-btn"
            >
                👁 Show Answer
            </button>


            <div
                id="mockAnswer"
                class="mock-answer"
            >
                ${item.answer}
            </div>


            <div
                id="mockAssessment"
                class="mock-assessment"
            >

                <p>
                    Did you know the answer?
                </p>


                <div class="assessment-buttons">

                    <button
                        id="knewAnswerBtn"
                        class="knew-btn"
                    >
                        ✅ I Knew It
                    </button>


                    <button
                        id="didNotKnowBtn"
                        class="did-not-know-btn"
                    >
                        ❌ I Didn't Know
                    </button>

                </div>

            </div>


            <button
                id="nextMockBtn"
                class="next-mock-btn"
                disabled
            >
                Next Question →
            </button>

        </div>

    `;


    const showAnswerBtn =
        document.getElementById(
            "mockShowAnswer"
        );


    const answer =
        document.getElementById(
            "mockAnswer"
        );


    showAnswerBtn.addEventListener(
        "click",
        function() {

            answer.classList.toggle(
                "show"
            );


            showAnswerBtn.textContent =
                answer.classList.contains(
                    "show"
                )
                    ? "🙈 Hide Answer"
                    : "👁 Show Answer";

        }
    );


    const knewBtn =
        document.getElementById(
            "knewAnswerBtn"
        );


    const didNotKnowBtn =
        document.getElementById(
            "didNotKnowBtn"
        );


    const nextBtn =
        document.getElementById(
            "nextMockBtn"
        );


    knewBtn.addEventListener(
        "click",
        function() {

            mockScore++;


            knewBtn.classList.add(
                "selected"
            );


            knewBtn.disabled = true;

            didNotKnowBtn.disabled = true;

            nextBtn.disabled = false;

        }
    );


    didNotKnowBtn.addEventListener(
        "click",
        function() {

            didNotKnowBtn.classList.add(
                "selected"
            );


            knewBtn.disabled = true;

            didNotKnowBtn.disabled = true;

            nextBtn.disabled = false;

        }
    );


    nextBtn.addEventListener(
        "click",
        function() {

            currentMockQuestion++;


            if (
                currentMockQuestion <
                mockQuestions.length
            ) {

                showMockQuestion();

            } else {

                finishMockInterview();

            }

        }
    );

}


// ==========================================
// FINISH MOCK INTERVIEW
// ==========================================

function finishMockInterview() {

    clearInterval(
        mockTimerInterval
    );


    showMockResult();

}


// ==========================================
// SAVE MOCK HISTORY
// ==========================================

function saveMockHistory(
    score,
    total,
    percentage
) {

    const interview = {

        id: Date.now(),

        date:
            new Date().toLocaleString(),

        score: score,

        total: total,

        percentage: percentage

    };


    mockHistory.unshift(
        interview
    );


    if (
        mockHistory.length > 20
    ) {

        mockHistory =
            mockHistory.slice(0, 20);

    }


    localStorage.setItem(
        "mockInterviewHistory",
        JSON.stringify(
            mockHistory
        )
    );


    displayMockHistory();

}


// ==========================================
// MOCK RESULT
// ==========================================

function showMockResult() {

    const total =
        mockQuestions.length;


    const percentage =
        total > 0
            ? Math.round(
                (mockScore / total) * 100
            )
            : 0;


    saveMockHistory(
        mockScore,
        total,
        percentage
    );


    let bestScore =
        Number(
            localStorage.getItem(
                "mockBestScore"
            )
        ) || 0;


    if (
        percentage > bestScore
    ) {

        bestScore =
            percentage;


        localStorage.setItem(
            "mockBestScore",
            bestScore
        );

    }


    let message;


    if (percentage >= 80) {

        message =
            "Excellent! 🔥 Your preparation is strong.";

    }

    else if (percentage >= 60) {

        message =
            "Good job! 👍 Keep practicing.";

    }

    else if (percentage >= 40) {

        message =
            "You are improving. Keep studying! 💪";

    }

    else {

        message =
            "Don't worry. Practice more and try again! 🚀";

    }


    mockInterview.innerHTML = `

        <div class="mock-result">

            <div class="result-icon">
                🎉
            </div>


            <h2>
                Mock Interview Complete!
            </h2>


            <p>
                You completed
                ${total}
                questions.
            </p>


            <div class="score-circle">
                ${percentage}%
            </div>


            <h3>
                ${mockScore} / ${total}
            </h3>


            <p class="best-score">
                🏆 Best Score:
                ${bestScore}%
            </p>


            <p class="result-message">
                ${message}
            </p>


            <button
                id="restartMockBtn"
                class="mock-start-btn"
            >
                🔄 Try Again
            </button>

        </div>

    `;


    const restartBtn =
        document.getElementById(
            "restartMockBtn"
        );


    restartBtn.addEventListener(
        "click",
        startMockInterview
    );

}


// ==========================================
// DISPLAY HISTORY
// ==========================================

function displayMockHistory() {

    const historyContainer =
        document.getElementById(
            "mockHistory"
        );


    const statsContainer =
        document.getElementById(
            "historyStats"
        );


    if (
        !historyContainer ||
        !statsContainer
    ) {

        return;

    }


    if (
        mockHistory.length === 0
    ) {

        statsContainer.innerHTML = "";

        historyContainer.innerHTML = `

            <div class="no-history">

                <h3>
                    📭 No Interview History
                </h3>

                <p>
                    Complete your first mock interview
                    to see your result here.
                </p>

            </div>

        `;

        return;

    }


    const totalInterviews =
        mockHistory.length;


    const bestScore =
        Math.max(
            ...mockHistory.map(
                item =>
                    Number(item.percentage) || 0
            )
        );


    const averageScore =
        Math.round(
            mockHistory.reduce(
                (
                    total,
                    item
                ) =>
                    total +
                    (Number(item.percentage) || 0),
                0
            ) /
            totalInterviews
        );


    statsContainer.innerHTML = `

        <div class="history-stat">

            <span>🎤</span>

            <strong>
                ${totalInterviews}
            </strong>

            <small>
                Interviews
            </small>

        </div>


        <div class="history-stat">

            <span>🏆</span>

            <strong>
                ${bestScore}%
            </strong>

            <small>
                Best Score
            </small>

        </div>


        <div class="history-stat">

            <span>📊</span>

            <strong>
                ${averageScore}%
            </strong>

            <small>
                Average
            </small>

        </div>

    `;


    historyContainer.innerHTML = "";


    mockHistory.forEach(
        (item, index) => {

            const historyItem =
                document.createElement(
                    "div"
                );


            historyItem.className =
                "history-item";


            historyItem.innerHTML = `

                <div class="history-number">
                    ${index + 1}
                </div>


                <div class="history-details">

                    <h3>
                        Mock Interview
                        #${totalInterviews - index}
                    </h3>


                    <p>
                        📅 ${item.date}
                    </p>

                </div>


                <div class="history-score">

                    <strong>
                        ${item.score}/${item.total}
                    </strong>


                    <span>
                        ${item.percentage}%
                    </span>

                </div>

            `;


            historyContainer.appendChild(
                historyItem
            );

        }
    );

}


// ==========================================
// CLEAR HISTORY
// ==========================================

function clearMockHistory() {

    if (
        mockHistory.length === 0
    ) {

        alert(
            "There is no interview history to clear."
        );

        return;

    }


    const confirmDelete =
        confirm(
            "Are you sure you want to clear all mock interview history?"
        );


    if (
        !confirmDelete
    ) {

        return;

    }


    mockHistory = [];


    localStorage.removeItem(
        "mockInterviewHistory"
    );


    displayMockHistory();

}


// ==========================================
// EVENT LISTENERS
// ==========================================

if (searchInput) {

    searchInput.addEventListener(
        "input",
        displayQuestions
    );

}


if (categoryFilter) {

    categoryFilter.addEventListener(
        "change",
        displayQuestions
    );

}


if (difficultyFilter) {

    difficultyFilter.addEventListener(
        "change",
        displayQuestions
    );

}


if (statusFilter) {

    statusFilter.addEventListener(
        "change",
        displayQuestions
    );

}


if (randomQuestionBtn) {

    randomQuestionBtn.addEventListener(
        "click",
        showRandomQuestion
    );

}


if (startMockBtn) {

    startMockBtn.addEventListener(
        "click",
        startMockInterview
    );

}


const clearHistoryBtn =
    document.getElementById(
        "clearHistoryBtn"
    );


if (clearHistoryBtn) {

    clearHistoryBtn.addEventListener(
        "click",
        clearMockHistory
    );

}


// ==========================================
// INITIAL LOAD
// ==========================================

displayQuestions();

updateProgress();

displayMockHistory();


console.log(
    "CollegeHub Interview Preparation Loaded"
);