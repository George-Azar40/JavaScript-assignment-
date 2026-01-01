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




addNewTaskButton.onclick = ()=>
{
    let text = mainInput.value;
    
    if(checkInpt(text))
    {
        addNewTask(text);
        inputNote.style.display = "";
    }
    else
    {
        inputNote.style.display = "block";
        setTimeout(()=>{inputNote.style.display = ""}, 10000)
    }
        
}



allButton.onclick = ()=>
{
    allButton.classList.add("hoverEffect");
    doneButton.classList.remove("hoverEffect")
    todoButton.classList.remove("hoverEffect")
   
    if(taskArr.length >=1)
    {
        for(let task of taskArr)
        {
            task.style.display = "";
        }
    }
    
    

};


doneButton.onclick = ()=>
{
    doneButton.classList.add("hoverEffect")
    allButton.classList.remove("hoverEffect")
    todoButton.classList.remove("hoverEffect")


    if(taskArr.length >=1)
    {
        for(let task of taskArr)
        {
            if(task.id[1] === 't')
                task.style.display = "";
            else
                task.style.display = "none";
        }
    }


};



todoButton.onclick = ()=>
{
    todoButton.classList.add("hoverEffect")
    allButton.classList.remove("hoverEffect")
    doneButton.classList.remove("hoverEffect")

    if(taskArr.length >= 1)
    {
        for(let task of taskArr)
        {
            if(task.id[1] === 'f')
                task.style.display = "";
            else
                task.style.display = "none";
        }
    }
        
        

};

deleteDoneButton.onclick = async ()=>
{
    
    const unloadedTasks = unloadTask();

    if(unloadedTasks.length >= 1)
    {
        let flag =  await confirmOpreation();     

        if(flag)
        {
              
            unloadedTasks.forEach((task, index)=>{
                if(task.taskId[1] === 't' )
                {
                    storeTaskChange(task, index, 1);
                   
                }

                removeTasksDoneHTML();
                noTasksChecker();
            })
                
            
        }
    }
     
    
};


deleteAllButton.onclick = async ()=>
{
    const unloadedTasks = unloadTask();
    
    if(unloadedTasks.length >= 1)
    {
        let flag =await confirmOpreation();

        if(flag){
            localStorage.removeItem("tasks");
            displayTasks();
            removeTasksHTML();
            noTasksChecker();
        }
           
        
    }
    
        
    
};


scrollContainerDiv.addEventListener("click", async (event)=>{
    if(event.target.alt === "deleteIcon"){
        const taskToDelete = event.target.closest(".task");
        if(taskToDelete){
            unloadedTasks = unloadTask();
            if(unloadedTasks.length > 0){
                let foundTask = unloadedTasks.find(task => taskToDelete.id === task.taskId);
               
                if(foundTask){
                    let foundTaskIndex = unloadedTasks.indexOf(foundTask);
                 
                    storeTaskChange(unloadedTasks[foundTaskIndex], foundTaskIndex, 1);
                    taskToDelete.remove();
                    noTasksChecker();
                }             
            }        
        }
    }

    if(event.target.alt === "pencilIcon" ){
        let flag = await confirmOpreationEdit();
        if(flag[0] === "1"){

           
            const taskToEdit = event.target.closest(".task");
            const paragraphToEdit  = taskToEdit.querySelector("p");
            paragraphToEdit.textContent = flag[1];

            if(taskToEdit){
                unloadedTasks = unloadTask();
                
                
    
                if(unloadedTasks.length > 0){
                    let foundTask = unloadedTasks.find(task => taskToEdit.id === task.taskId);
                    
                    if(foundTask){
                        let foundTaskIndex = unloadedTasks.indexOf(foundTask);
                        

                        unloadedTasks[foundTaskIndex].paragraphContent = flag[1];
                        storeTaskChange(unloadedTasks[foundTaskIndex], foundTaskIndex, 0);
                        
                    }       
                }       
            }
        }
       
    }
    if(event.target.type ==="checkbox" && (event.target.checked || !event.target.checked) ){
       

        const taskToDone = event.target.closest(".task");
        const paragraphToEdit  = taskToDone.querySelector("p");

        if(taskToDone){
            unloadedTasks = unloadTask();
         

            if(unloadedTasks.length > 0){
                let foundTask = unloadedTasks.find(task => taskToDone.id === task.taskId);
           
                if(foundTask){
   
                    if(taskToDone.id[1] === 'f'){
            
                        taskToDone.id = taskToDone.id[0] + 't' + taskToDone.id[1].slice(2);
                       
                    }
                    else if (taskToDone.id[1] === 't') {
                        taskToDone.id = taskToDone.id[0] + 'f' + taskToDone.id[1].slice(2);
                   
                    }


                    let foundTaskIndex = unloadedTasks.indexOf(foundTask);
                  
                    unloadedTasks[foundTaskIndex].taskId = taskToDone.id;

                    storeTaskChange(unloadedTasks[foundTaskIndex], foundTaskIndex, 0);
                    paragraphToEdit.classList.toggle("taskParagraphCrossed");
                }
                    
            }
                
        }
         
    }

   


});

window.onload = ()=>{
    
    allButton.classList.add("hoverEffect");
    displayTasks();
    noTasksChecker();
}











const input = document.getElementById("mainInput");
const addBtn = document.getElementById("inputButton");
const listContainer = document.getElementById("scrollContainer");
const deleteDoneBtn = document.getElementById("deleteDone");
const deleteAllBtn = document.getElementById("deleteAll");

const alertBox = document.querySelector(".alert");
const editInput = document.getElementById("alertEditContentInput");
const confirmEdit = document.getElementById("confirmOpreationButtonEdit");
const cancelEdit = document.getElementById("cancelOpreationButtonEdit");

let tasks = [];
let currentEditId = null;

addBtn.onclick = () => {
  const text = input.value.trim();
  if (text.length < 5 || !isNaN(text[0])) return;

  tasks.push({
    id: Date.now(),
    text,
    done: false
  });

  input.value = "";
  renderTasks();
};

function renderTasks(filter = "all") {
  listContainer.innerHTML = "";

  let filteredTasks = tasks;
  if (filter === "done") filteredTasks = tasks.filter(t => t.done);
  if (filter === "todo") filteredTasks = tasks.filter(t => !t.done);

  if (filteredTasks.length === 0) {
    listContainer.innerHTML = `<h3 id="noTasksHeader">NO TASKS!</h3>`;
    return;
  }

  filteredTasks.forEach(task => {
    const div = document.createElement("div");
    div.className = "task";

    div.innerHTML = `
      <span style="${task.done ? 'text-decoration:line-through' : ''}">
        ${task.text}
      </span>
      <div>
        <input type="checkbox" ${task.done ? "checked" : ""}>
        <button class="edit">✏️</button>
        <button class="delete">🗑️</button>
      </div>
    `;

    div.querySelector("input").onchange = () => {
      task.done = !task.done;
      renderTasks();
    };

    div.querySelector(".delete").onclick = () => {
      tasks = tasks.filter(t => t.id !== task.id);
      renderTasks();
    };

    div.querySelector(".edit").onclick = () => {
      currentEditId = task.id;
      editInput.value = task.text;
      alertBox.style.display = "block";
    };

    listContainer.appendChild(div);
  });
}

confirmEdit.onclick = () => {
  const newText = editInput.value.trim();
  if (newText.length < 5 || !isNaN(newText[0])) return;

  const task = tasks.find(t => t.id === currentEditId);
  task.text = newText;

  alertBox.style.display = "none";
  renderTasks();
};

cancelEdit.onclick = () => {
  alertBox.style.display = "none";
};

deleteDoneBtn.onclick = () => {
  tasks = tasks.filter(t => !t.done);
  renderTasks();
};

deleteAllBtn.onclick = () => {
  tasks = [];
  renderTasks();
};

document.getElementById("all").onclick = () => renderTasks("all");
document.getElementById("done").onclick = () => renderTasks("done");
document.getElementById("todo").onclick = () => renderTasks("todo");
