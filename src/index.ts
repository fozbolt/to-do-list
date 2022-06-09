import * as methods from './methods.js';

type Task = {
  id: number
  title: string
  completed: boolean
  createdAt: Date
}

//todo elements
const list = document.querySelector<HTMLUListElement>("#list")
const form = document.getElementById("new-task-form") as HTMLFormElement | null
const input = document.querySelector<HTMLInputElement>("#new-task-title")

//done elements
const listDone = document.querySelector<HTMLUListElement>("#done-list")



let todoTasks: Task[] = methods.loadTasks('TODO-TASKS')
todoTasks.forEach(addListItem)

let doneTasks: Task[] = methods.loadTasks('DONE-TASKS')
doneTasks.forEach(addListItem)


form?.addEventListener("submit", e => {
  e.preventDefault()

  if (input?.value == "" || input?.value == null) return

  const newTask: Task = {
    id: Date.now(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  }
  todoTasks.push(newTask)
  methods.saveTasks(todoTasks, 'TODO-TASKS')

  addListItem(newTask)
  input.value = ""
})



function addListItem(task: Task) {

  const item = document.createElement("li")
  const label = document.createElement("label")
  const checkbox = document.createElement("input")
  const deleteOneButton =  document.createElement("button");

  const doneList = document.getElementById("done-list") as HTMLDivElement
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked
    if (task.completed == true){
      doneList.appendChild(label);

      //localstorage - remove from to-do and insert in done 
      todoTasks = todoTasks.filter(t => t.id !== task.id);
      doneTasks.push(task);
      methods.saveTasks(doneTasks, 'DONE-TASKS');
    }
    else{
      list?.appendChild(label);

      //localstorage - reverse process
      doneTasks = doneTasks.filter(t => t.id !== task.id);
      todoTasks.push(task);
      methods.saveTasks(doneTasks, 'DONE-TASKS');
    }

    methods.saveTasks(todoTasks, 'TODO-TASKS')
  })


  checkbox.type = "checkbox"
  checkbox.checked = task.completed
  let delationProcess= false;

  deleteOneButton.setAttribute("type", "button");
  deleteOneButton.setAttribute("id", "deleteButton");
  deleteOneButton.appendChild(document.createTextNode(" -- "));
  
  deleteOneButton.addEventListener("click", () =>{
    if (checkbox.checked) methods.deleteOne(item,task.id, doneTasks, 'DONE-TASKS');
    else methods.deleteOne(item,task.id, todoTasks, 'TODO-TASKS');
    delationProcess = true;
  })

  label.append(checkbox, task.title, deleteOneButton)
  item.append(label)

  // checked = done
  if (checkbox.checked && !delationProcess) listDone?.append(item)
  else if (!checkbox.checked && !delationProcess) list?.append(item)
  

}



/* redundant code ahead */

//TO-DO bind delete all and show input buttons to html
let deleteAllBtnTodo = document.getElementById("left") as HTMLButtonElement;
deleteAllBtnTodo.addEventListener("click", () =>{methods.deleteAll('TODO-TASKS')});

let addOneTodo = document.getElementById("right") as HTMLButtonElement;
addOneTodo.addEventListener("click", () =>{methods.showInput('new-task-form')});


//DONE bind delete all and show input buttons to html
let deleteAllBtnDone = document.getElementById("left-done") as HTMLButtonElement;
deleteAllBtnDone.addEventListener("click", () =>{methods.deleteAll('DONE-TASKS')});

let addOneDone = document.getElementById("right-done") as HTMLButtonElement;
addOneDone.addEventListener("click", () =>{methods.showInput('done-task-form')});

