"use strict";

/// Store
const usersArr = [];
const usersUniqueIds = new Set();

// Controller
// Container with users
const usersContainer = document.querySelector(".users-container");
// Elements for creating
const createInputName = document.querySelector("#create-name");
const createInputSurname = document.querySelector("#create-surname");
const createBtn = document.querySelector(".global-container__create-btn");
// Elements for searching
const searchInputName = document.querySelector("#search-name");
const searchInputSurname = document.querySelector("#search-surname");
const searchBtn = document.querySelector(".global-container__search-btn");
// Elements for editing
const formContainer = document.querySelector(".edit-form-wrapper");
const form = document.querySelector(".edit-form");
const closeBtn = document.querySelector(".edit-form__close-btn");
const editInputName = document.querySelector("#edit-name");
const editInputSurname = document.querySelector("#edit-surname");
const confirmBtn = document.querySelector(".edit-form__confirm-btn");
// Event while clicling on create button
createBtn.addEventListener("click", () => {
  const isNameWrong = isUserDataWrong(createInputName.value);
  const isSurnameWrong = isUserDataWrong(createInputSurname.value);
  if (isNameWrong) {
    alert(`Error while creating Name:\n${isNameWrong}`);
    return;
  }
  if (isSurnameWrong) {
    alert(`Error while creating Surname:\n${isSurnameWrong}`);
    return;
  }
  addUser();
  createListPage(usersArr);
});
// Event while clicling on search button
searchBtn.addEventListener("click", () => {
  createListPage(
    usersArr.filter(
      (user) =>
        user.name.includes(searchInputName.value) &&
        user.surname.includes(searchInputSurname.value)
    )
  );
});
// Event while clicking on something inside users' container
usersContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("user-card__delete-btn")) {
    const userIndexInArray = getUserIndexByUniqueId(usersArr, event.target.id);
    usersArr.splice(userIndexInArray, 1);
    usersUniqueIds.delete(+event.target.id);
    searchInputName.value = "";
    searchInputSurname.value = "";
    createListPage(usersArr);
  }
  if (event.target.classList.contains("user-card__edit-btn")) {
    formContainer.classList.add("appeared-flex");
    const userIndexInArray = getUserIndexByUniqueId(usersArr, event.target.id);
    editInputName.value = usersArr[userIndexInArray].name;
    editInputSurname.value = usersArr[userIndexInArray].surname;
    confirmBtn.id = event.target.id;
  }
});
// Event while clicking on button with cross at the top-right corner of editing form
closeBtn.addEventListener("click", (event) => {
  event.preventDefault();
  formContainer.classList.remove("appeared-flex");
  formContainer.classList.add("hidden-element");
});
confirmBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const isNameWrong = isUserDataWrong(editInputName.value);
  const isSurnameWrong = isUserDataWrong(editInputSurname.value);
  if (isNameWrong) {
    alert(`Error while editing Name:\n${isNameWrong}`);
    return;
  }
  if (isSurnameWrong) {
    alert(`Error while editing Surname:\n${isSurnameWrong}`);
    return;
  }
  const userIndexInArray = getUserIndexByUniqueId(usersArr, event.target.id);
  usersArr[userIndexInArray].name = editInputName.value;
  usersArr[userIndexInArray].surname = editInputSurname.value;
  searchInputName.value = "";
  searchInputSurname.value = "";
  createListPage(usersArr);
  formContainer.classList.remove("appeared-flex");
  formContainer.classList.add("hidden-element");
});

// Model
// isUserDataWrong(str) => {...} - Checks if user's data invalid. If yes, returns error message. If no, returns false.
function isUserDataWrong(str) {
  if (!str.trim()) return "You can not enter an empty value!";
  if (str.length > 25)
    return "You can not enter the data with length > 25 symbols";
  return false;
}
// generateUniqueId(set) => {...} - Generates unique identifier that is not yet in the set "set"
function generateUniqueId(set) {
  for (let id = 1; id < Number.MAX_SAFE_INTEGER; id++) {
    if (set.has(id)) {
      continue;
    } else {
      set.add(id);
      return id;
    }
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
// addUser() => {...} - Adds data to array
function addUser() {
  usersArr.push({
    uniqueId: generateUniqueId(usersUniqueIds),
    name: createInputName.value,
    surname: createInputSurname.value,
  });
  createInputName.value = "";
  createInputSurname.value = "";
  searchInputName.value = "";
  searchInputSurname.value = "";
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
// renderUserCard(user) => {...} - Adds to the page given information about user "user"
function renderUserCard(user) {
  usersContainer.insertAdjacentHTML(
    "beforeend",
    `<div class="user-card">
        <h3 class="user-card__headline">User card №${user.uniqueId}</h3>
        <h4 class="user-card__name-headline">Name:</h4>
        <span class="user-card__name">${user.name}</span>
        <h4 class="user-card__surname-headline">Surname:</h4>
        <span class="user-card__surname_last user-card__surname">${user.surname}</span>
        <div class="user-card__buttons-wrapper">
          <button class="user-card__edit-btn" id="${user.uniqueId}">Edit user</button>
          <button class="user-card__delete-btn" id="${user.uniqueId}">Delete user</button>
        </div>
      </div>`
  );
}
