// draggable and droppables variable
const draggables = document.querySelectorAll(".task");
const droppables = document.querySelectorAll(".swin-lane");
const taskStatusData = document.querySelectorAll(".task-status");

draggables.forEach((task) => {
  task.addEventListener("dragstart", () => {
    task.classList.add("is-dragging");
  });
  task.addEventListener("dragend", () => {
    task.classList.remove("is-dragging");
  });
});

droppables.forEach((zone) => {
  let draggingCardData = null;
  zone.addEventListener("dragover", (e) => {
    e.preventDefault();
    const draggingData = document.querySelector(".is-dragging");

    draggingCardData = {
      taskDescription:
        draggingData.querySelector(".task-card-desc").textContent,
      taskID: 1697170875150,
      taskName: draggingData.querySelector("h4").textContent,
      taskStatus: draggingData.querySelector(".task-status").textContent.trim(),
    };
    // console.log(draggingCardData);

    const bottomTask = insertAboveTask(zone, e.clientY);
    const curTask = document.querySelector(".is-dragging");

    if (!bottomTask) {
      zone.appendChild(curTask);
    } else {
      zone.insertBefore(curTask, bottomTask);
    }
  });

  zone.addEventListener("drop", (e) => {
    const curTask = document.querySelector(".is-dragging");
    const newStatus = zone.getAttribute("id").replace("_", "");

    // Update the card's status in the card data
    const cardDetails = curTask.querySelector(".task-details");
    const taskStatus = cardDetails.querySelector(".task-status");
    taskStatus.innerHTML = `<span> ${newStatus} </span>`;

    let currDraggingCardData = {
      taskDescription: curTask.querySelector(".task-card-desc").textContent,
      taskID: 1697170875150,
      taskName: curTask.querySelector("h4").textContent,
      taskStatus: curTask.querySelector(".task-status").textContent.trim(),
    };

    // console.log("dropped", draggingCardData.taskID);

    const drggingCategory = currDraggingCardData.taskStatus.trim();

    let existData = JSON.parse(localStorage.getItem(drggingCategory)) || [];
    existData = [...existData, currDraggingCardData];

    let removeTaskId = draggingCardData.taskID;
    if (!localStorage.getItem(drggingCategory)) {
      localStorage.setItem(drggingCategory, JSON.stringify(existData));
    } else {
      localStorage.setItem(drggingCategory, JSON.stringify(existData));
    }

    console.log(draggingCardData.taskID);

    let prevExistData = JSON.parse(
      localStorage.getItem(draggingCardData.taskStatus.trim())
    );

    console.log(prevExistData);

    prevExistData = prevExistData.filter((val) => val.taskID !== removeTaskId);

    localStorage.setItem(
      draggingCardData.taskStatus.trim(),
      JSON.stringify(prevExistData)
    );

    if (newStatus == "pending")
      cardDetails.parentElement.style.backgroundColor = "lightGreen";
    if (newStatus == "all") {
      cardDetails.parentElement.style.backgroundColor = "lightBlue";
    }
    if (newStatus == "working") {
      cardDetails.parentElement.style.backgroundColor = "lightGrey";
    }
    if (newStatus == "completed") {
      cardDetails.parentElement.style.backgroundColor = "#CC66FF";
    }

    // Clear the dragging class
    curTask.classList.remove("is-dragging");
  });
});

const insertAboveTask = (zone, mouseY) => {
  const els = zone.querySelectorAll(".task:not(.is-dragging)");

  let closestTask = null;
  let closestOffset = Number.NEGATIVE_INFINITY;

  els.forEach((task) => {
    const { top } = task.getBoundingClientRect();

    const offset = mouseY - top;

    if (offset < 0 && offset > closestOffset) {
      closestOffset = offset;
      closestTask = task;
    }
  });

  return closestTask;
};
