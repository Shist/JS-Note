"use strict";

/// Store
const userNameArr = [];

// controller
const createBtn = document.querySelector(".global-container__create-btn");
const searchBtn = document.querySelector(".global-container__search-btn");
const usersContainer = document.querySelector(".users-container");
const rightContainer = document.querySelector(
  ".head-container__right-column-container"
);
const formContainer = document.querySelector(".main-container__form");
const form = document.querySelector(".info-form");
const inputName = document.querySelector(".input-name");
const inputSurname = document.querySelector(".input-surname");
const inputSearchName = document.querySelector(".input-search-name");
const inputSearchSurname = document.querySelector(".input-search-surname");
const closeBtn = document.querySelector(".main-container__form-close-btn");
let currElementId = -1;
createBtn.addEventListener("click", () => {
  addUserName();
  CreateListPage(userNameArr, leftContainer);
});
searchBtnName.addEventListener("click", () => {
  const foundUsersArr = userNameArr.filter(
    (user) => user.name === inputSearchName.value
  );
  CreateListPage(foundUsersArr, rightContainer);
});
searchBtnSurname.addEventListener("click", () => {
  const foundUsersArr = userNameArr.filter(
    (user) => user.surname === inputSearchSurname.value
  );
  CreateListPage(foundUsersArr, rightContainer);
});
const closeModalWindow = () => {
  formContainer.classList.remove("appeared-flex");
  formContainer.classList.add("hidden-element");
};
leftContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    userNameArr.splice(event.target.id, 1);
    CreateListPage(userNameArr, leftContainer);
    if (currElementId === +event.target.id) {
      closeModalWindow();
    }
    if (currElementId > event.target.id) {
      currElementId--; // Если наш текущий id (id того элемента, форма с которым отображается справа) больше, чем id
      // удаляемого элемента, то мы уменьшаем его на единицу
    }
  }
  if (event.target.classList.contains("edit-btn")) {
    currElementId = +event.target.id;
    formContainer.classList.add("appeared-flex");
    inputName.value = userNameArr[currElementId].name;
    inputSurname.value = userNameArr[currElementId].surname;
  }
});
closeBtn.addEventListener("click", closeModalWindow);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  userNameArr[currElementId].name = inputName.value;
  userNameArr[currElementId].surname = inputSurname.value;
  CreateListPage(userNameArr, leftContainer);
});
