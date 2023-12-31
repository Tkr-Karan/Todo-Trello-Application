let stageTypes = ["all", "working", "pending", "completed"];
let isDeleted = false;

export default function taskFromLocalStorage(isDeleted) {
  for (let i = 0; i < stageTypes.length; i++) {
    const stageKey = stageTypes[i].trim();

    if (localStorage.getItem(stageKey)) {
      const taskObj = JSON.parse(localStorage.getItem(stageKey));

      for (let j = 0; j < taskObj.length; j++) {
        let task = taskObj[j];

        createCard(task, stageKey, isDeleted);
      }
    }
  }
  //   console.log("local storage called");
}

//create the task card
let showCard = document.querySelector(".open-card");
export function createCard(taskData, stageKey) {
  let createTask = document.createElement("div");
  createTask.setAttribute("class", "card-data task");
  createTask.setAttribute("draggable", "true");
  createTask.innerHTML = `<div class="task-details">
      <h4>${taskData.taskName}</h4>
      <p > details: <span class="task-card-desc">${taskData.taskDescription}</span> </p>
      <p >status: <span class="task-status"> ${taskData.taskStatus} </span>  </p>
      <p style="display: hidden" class="task-created"> ${taskData.taskCreatedAt} </p>
      <p class="task-updated"> ${taskData.taskUpdatedAt} </p>
    </div>
    <div class="task-action">
    <button class="edit-action" id="edit-btn">Edit <i class="fa-solid fa-pencil"></i></button>
        <div class="remove-action" >Remove <i class="fa-solid fa-xmark"></i></div>
    </div>`;

  // add the task card to its task state
  if (taskData.taskStatus === stageKey && !isDeleted)
    document.querySelector(`.category.${stageKey}`).append(createTask);

  createTask.addEventListener("dragstart", () => {
    // console.log(task.classList)

    createTask.classList.add("is-dragging");
  });
  createTask.addEventListener("dragend", () => {
    createTask.classList.remove("is-dragging");
  });

  //deleting the task
  const deleteIcon = createTask.querySelector(".remove-action");
  deleteIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    isDeleted = true;

    let localTaskStatus = createTask.querySelector(".task-status");

    // let localTaskData = localStorage.getItem(localTaskStatus);
    // console.log(localTaskData);

    if (window.confirm("you wanna delete this 🧐")) {
      const parentElement = createTask.parentElement;
      parentElement.removeChild(createTask);
      //   const taskId = taskData.taskID;
      // deleteTask(taskId);
      // console.log(localTaskStatus);

      removeFromLocalStorage(taskData, localTaskStatus);
      showCard.style.display = "none";
    }
  });

  // editing the task
  let isEditable = true;
  let edit = createTask.querySelector(".edit-action");
  edit.addEventListener("click", (e) => {
    e.stopPropagation();

    const taskDetails = createTask.querySelector(".task-details");
    let saveIcon = edit.querySelector(".fa-pencil");
    const cardDescription = taskDetails.querySelector(".task-card-desc");

    cardDescription.addEventListener("click", (e) => {
      isCardOpen = false;
    });
    //updating local storage when we are editing
    function updateLocalStorage() {
      const existingTasks =
        JSON.parse(localStorage.getItem(taskData.taskStatus.trim())) || [];

      for (let i = 0; i < existingTasks.length; i++) {
        if (existingTasks[i].taskID === taskData.taskID) {
          existingTasks[i].taskDescription = cardDescription.textContent;
          break;
        }
      }

      localStorage.setItem(
        taskData.taskStatus.trim(),
        JSON.stringify(existingTasks)
      );
    }

    if (isEditable) {
      cardDescription.contentEditable = true;
      cardDescription.focus();
      cardDescription.style.cursor = "text";
      cardDescription.style.outline = "none";

      cardDescription.addEventListener("keydown", (e) => {
        if (Number(e.target.textContent.length) > 14) {
          cardDescription.blur();
        }
        // if(Number(e.target.textContent.length) == 14 ){
        //   cardDescription.contentEditable = true
        // }
        // if (e.target.value.length >= 10) {
        // }
      });

      let editBtn = createTask.querySelector("#edit-btn");
      editBtn.disabled = true;
      isEditable = false;
    }

    let debounceFxn = debounce(updateLocalStorage, 3000);
    cardDescription.addEventListener("keydown", debounceFxn);

    // debounce function updatin the data
    function debounce(updateLocalStorage, delay) {
      let timer;

      return function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
          updateLocalStorage();
          edit.disabled = false;
          isEditable = true;
          cardDescription.blur();
          cardDescription.contentEditable = false;
          cardDescription.style.cursor = "pointer";
        }, delay);
      };
    }
  });
  let cardData = {
    name: taskData.taskName,
    description: taskData.taskDescription,
    createdAt: taskData.taskCreatedAt,
    status: taskData.taskStatus,
    updateAt: taskData.updateAt,
  };

  let taskHeading = document.querySelector(".task-heading");
  let taskDescription = document.querySelector(".task-description");
  let taskCreatedAt = document.querySelector(".created-at");
  let cardUpdatedAt = createTask.querySelector(".task-updated");

  let taskUpdatedTime = document.querySelector(".updated-at");

  let isCardOpen = true;
  createTask.addEventListener("click", (e) => {
    e.stopPropagation();
    // console.log(taskUpdatedAt, "efef");
    let cardTaskName = cardData.name;
    let cardDescription = cardData.description;

    let closeCard = document.querySelector(".card-close");
    closeCard.addEventListener("click", () => {
      showCard.style.display = "none";
      isCardOpen = true;
    });

    // console.log("update", cardData.updateAt);
    if (isCardOpen) {
      // console.log(showlocal[i].tasUpdatedAt);
      showCard.classList.add("show-open-card");
      showCard.style.display = "flex";
      isCardOpen = false;
      taskHeading.textContent = cardTaskName;
      taskDescription.textContent = cardDescription;
      taskCreatedAt.textContent = cardData.createdAt;
      // taskUpdatedTime.textContent = cardData;
    } else {
      showCard.classList.remove("show-open-card");
      showCard.style.display = "none";
      isCardOpen = true;
    }
  });
}

//remving data from the local storage
function removeFromLocalStorage(taskData, status) {
  const existingTasks =
    JSON.parse(localStorage.getItem(status.textContent.trim())) || [];

  const updatedTasks = existingTasks.filter(
    (task) => task.taskName !== taskData.taskName
  );
  localStorage.setItem(status.textContent.trim(), JSON.stringify(updatedTasks));
}

let body = document.body;
let slide = document.querySelector(".slider");
let slider = document.querySelector(".slider-container");
export let isWhite = true;
// them changing
export function darkTheme() {
  body.style.transition = "all .5s ease-in";
  body.style.backgroundColor = "#202020	";
  body.style.color = "#EEEEEE";
  slide.style.transition = "all .5s ease-in";
  slide.style.transform = "translateX(200%)";
  slide.style.backgroundColor = "#202020";
  slider.style.transition = "all .5s ease-in";
  slider.style.backgroundColor = "white";
  taskContainer.style.color = "black";
  showCard.style.color = "black";

  isWhite = false;

  localStorage.setItem("myTheme", "dark");
}

//light theme
export function lightTheme() {
  body.style.transition = "all .5s ease-in";
  body.style.backgroundColor = "#EEEEEE";
  body.style.color = "black";
  slide.style.transition = "all .5s ease-in";
  slide.style.transform = "translateX(0%)";
  slide.style.backgroundColor = "white";
  slider.style.transition = "all .5s ease-in";
  slider.style.backgroundColor = "black";
  isWhite = true;
  localStorage.setItem("myTheme", "light");
}

export let taskContainer = document.querySelector(".task-cont");
let isAddTaskOpen = true;
// add task funtion that help us for showing the task container or toggling
export function addTask() {
  let closeForm = document.querySelector(".close");

  closeForm.addEventListener("click", () => {
    taskContainer.style.display = "none";
    isAddTaskOpen = true;
  });
  if (isAddTaskOpen) {
    taskContainer.style.display = "flex";
    isAddTaskOpen = false;
  } else {
    taskContainer.style.display = "none";
    isAddTaskOpen = true;
  }
}

let formData = document.querySelector(".task-form");
export let taskCategory = "all";
// form data store
formData.addEventListener("submit", function (e) {
  e.preventDefault();

  // creating form details
  let formDetails = {
    // taskID: Date.now(),
    taskName: e.target[0].value,
    taskDescription: e.target[1].value,
    taskStatus: taskCategory.trim(),
    taskCreatedAt: new Date().toLocaleString(),
    taskUpdatedAt: "not updated yet",
  };
  ``;
  //   console.log(taskCategory);

  //make input to the initial state
  e.target[0].value = "";
  e.target[1].value = "";


  // adding the donr data in the local storage
  let existingTasks;
  existingTasks = JSON.parse(localStorage.getItem(taskCategory.trim())) || [];
  existingTasks = [...existingTasks, formDetails];

  if (!localStorage.getItem(taskCategory.trim())) {
    localStorage.setItem(taskCategory.trim(), JSON.stringify(existingTasks));
  } else {
    localStorage.setItem(taskCategory.trim(), JSON.stringify(existingTasks));
  }

  //   console.log(formDetails);

  taskContainer.style.display = "none";
  isAddTaskOpen = true;

  createCard(formDetails, formDetails.taskStatus);
});

// selecting the category and changing it 
let selectCategory = document.querySelectorAll(".task-stage div");
for (let i = 0; i < selectCategory.length; i++) {
  selectCategory[i].addEventListener("click", (e) => {
    // Remove "selected-task" class from previously selected elements
    let previouslySelected = document.querySelector(".selected-task");
    if (previouslySelected) {
      previouslySelected.classList.remove("selected-task");
    }
    selectCategory[i].classList.add("selected-task");

    // Add "selected-task" class to the clicked element
    taskCategory = selectCategory[i].classList[1];
  });
}
