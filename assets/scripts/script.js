"use strict";

document.addEventListener("DOMContentLoaded", () => {
  /// Store
  let notesArr = [];
  let notesUniqueIds = new Set();
  let currUniqueId = 0;

  // Controller
  // Container with notes
  const notesContainer = document.querySelector(".notes-container");
  // Element for showing errors
  const errorMessage = document.querySelector(".global-container__error-msg");
  errorMessage.setAttribute("style", "white-space: pre-wrap;");
  // Elements for creating
  const createInputTitle = document.querySelector("#create-title");
  const createInputDescription = document.querySelector("#create-description");
  const createSelectNoteState = document.querySelector("#create-state");
  const createInputDeadline = document.querySelector("#create-deadline");
  createInputDeadline.value = new Date().toISOString().split("T")[0];
  const createBtn = document.querySelector(".global-container__create-btn");
  // Elements for searching
  const searchInputTitle = document.querySelector("#search-title");
  const searchInputDescription = document.querySelector("#search-description");
  const searchSelectNoteState = document.querySelector("#search-state");
  const searchBtn = document.querySelector(".global-container__refresh-btn");
  // Elements for sorting
  const selectSortOption = document.querySelector("#select-sort-option");
  // Elements for editing
  const formContainer = document.querySelector(".edit-form-wrapper");
  const closeBtn = document.querySelector(".edit-form__close-btn");
  const editErrorMessage = document.querySelector(".edit-form__error-msg");
  const editInputTitle = document.querySelector("#edit-title");
  const editInputDescription = document.querySelector("#edit-description");
  const editSelectNoteState = document.querySelector("#edit-state");
  const editInputDeadline = document.querySelector("#edit-deadline");
  const confirmBtn = document.querySelector(".edit-form__confirm-btn");
  // Event while clicling on create button
  createBtn.addEventListener("click", () => {
    const isTitleWrong = isTitleDataWrong(createInputTitle.value);
    const isDescriptionWrong = isDescriptionDataWrong(
      createInputDescription.value
    );
    if (isTitleWrong) {
      errorMessage.textContent = `Error while creating Title:\n${isTitleWrong}`;
      showErrorMessage();
      return;
    }
    if (isDescriptionWrong) {
      errorMessage.textContent = `Error while creating Description:\n${isDescriptionWrong}`;
      showErrorMessage();
      return;
    }
    hideErrorMessage();
    addNote();
    updateNotesList(notesArr);
  });
  // Event while clicling on search button
  searchBtn.addEventListener("click", () => {
    updateNotesList(notesArr);
  });
  // Event while clicking on something inside notes container
  notesContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("note-card__delete-btn")) {
      deleteNoteByUniqueId(event.target.id);
      updateNotesList(notesArr);
    }
    if (event.target.classList.contains("note-card__edit-btn")) {
      prepareEditingModalWindow(event.target.id);
    }
  });
  // Event while clicking on button with cross at the top-right corner of editing form
  closeBtn.addEventListener("click", (event) => {
    event.preventDefault();
    hideEditingModalWindow();
  });
  // Event while clicking on confirm button in order to sumbit changes in editing form
  confirmBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const isTitleWrong = isTitleDataWrong(editInputTitle.value);
    const isDescriptionWrong = isDescriptionDataWrong(
      editInputDescription.value
    );
    if (isTitleWrong) {
      editErrorMessage.textContent = `Error while editing Title:\n${isTitleWrong}`;
      showEditErrorMessage();
      return;
    }
    if (isDescriptionWrong) {
      editErrorMessage.textContent = `Error while editing Description:\n${isDescriptionWrong}`;
      showEditErrorMessage();
      return;
    }
    editNoteByUniqueId(event.target.id);
    updateNotesList(notesArr);
    hideEditingModalWindow();
  });
  // Event while clicking on dark space around edit form
  formContainer.addEventListener("click", (event) => {
    if (event.target === formContainer) {
      hideEditingModalWindow();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (
      event.code === "Escape" &&
      formContainer.classList.contains("appeared-flex")
    ) {
      hideEditingModalWindow();
    }
  });

  // Model
  // addNote() => {...} - Adds data to array
  function addNote() {
    const newNote = {
      uniqueId: generateUniqueId(notesUniqueIds),
      title: createInputTitle.value,
      description: createInputDescription.value,
      state: createSelectNoteState.value,
      deadline: createInputDeadline.value,
    };
    notesArr.push(newNote);
    localStorage.setItem(newNote.uniqueId.toString(), JSON.stringify(newNote));
    localStorage.setItem("currUniqueId", newNote.uniqueId.toString());
    localStorage.setItem("uniqueIdsArray", JSON.stringify([...notesUniqueIds]));
    cleanCreateInputs();
  }
  // cleanCreateInputs() => {...} - Cleans input values of create-inputs
  function cleanCreateInputs() {
    createInputTitle.value = "";
    createInputDescription.value = "";
    createSelectNoteState.value = "In progress";
    createInputDeadline.value = new Date().toISOString().split("T")[0];
  }
  // updateNotesList(arr) => {...} - loops through the array "arr" and renders the elements on the page
  function updateNotesList(arr) {
    const filteredArr = arr.filter((note) => {
      if (
        searchSelectNoteState.value === "All" ||
        note.state === searchSelectNoteState.value
      ) {
        return (
          note.title.includes(searchInputTitle.value) &&
          note.description.includes(searchInputDescription.value)
        );
      } else {
        return false;
      }
    });
    notesContainer.innerHTML = "";
    sortNotesArr(filteredArr, selectSortOption.value);
    if (filteredArr.length > 0) {
      filteredArr.forEach((note) => {
        renderNoteCard(note);
      });
    } else {
      notesContainer.innerHTML = `<h3 class="notes-container__no-notes-text">No notes were found matching the given parameters...</h3>`;
    }
  }
  // deleteNoteByUniqueId(uniqueId) => {...} - Deletes note with specific id "uniqueId" from the array and from the set
  function deleteNoteByUniqueId(uniqueId) {
    const noteIndexInArray = getNoteIndexByUniqueId(notesArr, uniqueId);
    notesArr.splice(noteIndexInArray, 1);
    notesUniqueIds.delete(+uniqueId);
    localStorage.removeItem(uniqueId);
    localStorage.setItem("uniqueIdsArray", JSON.stringify([...notesUniqueIds]));
  }
  // deleteNoteByUniqueId(uniqueId) => {...} - Edits note with specific id "uniqueId" in the array
  function editNoteByUniqueId(uniqueId) {
    const noteIndexInArray = getNoteIndexByUniqueId(notesArr, uniqueId);
    notesArr[noteIndexInArray].title = editInputTitle.value;
    notesArr[noteIndexInArray].description = editInputDescription.value;
    notesArr[noteIndexInArray].state = editSelectNoteState.value;
    notesArr[noteIndexInArray].deadline = editInputDeadline.value;
    localStorage.setItem(
      uniqueId.toString(),
      JSON.stringify(notesArr[noteIndexInArray])
    );
  }
  // generateUniqueId(set) => {...} - Generates unique identifier that is not yet in the set "set"
  function generateUniqueId(set) {
    if (++currUniqueId < Number.MAX_SAFE_INTEGER) {
      set.add(currUniqueId);
      return currUniqueId;
    }
    return "Critical error! There are no any unique identifiers left!";
  }
  // getNoteIndexByUniqueId(arr, neededId) => {...} - Finds and returns index in the array "arr" of the object with specific uniqie id "neededId"
  function getNoteIndexByUniqueId(arr, neededId) {
    for (let indexInArray in arr) {
      if (arr[indexInArray].uniqueId == neededId) return indexInArray;
    }
    return "Critical error! There are no elements with given specific unique identifier";
  }
  // hideEditErrorMessage() => {...} - Hides error message on edit modal window
  function hideEditErrorMessage() {
    editErrorMessage.classList.remove("appeared-block");
    editErrorMessage.classList.add("hidden-element");
  }
  // hideEditingModalWindow() => {...} - Hides modal window for editing notes data
  function hideEditingModalWindow() {
    hideEditErrorMessage();
    formContainer.classList.remove("appeared-flex");
    formContainer.classList.add("hidden-element");
  }
  // hideErrorMessage() => {...} - Hides error message on main page
  function hideErrorMessage() {
    errorMessage.classList.remove("appeared-block");
    errorMessage.classList.add("hidden-element");
  }
  // isDescriptionDataWrong(str) => {...} - Checks if user's description invalid. If yes, returns error message. If no, returns false.
  function isDescriptionDataWrong(str) {
    if (str.length > 128)
      return "You can not enter the description with more than 128 symbols";
    if (str.split(/\r\n|\r|\n/).length > 7)
      return "You can not enter the description with more than 7 lines";
    return false;
  }
  // isTitleDataWrong(str) => {...} - Checks if user's title invalid. If yes, returns error message. If no, returns false.
  function isTitleDataWrong(str) {
    if (!str.trim()) return "You can not enter an empty title!";
    if (str.length > 32)
      return "You can not enter the title with length more than 32 symbols";
    return false;
  }
  // loadLocalData() => {...} - Load local data from browser memory and refresh notes list after that
  function loadLocalData() {
    const currUniqueIdFromLocal = localStorage.getItem("currUniqueId");
    if (currUniqueIdFromLocal) {
      currUniqueId = +currUniqueIdFromLocal;
    }
    const notesUniqueIdsArrayFromLocal = JSON.parse(
      localStorage.getItem("uniqueIdsArray")
    );
    if (notesUniqueIdsArrayFromLocal) {
      notesUniqueIds = new Set(notesUniqueIdsArrayFromLocal);
    }
    notesUniqueIds.forEach((uniqueId) => {
      const noteDataFromLocal = JSON.parse(
        localStorage.getItem(uniqueId.toString())
      );
      if (noteDataFromLocal) {
        notesArr.push(noteDataFromLocal);
      }
    });
    updateNotesList(notesArr);
  }
  // prepareEditingModalWindow(uniqueId) => {...} - prepares modal window for editing data of note with specific id "uniqueId"
  function prepareEditingModalWindow(uniqueId) {
    const noteIndexInArray = getNoteIndexByUniqueId(notesArr, uniqueId);
    editInputTitle.value = notesArr[noteIndexInArray].title;
    editInputDescription.value = notesArr[noteIndexInArray].description;
    editSelectNoteState.value = notesArr[noteIndexInArray].state;
    editInputDeadline.value = notesArr[noteIndexInArray].deadline;
    confirmBtn.id = uniqueId;
    showEditingModalWindow();
  }
  // reformatDate(date => {...} - Reformates date from YYYY-MM-DD to DD.MM.YYYY
  function reformatDate(date) {
    return date.split("-").reverse().join(".");
  }
  // renderNoteCard(note) => {...} - Adds to the page given information about note "note"
  function renderNoteCard(note) {
    notesContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="note-card">
        <h3 class="note-card__title">${note.title}</h3>
        <h4 class="note-card__description-headline">Description:</h4>
        <p class="note-card__description_last note-card__description">${
          note.description ? note.description : "Description is empty..."
        }</p>
        <h4 class="note-card__state_last note-card__state">State: ${
          note.state
        }</h4>
        <h4 class="note-card__deadline_last note-card__deadline">Deadline: ${reformatDate(
          note.deadline
        )}</h4>
        <div class="note-card__buttons-wrapper">
          <button class="note-card__edit-btn" id="${
            note.uniqueId
          }">Edit note</button>
          <button class="note-card__delete-btn" id="${
            note.uniqueId
          }">Delete note</button>
        </div>
      </div>`
    );
  }
  // showEditErrorMessage() => {...} - Shows error message on edit modal window
  function showEditErrorMessage() {
    editErrorMessage.classList.remove("hidden-element");
    editErrorMessage.classList.add("appeared-block");
  }
  // showEditingModalWindow() => {...} - Shows modal window for editing notes data
  function showEditingModalWindow() {
    formContainer.classList.remove("hidden-element");
    formContainer.classList.add("appeared-flex");
  }
  // showErrorMessage() => {...} - Shows error message on main page
  function showErrorMessage() {
    errorMessage.classList.remove("hidden-element");
    errorMessage.classList.add("appeared-block");
  }
  // sortNotesArr(notesArr, sortOption) => {...} - Sorts array "notesArr" by option "sortOption"
  function sortNotesArr(notesArr, sortOption) {
    switch (sortOption) {
      case "Deadline":
        notesArr.sort((first, second) => {
          return new Date(first.deadline) - new Date(second.deadline);
        });
        return notesArr;
      case "State":
        notesArr.sort((first, second) => {
          return first.state > second.state
            ? 1
            : second.state > first.state
            ? -1
            : 0;
        });
        return notesArr;
      case "Title":
        notesArr.sort((first, second) => {
          return first.title > second.title
            ? 1
            : second.title > first.title
            ? -1
            : 0;
        });
        return notesArr;
      case "Description":
        notesArr.sort((first, second) => {
          return first.description > second.description
            ? 1
            : second.description > first.description
            ? -1
            : 0;
        });
        return notesArr;
    }
  }

  // Loading local data (if exsist) from the start
  loadLocalData();
});
