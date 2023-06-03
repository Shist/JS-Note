"use strict";

/// Store
const usersArr = [];
const usersUniqueIds = new Set();
let currUniqueId = 0;

// Controller
// Container with users
const usersContainer = document.querySelector(".users-container");
// Element for showing errors
const errorMessage = document.querySelector(".global-container__error-msg");
errorMessage.setAttribute("style", "white-space: pre-wrap;");
// Elements for creating
const createInputName = document.querySelector("#create-name");
const createInputSurname = document.querySelector("#create-surname");
const createSelectUserState = document.querySelector("#select-user-state");
const createBtn = document.querySelector(".global-container__create-btn");
// Elements for searching
const searchInputName = document.querySelector("#search-name");
const searchInputSurname = document.querySelector("#search-surname");
const searchSelectState = document.querySelector("#search-user-state");
const searchBtn = document.querySelector(".global-container__search-btn");
// Elements for editing
const formContainer = document.querySelector(".edit-form-wrapper");
const closeBtn = document.querySelector(".edit-form__close-btn");
const editErrorMessage = document.querySelector(".edit-form__error-msg");
editErrorMessage.setAttribute("style", "white-space: pre-wrap;");
const editInputName = document.querySelector("#edit-name");
const editInputSurname = document.querySelector("#edit-surname");
const editSelectUserState = document.querySelector("#edit-user-state");
const confirmBtn = document.querySelector(".edit-form__confirm-btn");
// Event while clicling on create button
createBtn.addEventListener("click", () => {
  const isNameWrong = isUserDataWrong(createInputName.value);
  const isSurnameWrong = isUserDataWrong(createInputSurname.value);
  if (isNameWrong) {
    errorMessage.textContent = `Error while creating Name:\n${isNameWrong}`;
    showErrorMessage();
    return;
  }
  if (isSurnameWrong) {
    errorMessage.textContent = `Error while creating Surname:\n${isSurnameWrong}`;
    showErrorMessage();
    return;
  }
  hideErrorMessage();
  addUser();
  createListPage(usersArr);
});
// Event while clicling on search button
searchBtn.addEventListener("click", () => {
  const filteredArr = usersArr.filter((user) => {
    if (
      searchSelectState.value === "All" ||
      user.state === searchSelectState.value
    ) {
      return (
        user.name.includes(searchInputName.value) &&
        user.surname.includes(searchInputSurname.value)
      );
    } else {
      return false;
    }
  });
  createListPage(filteredArr);
});
// Event while clicking on something inside users' container
usersContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("user-card__delete-btn")) {
    deleteUserByUniqueId(event.target.id);
    cleanSearchInputs();
    createListPage(usersArr);
  }
  if (event.target.classList.contains("user-card__edit-btn")) {
    prepareEditingModalWindow(event.target.id);
  }
});
// Event while clicking on button with cross at the top-right corner of editing form
closeBtn.addEventListener("click", (event) => {
  event.preventDefault();
  hideEditingModalWindow();
});
confirmBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const isNameWrong = isUserDataWrong(editInputName.value);
  const isSurnameWrong = isUserDataWrong(editInputSurname.value);
  if (isNameWrong) {
    editErrorMessage.textContent = `Error while editing Name:\n${isNameWrong}`;
    showEditErrorMessage();
    return;
  }
  if (isSurnameWrong) {
    editErrorMessage.textContent = `Error while editing Surname:\n${isSurnameWrong}`;
    showEditErrorMessage();
    return;
  }
  editUserByUniqueId(event.target.id);
  cleanSearchInputs();
  createListPage(usersArr);
  hideEditingModalWindow();
});

// Model
// addUser() => {...} - Adds data to array
function addUser() {
  const newUser = {
    uniqueId: generateUniqueId(usersUniqueIds),
    name: createInputName.value,
    surname: createInputSurname.value,
    state: createSelectUserState.value,
  };
  usersArr.push(newUser);
  cleanCreateInputs();
  cleanSearchInputs();
}
// cleanCreateInputs() => {...} - Cleans input values of create-inputs
function cleanCreateInputs() {
  createInputName.value = "";
  createInputSurname.value = "";
  createSelectUserState.value = "Active";
}
// cleanSearchInputs() => {...} - Cleans input values of search-inputs
function cleanSearchInputs() {
  searchInputName.value = "";
  searchInputSurname.value = "";
  searchSelectState.value = "All";
}
// createListPage(arr) => {...} - loops through the array "arr" and renders the elements on the page
function createListPage(arr) {
  usersContainer.innerHTML = "";
  if (arr.length > 0) {
    arr.forEach((user) => {
      renderUserCard(user);
    });
  } else {
    usersContainer.innerHTML = `<h3 class="users-container__no-users-text">No any users found...</h3>`;
  }
}
// deleteUserByUniqueId(uniqueId) => {...} - Deletes user with specific id "uniqueId" from the array and from the set
function deleteUserByUniqueId(uniqueId) {
  const userIndexInArray = getUserIndexByUniqueId(usersArr, uniqueId);
  usersArr.splice(userIndexInArray, 1);
  usersUniqueIds.delete(+uniqueId);
}
// deleteUserByUniqueId(uniqueId) => {...} - Edits user with specific id "uniqueId" in the array
function editUserByUniqueId(uniqueId) {
  const userIndexInArray = getUserIndexByUniqueId(usersArr, uniqueId);
  usersArr[userIndexInArray].name = editInputName.value;
  usersArr[userIndexInArray].surname = editInputSurname.value;
  usersArr[userIndexInArray].state = editSelectUserState.value;
}
// generateUniqueId(set) => {...} - Generates unique identifier that is not yet in the set "set"
function generateUniqueId(set) {
  if (++currUniqueId < Number.MAX_SAFE_INTEGER) {
    set.add(currUniqueId);
    return currUniqueId;
  }
  return "Critical error! There are no any unique identifiers left!";
}
// getUserIndexByUniqueId(arr, neededId) => {...} - Finds and returns index in the array "arr" of the object with specific uniqie id "neededId"
function getUserIndexByUniqueId(arr, neededId) {
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
// hideEditingModalWindow() => {...} - Hides modal window for editing user's data
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
// isUserDataWrong(str) => {...} - Checks if user's data invalid. If yes, returns error message. If no, returns false.
function isUserDataWrong(str) {
  if (!str.trim()) return "You can not enter an empty value!";
  if (str.length > 25)
    return "You can not enter the data with length > 25 symbols";
  return false;
}
// prepareEditingModalWindow(uniqueId) => {...} - prepares modal window for editing data of user with specific id "uniqueId"
function prepareEditingModalWindow(uniqueId) {
  const userIndexInArray = getUserIndexByUniqueId(usersArr, uniqueId);
  editInputName.value = usersArr[userIndexInArray].name;
  editInputSurname.value = usersArr[userIndexInArray].surname;
  editSelectUserState.value = usersArr[userIndexInArray].state;
  confirmBtn.id = uniqueId;
  showEditingModalWindow();
}
// renderUserCard(user) => {...} - Adds to the page given information about user "user"
function renderUserCard(user) {
  usersContainer.insertAdjacentHTML(
    "beforeend",
    `<div class="user-card">
        <h3 class="user-card__headline">User card №${user.uniqueId}</h3>
        <h4 class="user-card__name-headline">Name:</h4>
        <span class="user-card__name">${user.name}</span>
        <h4 class="user-card__surname-headline">Surname:</h4>
        <span class="user-card__surname user-card__surname">${user.surname}</span>
        <h4 class="user-card__state-headline">State:</h4>
        <span class="user-card__state_last user-card__state">${user.state}</span>
        <div class="user-card__buttons-wrapper">
          <button class="user-card__edit-btn" id="${user.uniqueId}">Edit user</button>
          <button class="user-card__delete-btn" id="${user.uniqueId}">Delete user</button>
        </div>
      </div>`
  );
}
// showEditErrorMessage() => {...} - Shows error message on edit modal window
function showEditErrorMessage() {
  editErrorMessage.classList.remove("hidden-element");
  editErrorMessage.classList.add("appeared-block");
}
// showEditingModalWindow() => {...} - Shows modal window for editing user's data
function showEditingModalWindow() {
  formContainer.classList.remove("hidden-element");
  formContainer.classList.add("appeared-flex");
}
// showErrorMessage() => {...} - Shows error message on main page
function showErrorMessage() {
  errorMessage.classList.remove("hidden-element");
  errorMessage.classList.add("appeared-block");
}
