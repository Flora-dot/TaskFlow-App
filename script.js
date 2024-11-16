const themeBtn = document.getElementById("theme-btn"); //Theme Button
const themeList = document.getElementById("theme-list");
const nameInput = document.getElementById("nameInput");

const priorityList = document.getElementById("priority-list");
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const priorityInput = document.getElementById('priority-input')
const searchInput = document.getElementById('search-input');


// Initialize tasks array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Load from localstorage
function loadFromLocalStorage() {}

// Show themes list
function setThemeList(event) {
  event.stopPropagation();
  if (themeList.style.display === "none") {
    themeList.style.display = "flex";
    console.log("worked");
  } else {
    themeList.style.display = "none";
  }
}

themeBtn.addEventListener("click", setThemeList);

// Switch to light theme
function toggleLightTheme() {
  document.body.classList.add("light-theme");
  document.body.classList.remove("dark-theme");
  themeList.style.display = "none";
  localStorage.setItem("theme", "light-theme"); // Use consistent key and value
}

// Switch to dark theme
function toggleDarkTheme() {
  document.body.classList.add("dark-theme");
  document.body.classList.remove("light-theme");
  themeList.style.display = "none";
  localStorage.setItem("theme", "dark-theme"); // Use consistent key and value
}

// Set theme on page load
function setTheme() {
  const theme = localStorage.getItem("theme"); // Retrieve the theme
  if (theme) {
    //   document.body.classList.remove("light-theme", "dark-theme");
    document.body.classList.add(theme); // Apply the stored theme
  }
}

window.onload = function () {
  setTheme(); // Set the theme when the page loads
};

// Event listeners for switching themes
document.getElementById("light").addEventListener("click", toggleLightTheme);
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

// set add task container/ show modal
function setAddTaskModal(event) {
  if (event) {
    event.stopPropagation();
  }
  const modalWrapper = document.getElementById("modal-wrapper");
  console.log("Modal shown");
  modalWrapper.style.display =
    modalWrapper.style.display === "none" ? "flex" : "none";
}

// close modal/add task container
function closeTaskModal(event) {
  if (event) {
    event.stopPropagation();
  }
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
document.addEventListener("DOMContentLoaded", function () {
  const priorityInput = document.getElementById("priority-input");
  const priorityOptions = document.querySelectorAll(".priority-item");

  function handlePrioritySelect(event) {
    const selectedOption = event.currentTarget;
    const priority = selectedOption.dataset.priority;
    priorityInput.value = priority;
    togglePriorityList();
    console.log("works fine");
  }



  // Add click event listeners to all priority options
  priorityOptions.forEach((item) => {
    item.addEventListener("click", handlePrioritySelect);
  });
});



// toggle filter dropdown
function toggleFilterDropDown() {
  document.getElementById("filter-dropdown").style.display =
    document.getElementById("filter-dropdown").style.display === "none"
      ? "flex"
      : "none";
}



// Function to save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}



/// Function to render tasks
function renderTasks(filteredTasks = tasks) {
   const taskContainer = document.getElementById('task-container'); 
   const taskList = document.getElementById('task-list')
   const emptyStateContainer = document.getElementById('empty-task-wrapper');
   
   // Check if there are any tasks to display
   if (filteredTasks.length === 0) {
     emptyStateContainer.style.display = 'block';
     taskContainer.style.display = 'none'
   } else {

     taskContainer.style.display = 'block';
     emptyStateContainer.style.display = 'none';
     
         // Clear existing tasks before rendering new ones
         taskList.innerHTML = '';

     // Loop through the tasks and create task items
     filteredTasks.forEach((task, index) => {
       const taskItem = document.createElement('li');
       const sanitizedPriority = task.priority.toLowerCase().replace(/\s+/g, '-');
   
       taskItem.classList.add('task-item', `priority-${sanitizedPriority}`);
       taskItem.className = 'task-item'
   
       if (task.completed) taskItem.classList.add('completed');
   
       taskItem.innerHTML = `
         <input type="checkbox" class="complete-checkbox" ${task.completed ? 'checked' : ''} />
         <p class="task-title">${task.name}</p>
         <span class="priority">${task.priority}</span>
         <button class="delete-btn">Delete</button>
       `;
   
       // Mark task as completed
       taskItem.querySelector('.complete-checkbox').addEventListener('change', () => {
         tasks[index].completed = !tasks[index].completed;
         saveTasks();
         renderTasks(); 
       });
   
       // Delete task
       taskItem.querySelector('.delete-btn').addEventListener('click', () => {
         tasks.splice(index, 1); 
         saveTasks();  
         renderTasks();
       });
   
       // Append task item to the task container
       taskList.appendChild(taskItem);
     });
   }
 }
 
 


// Add a new task
function addTask() {
  const taskName = taskInput.value.trim();
  const priority = priorityInput.value;

  if (taskName) {
    tasks.push({ name: taskName, priority, completed: false });
    saveTasks();
    closeTaskModal();
    renderTasks();
    taskInput.value = '';
  }
}

// Initial render
renderTasks();