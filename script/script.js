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
// load task
const unloadTask = ()=>{

    const tasks = localStorage.getItem("tasks");
    const unloadedTasks = tasks ? JSON.parse(tasks) : [];  
    return unloadedTasks;
}
// check text
const checkInpt = (textTT)=>{
    const check = /^(?!\d)/;
    
    if( textTT.length > 5 && check.test(textTT)){
        
        return true;
    }
    else{
        return false;
    }
     
};
// edit (promise)
const confirmOpreationEdit = ()=>{
    let flag = [];
    flag[0] = "0";
    inputEdit.value= "";
    alertEdit.style.display = "flex";

    return new Promise((resolve, reject) =>{

        confirmOpreationButtonEdit.addEventListener("click", ()=>{
            if(checkInpt(inputEdit.value)){
                flag[0] = "1";
                flag[1] = inputEdit.value;
                alertEdit.style.display = "none";
                resolve(flag);
            }
            else{
                inputEditNote.style.display = "block";
                setTimeout(()=>{
                    inputEditNote.style.display = "none";
        
                }, 3000);
            }
                
        })
        cancelOpreationButtonEdit.addEventListener("click", ()=>{
            alertEdit.style.display = "none";
            resolve(flag);
        })
 
    })

};
// add confirm Opreation 
const confirmOpreation = ()=>{

    let flag = false;
    alert.style.display = "flex";
    return new Promise((resolve, reject)=>{
       
        confirmOpreationButton.addEventListener("click", ()=>{
           
            alert.style.display = "none";
            flag = true;
            resolve(flag);
        }),

        cancelOpreationButton.addEventListener("click", ()=>{
           
            alert.style.display = "none";
            resolve(flag =false);
    
        })
            });
        };

//add new task
const addNewTask = (text)=>
{   
    saveTask(text);   
}

// display task when added 
const displayTaskOnAddNew = (task)=>{
    //  creating the task element
    let newTask = document.createElement("div");

    newTask.classList  = "task";
    newTask.id = task.taskId;
// creating elemnt p
let tempParagraph = document.createElement("p");
    tempParagraph.textContent = task.paragraphContent;
// creating div(icons)
    let iconDiv = document.createElement("div");
    iconDiv.classList = "icons";

    let tempCheckbox = document.createElement("input");
    tempCheckbox.type = "checkbox";

    let tempImg1 = document.createElement("img");
    tempImg1.src = "assets/icones/pencil-solid.svg"
    tempImg1.alt = "pencilIcon";

    let tempImg2 = document.createElement("img")
    tempImg2.src = "assets/icones/trash-solid.svg";
    tempImg2.alt = "deleteIcon";
//added element (icondiv )
    iconDiv.append(tempCheckbox);
    iconDiv.append(tempImg1)
    iconDiv.append(tempImg2)

    newTask.append(tempParagraph);
    newTask.append(iconDiv);

    scrollContainerDiv.append(newTask);

}

const displayTasks = ()=>{
   
    const unloadedTasks = unloadTask();

    
    
    if(unloadedTasks.length > 0){
        unloadedTasks.forEach(task =>{
//  creating the new div
            let newTask = document.createElement("div");

            newTask.classList  = "task";
            newTask.id = task.taskId;

 // creating elemnt p           
            let tempParagraph = document.createElement("p");
            tempParagraph.textContent = task.paragraphContent;
            if(task.taskId[1] === 't')
                tempParagraph.classList = "taskParagraphCrossed";
           

// creating div(icons)
            let iconDiv = document.createElement("div");
            iconDiv.classList = "icons";

            let tempCheckbox = document.createElement("input");
            tempCheckbox.type = "checkbox";
            if(task.taskId[1] === 't')
                tempCheckbox.checked = true;

            let tempImg1 = document.createElement("img");
            tempImg1.src = "assets/icones/pencil-solid.svg"
            tempImg1.alt = "pencilIcon";

            let tempImg2 = document.createElement("img")
            tempImg2.src = "assets/icones/trash-solid.svg";
            tempImg2.alt = "deleteIcon";

            
            iconDiv.append(tempCheckbox);
            iconDiv.append(tempImg1)
            iconDiv.append(tempImg2)

            
            newTask.append(tempParagraph);
            newTask.append(iconDiv);
            
            scrollContainerDiv.append(newTask);

        })
    }
    console.log("This is inside display tasks and these are the tasks :")
    console.log(unloadedTasks);
      
}



