"use strict";

import { notesArr, loadLocalData } from "./assets/scripts/store";
import {
  addNote,
  updateNotesList,
  deleteNoteByUniqueId,
  editNoteByUniqueId,
  hideEditingModalWindow,
  hideErrorMessage,
  isDescriptionDataWrong,
  isTitleDataWrong,
  prepareEditingModalWindow,
  showEditErrorMessage,
  showErrorMessage,
} from "./assets/scripts/model";

// Controller

document.addEventListener("DOMContentLoaded", () => {
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
      showErrorMessage(
        errorMessage,
        `Error while creating Title:\n${isTitleWrong}`
      );
      return;
    }
    if (isDescriptionWrong) {
      showErrorMessage(
        errorMessage,
        `Error while creating Description:\n${isDescriptionWrong}`
      );
      return;
    }
    hideErrorMessage(errorMessage);
    addNote(
      createInputTitle,
      createInputDescription,
      createSelectNoteState,
      createInputDeadline
    );
    updateNotesList(
      notesArr,
      searchSelectNoteState,
      searchInputTitle,
      searchInputDescription,
      notesContainer,
      selectSortOption
    );
  });

  // Event while clicling on search button
  searchBtn.addEventListener("click", () => {
    updateNotesList(
      notesArr,
      searchSelectNoteState,
      searchInputTitle,
      searchInputDescription,
      notesContainer,
      selectSortOption
    );
  });

  // Event while clicking on something inside notes container
  notesContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("note-card__delete-btn")) {
      deleteNoteByUniqueId(event.target.id);
      updateNotesList(
        notesArr,
        searchSelectNoteState,
        searchInputTitle,
        searchInputDescription,
        notesContainer,
        selectSortOption
      );
    }
    if (event.target.classList.contains("note-card__edit-btn")) {
      prepareEditingModalWindow(
        event.target.id,
        editInputTitle,
        editInputDescription,
        editSelectNoteState,
        editInputDeadline,
        confirmBtn,
        formContainer
      );
    }
  });

  // Event while clicking on button with cross at the top-right corner of editing form
  closeBtn.addEventListener("click", (event) => {
    event.preventDefault();
    hideEditingModalWindow(formContainer, editErrorMessage);
  });

  // Event while clicking on confirm button in order to sumbit changes in editing form
  confirmBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const isTitleWrong = isTitleDataWrong(editInputTitle.value);
    const isDescriptionWrong = isDescriptionDataWrong(
      editInputDescription.value
    );
    if (isTitleWrong) {
      showEditErrorMessage(
        editErrorMessage,
        `Error while editing Title:\n${isTitleWrong}`
      );
      return;
    }
    if (isDescriptionWrong) {
      showEditErrorMessage(
        editErrorMessage,
        `Error while editing Description:\n${isDescriptionWrong}`
      );
      return;
    }
    editNoteByUniqueId(
      event.target.id,
      editInputTitle,
      editInputDescription,
      editSelectNoteState,
      editInputDeadline
    );
    updateNotesList(
      notesArr,
      searchSelectNoteState,
      searchInputTitle,
      searchInputDescription,
      notesContainer,
      selectSortOption
    );
    hideEditingModalWindow(formContainer, editErrorMessage);
  });

  // Event while clicking on dark space around edit form
  formContainer.addEventListener("click", (event) => {
    if (event.target === formContainer) {
      hideEditingModalWindow(formContainer, editErrorMessage);
    }
  });
  document.addEventListener("keydown", (event) => {
    if (
      event.code === "Escape" &&
      formContainer.classList.contains("appeared-flex")
    ) {
      hideEditingModalWindow(formContainer, editErrorMessage);
    }
  });

  // Loading local data (if exsist) from the start
  loadLocalData();

  // Updating list of notes
  updateNotesList(
    notesArr,
    searchSelectNoteState,
    searchInputTitle,
    searchInputDescription,
    notesContainer,
    selectSortOption
  );
});
