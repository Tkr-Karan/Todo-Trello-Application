import { addTask, isWhite, darkTheme, lightTheme } from "./utils.js";

export let addNewTask = document.querySelector(".add-btn-icn");
addNewTask.addEventListener("click", addTask);

let themeChange = document.querySelector(".theme");

let myTheme = localStorage.getItem("myTheme");
//theme changer
if (myTheme == "dark") {
  darkTheme();
} else {
  lightTheme();
}
export default themeChange.addEventListener("click", () => {
  if (isWhite) {
    darkTheme();
  } else {
    lightTheme();
  }
});
