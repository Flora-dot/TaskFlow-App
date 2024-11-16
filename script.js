const themeBtn = document.getElementById("theme-btn"); //Theme Button
const themeList = document.getElementById("theme-list");
const nameInput = document.getElementById("nameInput");

const priorityList = document.getElementById("priority-list");

// Show themes list
function setThemeList() {
  if (themeList.style.display === "none") {
    themeList.style.display = "flex";
    console.log("worked");
  } else {
    themeList.style.display = "none";
  }
}

themeBtn.addEventListener("click", setThemeList);

// switch to light theme
function toggleLightTheme() {
  document.body.classList.add("light-theme");
  themeList.style.display = "none";
  loadFromLocalStorage.setItem("light-theme", theme);
}
document.getElementById("light").addEventListener("click", toggleLightTheme);

// switch to darktheme
function toggleDarkTheme() {
  document.body.classList.remove("light-theme");
  themeList.style.display = "none";
  loadFromLocalStorage.setItem("dark-theme", theme);
}

document.getElementById("dark").addEventListener("click", toggleDarkTheme);

// Get user name
function getUserName() {
  if (nameInput.value != "") {
    let username = nameInput.value;
    localStorage.setItem("username", username);
    console.log(username);

    nameInput.value = "";
    window.location.href = "./task.html";
  } else {
    alert("Please enter your name to proceed");
  }
}

// Update and set username
function setUserName() {
  const username = localStorage.getItem("username"); // Retrieve from localStorage

  if (username) {
    document.getElementById("greeting").innerText = `Hi ${username}👋`;
  } else {
    console.log("Username not found");
  }
}

document.addEventListener("DOMContentLoaded", setUserName);
window.addEventListener("load", setUserName);


// set add task container/ show modal
function setAddTaskModal() {
  const modalWrapper = document.getElementById("modal-wrapper");
  console.log("Modal shown");
  modalWrapper.style.display =
    modalWrapper.style.display === "none" ? "flex" : "none";
}

// close modal/add task container
function closeTaskModal() {
  const modalWrapper = document.getElementById("modal-wrapper");

  modalWrapper.style.display =
    modalWrapper.style.display === "flex" ? "none" : "flex";
}

// Toggle priority list dropdown
function togglePriorityList() {
  console.log("priority List SHown");
  priorityList.classList.toggle("show");
}

// Close the dropdown when clicking outside of it
document.addEventListener("click", (event) => {
  const isClickInsideWrapper = event.target.closest(".priority-wrapper");
  const isClickInsideList = event.target.closest("#priority-list");

  // If the click is outside both, close the dropdown
  if (!isClickInsideWrapper && !isClickInsideList) {
    const priorityList = document.getElementById("priority-list");
    priorityList.classList.remove("show");
  }
});

// set Priority
function setTaskPriority() {}
