// ==========================================
// COLLEGEHUB NOTES
// ==========================================


// ==========================================
// GET NOTES FROM LOCAL STORAGE
// ==========================================

let notes =
    JSON.parse(
        localStorage.getItem(
            "collegeHubNotes"
        )
    ) || [];


// ==========================================
// ELEMENTS
// ==========================================

const noteForm =
    document.getElementById(
        "noteForm"
    );


const noteTitle =
    document.getElementById(
        "noteTitle"
    );


const noteTag =
    document.getElementById(
        "noteTag"
    );


const noteBody =
    document.getElementById(
        "noteBody"
    );


const notesList =
    document.getElementById(
        "notesList"
    );


const noteSearch =
    document.getElementById(
        "noteSearch"
    );


const noteFilter =
    document.getElementById(
        "noteFilter"
    );


const notesCount =
    document.getElementById(
        "notesCount"
    );


// ==========================================
// SAVE NOTES
// ==========================================

function saveNotes() {

    localStorage.setItem(
        "collegeHubNotes",
        JSON.stringify(notes)
    );

}


// ==========================================
// CREATE NOTE
// ==========================================

noteForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const title =
            noteTitle.value.trim();


        const tag =
            noteTag.value.trim()
            || "Other";


        const body =
            noteBody.value.trim();


        if (
            !title ||
            !body
        ) {

            return;

        }


        const newNote = {

            id: Date.now(),

            title: title,

            tag: tag,

            body: body,

            date:
                new Date().toLocaleString()

        };


        notes.unshift(
            newNote
        );


        saveNotes();


        noteForm.reset();


        displayNotes();

    }
);


// ==========================================
// DISPLAY NOTES
// ==========================================

function displayNotes() {

    const searchText =
        noteSearch
            ? noteSearch.value
                .toLowerCase()
                .trim()
            : "";


    const selectedTag =
        noteFilter
            ? noteFilter.value
            : "all";


    let filteredNotes =
        notes.filter(
            note => {

                const matchesSearch =

                    note.title
                        .toLowerCase()
                        .includes(
                            searchText
                        )

                    ||

                    note.body
                        .toLowerCase()
                        .includes(
                            searchText
                        )

                    ||

                    note.tag
                        .toLowerCase()
                        .includes(
                            searchText
                        );


                const matchesTag =

                    selectedTag === "all"

                    ||

                    note.tag
                        .toLowerCase() ===
                    selectedTag
                        .toLowerCase();


                return (
                    matchesSearch &&
                    matchesTag
                );

            }
        );


    // ======================================
    // UPDATE COUNT
    // ======================================

    if (notesCount) {

        notesCount.textContent =

            `${filteredNotes.length} ${
                filteredNotes.length === 1
                ? "Note"
                : "Notes"
            }`;

    }


    // ======================================
    // EMPTY RESULT
    // ======================================

    if (
        filteredNotes.length === 0
    ) {

        notesList.innerHTML = `

            <div class="no-notes">

                <h3>
                    📭 No Notes Found
                </h3>

                <p>
                    Create a note or change your search.
                </p>

            </div>

        `;

        return;

    }


    // ======================================
    // CLEAR LIST
    // ======================================

    notesList.innerHTML = "";


    // ======================================
    // CREATE NOTE CARDS
    // ======================================

    filteredNotes.forEach(
        note => {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "note-card";


            card.innerHTML = `

                <div class="note-card-header">

                    <h3>
                        ${escapeHTML(
                            note.title
                        )}
                    </h3>

                    <span class="note-tag">

                        ${escapeHTML(
                            note.tag
                        )}

                    </span>

                </div>


                <p class="note-body">

                    ${escapeHTML(
                        note.body
                    )}

                </p>


                <div class="note-card-footer">

                    <small>

                        📅 ${note.date}

                    </small>


                    <div class="note-actions">

                        <button
                            class="edit-note-btn"
                            data-id="${note.id}"
                        >
                            ✏️ Edit
                        </button>


                        <button
                            class="delete-note-btn"
                            data-id="${note.id}"
                        >
                            🗑️ Delete
                        </button>

                    </div>

                </div>

            `;


            notesList.appendChild(
                card
            );

        }
    );


    // ======================================
    // EDIT BUTTONS
    // ======================================

    document
        .querySelectorAll(
            ".edit-note-btn"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    function () {

                        editNote(
                            Number(
                                this.dataset.id
                            )
                        );

                    }
                );

            }
        );


    // ======================================
    // DELETE BUTTONS
    // ======================================

    document
        .querySelectorAll(
            ".delete-note-btn"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    function () {

                        deleteNote(
                            Number(
                                this.dataset.id
                            )
                        );

                    }
                );

            }
        );

}


// ==========================================
// EDIT NOTE
// ==========================================

function editNote(id) {

    const note =
        notes.find(
            item =>
                item.id === id
        );


    if (!note) {

        return;

    }


    noteTitle.value =
        note.title;


    noteTag.value =
        note.tag;


    noteBody.value =
        note.body;


    noteForm.dataset.editingId =
        id;


    const saveButton =
        noteForm.querySelector(
            "button[type='submit']"
        );


    if (saveButton) {

        saveButton.textContent =
            "💾 Update Note";

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ==========================================
// UPDATE NOTE
// ==========================================

noteForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const editingId =
            Number(
                noteForm.dataset.editingId
            );


        if (!editingId) {

            return;

        }


        const note =
            notes.find(
                item =>
                    item.id === editingId
            );


        if (!note) {

            return;

        }


        note.title =
            noteTitle.value.trim();


        note.tag =
            noteTag.value.trim()
            || "Other";


        note.body =
            noteBody.value.trim();


        saveNotes();


        delete noteForm.dataset.editingId;


        noteForm.reset();


        const saveButton =
            noteForm.querySelector(
                "button[type='submit']"
            );


        if (saveButton) {

            saveButton.textContent =
                "💾 Save Note";

        }


        displayNotes();

    }
);


// ==========================================
// DELETE NOTE
// ==========================================

function deleteNote(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this note?"
        );


    if (!confirmDelete) {

        return;

    }


    notes =
        notes.filter(
            note =>
                note.id !== id
        );


    saveNotes();


    displayNotes();

}


// ==========================================
// SEARCH
// ==========================================

if (noteSearch) {

    noteSearch.addEventListener(
        "input",
        displayNotes
    );

}


// ==========================================
// FILTER
// ==========================================

if (noteFilter) {

    noteFilter.addEventListener(
        "change",
        displayNotes
    );

}


// ==========================================
// HTML SAFETY
// ==========================================

function escapeHTML(text) {

    return String(text)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


// ==========================================
// INITIAL DISPLAY
// ==========================================

displayNotes();


console.log(
    "CollegeHub Notes Loaded"
);