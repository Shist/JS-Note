"use strict";

import {
  notesArr,
  notesUniqueIds,
  currUniqueId,
  incrementCurrUniqueId,
  removeNoteItem,
  setNoteItem,
} from "./store";

// Model

// addNote(titleInput, descriptionInput, stateSelect, deadlineInput) => {...} - Adds data to array
export function addNote(
  titleInput,
  descriptionInput,
  stateSelect,
  deadlineInput
) {
  const newNote = {
    uniqueId: generateUniqueId(notesUniqueIds),
    title: titleInput.value,
    description: descriptionInput.value,
    state: stateSelect.value,
    deadline: deadlineInput.value,
  };
  notesArr.push(newNote);
  setNoteItem(newNote.uniqueId, newNote);
  cleanCreateInputs(titleInput, descriptionInput, stateSelect, deadlineInput);
}

// cleanCreateInputs(titleInput, descriptionInput, stateSelect, deadlineInput) => {...} - Cleans input values of create-inputs
export function cleanCreateInputs(
  titleInput,
  descriptionInput,
  stateSelect,
  deadlineInput
) {
  titleInput.value = "";
  descriptionInput.value = "";
  stateSelect.value = "In progress";
  deadlineInput.value = new Date().toISOString().split("T")[0];
}

// updateNotesList(arr, searchState, searchTitle, searchDescription, notesContainer, sortOption) => {...} - loops through the array "arr" and renders the elements on the page
export function updateNotesList(
  arr,
  searchState,
  searchTitle,
  searchDescription,
  notesContainer,
  sortOption
) {
  const filteredArr = arr.filter((note) => {
    if (searchState.value === "All" || note.state === searchState.value) {
      return (
        note.title.includes(searchTitle.value) &&
        note.description.includes(searchDescription.value)
      );
    } else {
      return false;
    }
  });
  notesContainer.innerHTML = "";
  sortNotesArr(filteredArr, sortOption.value);
  if (filteredArr.length > 0) {
    filteredArr.forEach((note) => {
      renderNoteCard(note, notesContainer);
    });
  } else {
    notesContainer.innerHTML = `<h3 class="notes-container__no-notes-text">No notes were found matching the given parameters...</h3>`;
  }
}

// deleteNoteByUniqueId(uniqueId) => {...} - Deletes note with specific id "uniqueId" from the array and from the set
export function deleteNoteByUniqueId(uniqueId) {
  const noteIndexInArray = getNoteIndexByUniqueId(notesArr, uniqueId);
  notesArr.splice(noteIndexInArray, 1);
  notesUniqueIds.delete(+uniqueId);
  removeNoteItem(uniqueId);
}

// deleteNoteByUniqueId(uniqueId, titleInput, descriptionInput, stateSelect, deadlineInput) => {...} - Edits note with specific id "uniqueId" in the array
export function editNoteByUniqueId(
  uniqueId,
  titleInput,
  descriptionInput,
  stateSelect,
  deadlineInput
) {
  const noteIndexInArray = getNoteIndexByUniqueId(notesArr, uniqueId);
  const targetNote = notesArr[noteIndexInArray];
  targetNote.title = titleInput.value;
  targetNote.description = descriptionInput.value;
  targetNote.state = stateSelect.value;
  targetNote.deadline = deadlineInput.value;
  setNoteItem(uniqueId, targetNote);
}

// generateUniqueId(set) => {...} - Generates unique identifier that is not yet in the set "set"
export function generateUniqueId(set) {
  incrementCurrUniqueId();
  if (currUniqueId < Number.MAX_SAFE_INTEGER) {
    set.add(currUniqueId);
    return currUniqueId;
  }
  return "Critical error! There are no any unique identifiers left!";
}

// getNoteIndexByUniqueId(arr, neededId) => {...} - Finds and returns index in the array "arr" of the object with specific uniqie id "neededId"
export function getNoteIndexByUniqueId(arr, neededId) {
  for (let indexInArray in arr) {
    if (arr[indexInArray].uniqueId == neededId) return indexInArray;
  }
  return "Critical error! There are no elements with given specific unique identifier";
}

// hideEditErrorMessage(editMsgLabel) => {...} - Hides error message on edit modal window
export function hideEditErrorMessage(editMsgLabel) {
  editMsgLabel.classList.remove("appeared-block");
  editMsgLabel.classList.add("hidden-element");
}

// hideEditingModalWindow(formContainer, editMsgLabel) => {...} - Hides modal window for editing notes data
export function hideEditingModalWindow(formContainer, editMsgLabel) {
  hideEditErrorMessage(editMsgLabel);
  formContainer.classList.remove("appeared-flex");
  formContainer.classList.add("hidden-element");
}

// hideErrorMessage(msgLabel) => {...} - Hides error message on main page
export function hideErrorMessage(msgLabel) {
  msgLabel.classList.remove("appeared-block");
  msgLabel.classList.add("hidden-element");
}

// isDescriptionDataWrong(str) => {...} - Checks if user's description invalid. If yes, returns error message. If no, returns false.
export function isDescriptionDataWrong(str) {
  if (str.length > 128)
    return "You can not enter the description with more than 128 symbols";
  if (str.split(/\r\n|\r|\n/).length > 7)
    return "You can not enter the description with more than 7 lines";
  return false;
}

// isTitleDataWrong(str) => {...} - Checks if user's title invalid. If yes, returns error message. If no, returns false.
export function isTitleDataWrong(str) {
  if (!str.trim()) return "You can not enter an empty title!";
  if (str.length > 32)
    return "You can not enter the title with length more than 32 symbols";
  return false;
}

// prepareEditingModalWindow(uniqueId, titleInput, descriptionInput, stateSelect, deadlineInput, confirmBtn, formContainer) => {...} - prepares modal window for editing data of note with specific id "uniqueId"
export function prepareEditingModalWindow(
  uniqueId,
  titleInput,
  descriptionInput,
  stateSelect,
  deadlineInput,
  confirmBtn,
  formContainer
) {
  const noteIndexInArray = getNoteIndexByUniqueId(notesArr, uniqueId);
  titleInput.value = notesArr[noteIndexInArray].title;
  descriptionInput.value = notesArr[noteIndexInArray].description;
  stateSelect.value = notesArr[noteIndexInArray].state;
  deadlineInput.value = notesArr[noteIndexInArray].deadline;
  confirmBtn.id = uniqueId;
  showEditingModalWindow(formContainer);
}

// reformatDate(date => {...} - Reformates date from YYYY-MM-DD to DD.MM.YYYY
export function reformatDate(date) {
  return date.split("-").reverse().join(".");
}

// renderNoteCard(note, notesContainer) => {...} - Adds to the page given information about note "note"
export function renderNoteCard(note, notesContainer) {
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

// showEditErrorMessage(editMsgLabel, editMsgValue) => {...} - Shows error message on edit modal window
export function showEditErrorMessage(editMsgLabel, editMsgValue) {
  editMsgLabel.textContent = editMsgValue;
  editMsgLabel.classList.remove("hidden-element");
  editMsgLabel.classList.add("appeared-block");
}

// showEditingModalWindow(formContainer) => {...} - Shows modal window for editing notes data
export function showEditingModalWindow(formContainer) {
  formContainer.classList.remove("hidden-element");
  formContainer.classList.add("appeared-flex");
}

// showErrorMessage(msgLabel, msgValue) => {...} - Shows error message on main page
export function showErrorMessage(msgLabel, msgValue) {
  msgLabel.textContent = msgValue;
  msgLabel.classList.remove("hidden-element");
  msgLabel.classList.add("appeared-block");
}

// sortNotesArr(notesArr, sortOption) => {...} - Sorts array "notesArr" by option "sortOption"
export function sortNotesArr(notesArr, sortOption) {
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
