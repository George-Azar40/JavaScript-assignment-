// element edit alert
let alertEdit = document.getElementById("confirmEdit");
let confirmOpreationButtonEdit = document.getElementById("confirmOpreationButtonEdit");
let cancelOpreationButtonEdit = document.getElementById("cancelOpreationButtonEdit");
let inputEdit = document.getElementById("alertEditContentInput");
let inputEditNote = document.getElementById("inputEditNote");

//element delet alert
let alert = document.getElementById("confirmOpreation");
let confirmOpreationButton = document.getElementById("confirmOpreationButton");
let cancelOpreationButton = document.getElementById("cancelOpreationButton");

//elemennt add task new
let mainInput = document.getElementById("mainInput");
let addNewTaskButton = document.getElementById("inputButton");
let inputNote = document.getElementById("inputNote");

//add btn (All,Done,ToDo)
let allButton = document.getElementById("all");
let doneButton = document.getElementById("done");
let todoButton = document.getElementById("todo");

//general element (Scroll container,No Task)
let scrollContainerDiv = document.getElementById("scrollContainer");
let noTasksHeader = document.getElementById("noTasksHeader");
let taskArr = document.getElementsByClassName("task");
//btn deleeat
let deleteDoneButton = document.getElementById("deleteDone")
let deleteAllButton = document.getElementById("deleteAll")

//Check if a task exists
const noTasksChecker = ()=>{
    console.log("Inside noTasksChecker");
    let taskCount = document.getElementsByClassName("task");
    if(taskCount.length <= 0){ //number task=0 -->No Task
        noTasksHeader.style.display = "block";
    }
    else{
        noTasksHeader.style.display = "";
    }
}
// delete all
const removeTasksHTML = ()=>{
    let tasks = document.getElementsByClassName("task");
    Array.from(tasks).forEach(task =>{
        task.remove();
    })  
}
//delete ending(task done ==>'t'but task not done ==>'f')
const removeTasksDoneHTML = ()=>{
    let tasks = document.getElementsByClassName("task");
    Array.from(tasks).forEach(task =>{
        if(task.id[1] == 't')
            task.remove();
    })
   }
// change localstorge
// flag ==>0(change) ,==>1(delete)
const storeTaskChange = (task, index, flag)=>{
    let temp = unloadTask();
    console.log("inside storeTaskChange");
    if(temp.length > 0 && task != null ){
        switch(flag){
            case 0:
                temp[index].taskId = task.taskId;
                temp[index].paragraphContent = task.paragraphContent;
            break;
            case 1:
                temp.splice(index, 1);
            break;

            
        }
        localStorage.setItem('tasks', JSON.stringify(temp));
    }
}

//add task to localstor
const storeLocal = (task)=>{

    let localTasks = JSON.parse(localStorage.getItem("tasks")) || [];
// add new task ro arr
    localTasks.push(task);
// save update
 localStorage.setItem("tasks", JSON.stringify(localTasks));
}
// task new
const saveTask = (text)=>{
    mainInput.value = "";
    let task = {
        taskId : Math.floor((Math.random()*5)) + 'f',
        paragraphStatus: "",
        paragraphContent: text
    };

    displayTaskOnAddNew(task);
    noTasksChecker();
    storeLocal(task); 
};



