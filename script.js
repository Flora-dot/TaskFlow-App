const themeBtn = document.getElementById("theme-btn"); //Theme Button
const themeList = document.getElementById("theme-list");
const nameInput = document.getElementById("nameInput");

const priorityList = document.getElementById("priority-list");
const togglePriorityListBtn = document.getElementById('toggle-list-btn')
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const priorityInput = document.getElementById("priority-input");
const searchInput = document.getElementById("search-input");

// Initialize tasks array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

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
document.getElementById('add-new-task-btn').addEventListener('click', setAddTaskModal)




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
  event.stopPropagation(); 
  priorityList.classList.toggle("show");
}
togglePriorityListBtn.addEventListener('click', togglePriorityList);



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
    event.stopPropagation(); 
    const selectedOption = event.currentTarget;
    const priority = selectedOption.dataset.priority;
    priorityInput.value = priority;
    togglePriorityList();
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

// Add event listener to filter toggle button
document.getElementById('filter-btn').addEventListener('click', toggleFilterDropDown);



// Function to save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}



// Function to create and return a single task item
function createTaskItem(task, index) {
   const taskItem = document.createElement("li");
   const sanitizedPriority = task.priority
       .toLowerCase()
       .replace(/\s+/g, "-");

   taskItem.classList.add("task-item", `priority-${sanitizedPriority}`);
   taskItem.className = "task-item";

   if (task.completed) taskItem.classList.add("completed");

   // Get priority class based on task priority
   let priorityClass = '';
   switch(task.priority) {
       case 'High Priority':
           priorityClass = 'high-priority';
           break;
       case 'Medium Priority':
           priorityClass = 'medium-priority';
           break;
       case 'Low Priority':
           priorityClass = 'low-priority';
           break;
   }

   taskItem.innerHTML = `
      <div class="task-group"> <input type="checkbox" class="complete-checkbox" ${
           task.completed ? "checked" : ""
       } />
       <p class="task-title">${task.name}</p>
       </div> 
       <div class="task-group">
       <span class="priority ${priorityClass}" id="priority">${task.priority} <svg
           xmlns="http://www.w3.org/2000/svg"
           width="20"
           height="20"
           fill="#000000"
           viewBox="0 0 256 256"
           >
           <path
               d="M42.76,50A8,8,0,0,0,40,56V224a8,8,0,0,0,16,0V179.77c26.79-21.16,49.87-9.75,76.45,3.41,16.4,8.11,34.06,16.85,53,16.85,13.93,0,28.54-4.75,43.82-18a8,8,0,0,0,2.76-6V56A8,8,0,0,0,218.76,50c-28,24.23-51.72,12.49-79.21-1.12C111.07,34.76,78.78,18.79,42.76,50ZM216,172.25c-26.79,21.16-49.87,9.74-76.45-3.41-25-12.35-52.81-26.13-83.55-8.4V59.79c26.79-21.16,49.87-9.75,76.45,3.4,25,12.35,52.82,26.13,83.55,8.4Z"
           ></path>
           </svg>
       </span>
       <button class="delete-btn">Delete</button>
       </div>
   `;

   // Mark task as completed
   taskItem
       .querySelector(".complete-checkbox")
       .addEventListener("change", () => {
           tasks[index].completed = !tasks[index].completed;
           saveTasks();
           renderTasks();
       });

   // Delete task
   taskItem.querySelector(".delete-btn").addEventListener("click", () => {
       tasks.splice(index, 1);
       saveTasks();
       renderTasks();
   });

   return taskItem;
}



// Function to render the entire task list
function renderTasks() {
   const taskContainer = document.getElementById("task-container");
   const taskList = document.getElementById("task-list");
   const emptyStateContainer = document.getElementById("empty-task-wrapper");

   // Check if there are any tasks to display
   if (tasks.length === 0) {
       emptyStateContainer.style.display = "block";
       taskContainer.style.display = "none";
   } else {
       taskContainer.style.display = "block";
       emptyStateContainer.style.display = "none";

       // Clear existing tasks before rendering new ones
       taskList.innerHTML = "";

       // Loop through the tasks and create task items
       tasks.forEach((task, index) => {
           const taskItem = createTaskItem(task, index);
           taskList.appendChild(taskItem);
       });
   }
}



// Add a new task
function addTask() {
  const taskName = taskInput.value.trim();
  const priority = priorityInput.value;

  if (taskName !== '') {
    tasks.push({ name: taskName, priority, completed: false });
    saveTasks();
    closeTaskModal();
    renderTasks();
    taskInput.value = "";
  } else {
   alert('Please enter a task to continue')
  }
}
document.getElementById('add-task-btn').addEventListener('click', addTask)



// Get selected priority
function getSelectedPriority() {
  const priorityFilterElements = document.querySelectorAll(".priority-item");

  priorityFilterElements.forEach(element => {
    // Add a click event listener to each element
    element.addEventListener("click", () => {
      priorityFilterElements.forEach(el => el.classList.remove("filter-active"));
      element.classList.add("filter-active");

      // Use a data attribute to get the value
      const priorityValue = element.dataset.priority; 
      alert (priorityValue);
    });
  });
}




function applyPriorityFilter() {
  const selectedPriority = getSelectedPriority();
  const emptyStateContainer = document.getElementById("empty-task-wrapper");
  const taskItems = document.querySelectorAll(".task-item"); 

  let hasVisibleTasks = false;

  tasks.forEach((task, index, array) => {
    const taskItem = taskItems[index];

    if (selectedPriority === "All" || task.priority === selectedPriority) {
      taskItem.style.display = "flex";
      hasVisibleTasks = true; 
    } else {
      taskItem.style.display = "none";
    }
  });

  // Handle empty state visibility
  if (hasVisibleTasks) {
    emptyStateContainer.style.display = "none"; 
  } else {
    emptyStateContainer.style.display = "block";
  }
}






// Search Functionality
searchInput.addEventListener("input", function () {
   const searchText = searchInput.value.toLowerCase(); 
 
   // Loop through all tasks and filter based on the search text
   const taskItems = document.querySelectorAll("#task-container .task-item");
   tasks.forEach((task, index) => {
     const taskName = task.name.toLowerCase(); 
 
     if (taskName.includes(searchText)) {
       taskItems[index].style.display = "Flex";
     } else {
       taskItems[index].style.display = "none"; 
     }
   });
 });
 



// Initial render
renderTasks();
