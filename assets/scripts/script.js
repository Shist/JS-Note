"use strict";

/// Store
const usersArr = [];

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
  addUser();
  createListPage(usersArr);
});
// Event while clicling on search button
searchBtn.addEventListener("click", () => {
  const foundUsersArr = usersArr.filter(
    (user) =>
      user.name.includes(searchInputName.value) &&
      user.surname.includes(searchInputSurname.value)
  );
  createListPage(foundUsersArr);
});

// Model
// addUser() => {...} - Adds data to array
function addUser() {
  const valueName = createInputName.value;
  const valueSurname = createInputSurname.value;
  usersArr.push({ name: valueName, surname: valueSurname });
  createInputName.value = "";
  createInputSurname.value = "";
  searchInputName.value = "";
  searchInputSurname.value = "";
}
// createListPage(arr) => {...} - loops through the array "arr" and renders the elements on the page
function createListPage(arr) {
  usersContainer.innerHTML = "";
  if (arr.length > 0) {
    arr.forEach((user, index) => {
      renderUserCard(user, index);
    });
  } else {
    usersContainer.innerHTML = `<h3 class="users-container__no-users-text">No any users found...</h3>`;
  }
}
// renderUserCard(user, index) => {...} - Adds to the page given information about user "user" with index "index"
function renderUserCard(user, index) {
  usersContainer.insertAdjacentHTML(
    "beforeend",
    `<div class="user-card">
        <h3 class="user-card__headline">User card №${index + 1}</h3>
        <h4 class="user-card__name-headline">Name:</h4>
        <span class="user-card__name">${user.name}</span>
        <h4 class="user-card__surname-headline">Surname:</h4>
        <span class="user-card__surname_last user-card__surname">${
          user.surname
        }</span>
        <div class="user-card__buttons-wrapper">
          <button class="user-card__edit-btn" id="${index}">Edit user</button>
          <button class="user-card__delete-btn" id="${index}">Delete user</button>
        </div>
      </div>`
  );
}
