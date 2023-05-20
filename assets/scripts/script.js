"use strict";

/// Store
const userNameArr = [];

// controller
const usersContainer = document.querySelector(".users-container");
const createInputName = document.querySelector("#create-name");
const createInputSurname = document.querySelector("#create-surname");
const createBtn = document.querySelector(".global-container__create-btn");
const searchInputName = document.querySelector("#search-name");
const searchInputSurname = document.querySelector("#search-surname");
const searchBtn = document.querySelector(".global-container__search-btn");
const formContainer = document.querySelector(".edit-form-wrapper");
const form = document.querySelector(".edit-form");
const closeBtn = document.querySelector(".edit-form__close-btn");
const editInputName = document.querySelector("#edit-name");
const editInputSurname = document.querySelector("#edit-surname");
const confirmBtn = document.querySelector(".edit-form__confirm-btn");
