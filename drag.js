// draggable and droppables variable
const draggables = document.querySelectorAll(".task");
const droppables = document.querySelectorAll(".swin-lane");
const taskStatusData = document.querySelectorAll(".task-status");

// draggables card
draggables.forEach((task) => {
  task.addEventListener("dragstart", () => {
    task.classList.add("is-dragging");
  });
  task.addEventListener("dragend", () => {
    task.classList.remove("is-dragging");
  });
});

// dropping
droppables.forEach((zone) => {
  let draggingCardData = null;
  zone.addEventListener("dragover", (e) => {
    e.preventDefault();
    const draggingData = document.querySelector(".is-dragging");

    // getting the dragging card data
    draggingCardData = {
      taskDescription:
        draggingData.querySelector(".task-card-desc").textContent,
      taskName: draggingData.querySelector("h4").textContent,
      taskStatus: draggingData.querySelector(".task-status").textContent.trim(),
    };
    // console.log(draggingCardData);

    const bottomTask = insertAboveTask(zone, e.clientY);
    const curTask = document.querySelector(".is-dragging");

    //i f card is not present in the zone or category then directly append the new card in the zone otherwise insert before the previous card
    if (!bottomTask) {
      zone.appendChild(curTask);
    } else {
      zone.insertBefore(curTask, bottomTask);
    }
  });

  // checking zone where to drop
  zone.addEventListener("drop", (e) => {
    const curTask = document.querySelector(".is-dragging");
    const newStatus = zone.getAttribute("id").replace("_", "");

    // Update the card's status in the card data
    const cardDetails = curTask.querySelector(".task-details");
    const taskStatus = cardDetails.querySelector(".task-status");
    taskStatus.innerHTML = `<span> ${newStatus} </span>`;

    // storing dropped card data
    let currDraggingCardData = {
      taskDescription: curTask.querySelector(".task-card-desc").textContent,
      taskName: curTask.querySelector("h4").textContent,
      taskStatus: curTask.querySelector(".task-status").textContent.trim(),
      taskCreatedAt: curTask.querySelector(".task-created").textContent.trim(),
      taskUpdatedAt: new Date().toLocaleString(),
    };

    // updating in  the local stoarage with the updated time
    const updatedTaskTime = cardDetails.querySelector(".task-updated");
    updatedTaskTime.textContent = currDraggingCardData.taskUpdatedAt;

    const drggingCategory = currDraggingCardData.taskStatus.trim();

    let existData = JSON.parse(localStorage.getItem(drggingCategory)) || [];
    existData = [...existData, currDraggingCardData];

    let removeTask = currDraggingCardData.taskName;
    if (!localStorage.getItem(drggingCategory)) {
      localStorage.setItem(drggingCategory, JSON.stringify(existData));
    } else {
      localStorage.setItem(drggingCategory, JSON.stringify(existData));
    }

    let prevExistData = JSON.parse(
      localStorage.getItem(draggingCardData.taskStatus.trim())
    );

    // console.log(removeTask);

    prevExistData = prevExistData.filter((val) => val.taskName !== removeTask);

    // console.log("prev", prevExistData);

    localStorage.setItem(
      draggingCardData.taskStatus.trim(),
      JSON.stringify(prevExistData)
    );

    curTask.classList.remove("is-dragging");
  });
});

// checking before insert
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
