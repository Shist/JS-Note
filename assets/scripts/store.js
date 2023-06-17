"use strict";

// Store

export let notesArr = [];
export let notesUniqueIds = new Set();
export let currUniqueId = 0;

// incrementCurrUniqueId() => {...} - Increments current unique identifier as other *.js files can not do that
export function incrementCurrUniqueId() {
  currUniqueId++;
  localStorage.setItem("currUniqueId", currUniqueId.toString());
}

// loadLocalData() => {...} - Load local data from browser memory and refresh notes list after that
export function loadLocalData() {
  const currUniqueIdFromLocal = localStorage.getItem("currUniqueId");
  if (currUniqueIdFromLocal) {
    currUniqueId = +currUniqueIdFromLocal;
  }
  const notesUniqueIdsArrayFromLocal = JSON.parse(
    localStorage.getItem("uniqueIdsArray")
  );
  if (notesUniqueIdsArrayFromLocal && notesUniqueIdsArrayFromLocal.length) {
    notesUniqueIds = new Set(notesUniqueIdsArrayFromLocal);
    notesUniqueIds.forEach((uniqueId) => {
      const noteDataFromLocal = JSON.parse(
        localStorage.getItem(uniqueId.toString())
      );
      if (noteDataFromLocal) {
        notesArr.push(noteDataFromLocal);
      }
    });
  }
}

// removeNoteItem(uniqueId) => {...} - Removes note item from localStorage by given uniqueId
export function removeNoteItem(uniqueId) {
  localStorage.removeItem(uniqueId.toString());
  updateUniqueIdsArray();
}

// setNoteItem(uniqueId, noteItem) => {...} - Adds (or Changes) given noteItem with given uniqueId to (or in) localStorage
export function setNoteItem(uniqueId, noteItem) {
  localStorage.setItem(uniqueId.toString(), JSON.stringify(noteItem));
  updateUniqueIdsArray();
}

// updateUniqueIdsArray() => {...} - Updates the set of unique identifiers in localStorage
export function updateUniqueIdsArray() {
  localStorage.setItem("uniqueIdsArray", JSON.stringify([...notesUniqueIds]));
}
