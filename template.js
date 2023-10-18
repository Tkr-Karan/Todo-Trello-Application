// task form template
let formTemplate = document.getElementById("form-template");
let taskForm = document.querySelector(".task-form");
let formTemplateData = formTemplate.content.cloneNode(true);
taskForm.appendChild(formTemplateData);

// task stage template
let stageTemplate = document.getElementById("stage-template");
let taskStage = document.querySelector(".task-stage");
let templateData = stageTemplate.content;
let copyTemplateData = document.importNode(templateData, true);
taskStage.appendChild(copyTemplateData);

// task cateogry template
let categoryTemplate = document.getElementById("category-template");
let taskCategory = document.querySelector(".task-categories");
let categoryTemplateData = categoryTemplate.content;
let copyCategoryTemplateData = document.importNode(categoryTemplateData, true);
taskCategory.appendChild(copyCategoryTemplateData);
