// ==========================================
// COLLEGEHUB PLACEMENT
// ==========================================


// ==========================================
// GET CHECKLIST
// ==========================================

let placementChecklist =
    JSON.parse(
        localStorage.getItem(
            "placementChecklist"
        )
    ) || {};


// ==========================================
// ELEMENTS
// ==========================================

const placementChecks =
    document.querySelectorAll(
        ".placement-check"
    );


const placementProgress =
    document.getElementById(
        "placementProgress"
    );


const placementProgressBar =
    document.getElementById(
        "placementProgressBar"
    );


// ==========================================
// UPDATE PROGRESS
// ==========================================

function updatePlacementProgress() {

    const total =
        placementChecks.length;


    let completed = 0;


    placementChecks.forEach(
        checkbox => {

            if (
                checkbox.checked
            ) {

                completed++;

            }

        }
    );


    const percentage =
        total > 0
        ? Math.round(
            (
                completed /
                total
            ) * 100
        )
        : 0;


    // TEXT

    if (
        placementProgress
    ) {

        placementProgress.textContent =
            `${percentage}%`;

    }


    // PROGRESS BAR

    if (
        placementProgressBar
    ) {

        placementProgressBar.style.width =
            `${percentage}%`;

    }


    // SAVE

    localStorage.setItem(
        "placementChecklist",
        JSON.stringify(
            placementChecklist
        )
    );

}


// ==========================================
// LOAD SAVED CHECKLIST
// ==========================================

placementChecks.forEach(
    checkbox => {

        const id =
            checkbox.dataset.id;


        checkbox.checked =
            placementChecklist[id] === true;


        checkbox.addEventListener(
            "change",
            function () {

                placementChecklist[id] =
                    this.checked;


                updatePlacementProgress();

            }
        );

    }
);


// ==========================================
// INITIAL PROGRESS
// ==========================================

updatePlacementProgress();


console.log(
    "CollegeHub Placement Loaded"
);