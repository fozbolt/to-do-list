
type Task = {
  id: number
  title: string
  completed: boolean
  createdAt: Date
}

//kada definiramo određeni tip elementa, to omogućava da dobijemo sve propertye, metode iz tih elemenata
const list = document.querySelector<HTMLUListElement>("#list")
const form = document.getElementById("new-task-form") as HTMLFormElement | null
const input = document.querySelector<HTMLInputElement>("#new-task-title")

const todoTasks: Task[] = loadTasks()
todoTasks.forEach(addListItem)

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
  saveTasks()

  addListItem(newTask)
  input.value = ""
})

function addListItem(task: Task) {
  const item = document.createElement("li")
  const label = document.createElement("label")
  const checkbox = document.createElement("input")
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked
    saveTasks()
  })
  checkbox.type = "checkbox"
  checkbox.checked = task.completed
  label.append(checkbox, task.title)
  item.append(label)
  list?.append(item)
}

function saveTasks() {
  localStorage.setItem("TODO-TASKS", JSON.stringify(todoTasks))
}

function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem("TODO-TASKS")
  if (taskJSON == null) return []
  return JSON.parse(taskJSON)
}



function addToDone() {
  localStorage.setItem("DONE-TASKS", JSON.stringify(todoTasks))
}