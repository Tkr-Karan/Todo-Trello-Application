let stageTemplate = document.getElementById("stage-template");
let categoryTemplate = document.getElementById("category-template");

let taskStage = document.querySelector(".task-stage");
let taskCategory = document.querySelector(".task-categories");

let templateData = stageTemplate.content;
let categoryTemplateData = categoryTemplate.content;

let copyTemplateData = document.importNode(templateData, true);
let copyCategoryTemplateData = document.importNode(categoryTemplateData, true);

taskStage.appendChild(copyTemplateData);
taskCategory.appendChild(copyCategoryTemplateData);
