type Task = {
    id: number
    title: string
    completed: boolean
    createdAt: Date
  }

export function saveTasks(todoTasks: Task[], key: string) {
    localStorage.setItem(key, JSON.stringify(todoTasks))
  }
  
  
export function loadTasks(key: string): Task[] {
    const taskJSON = localStorage.getItem(key)
    if (taskJSON == null) return []
    return JSON.parse(taskJSON)
  }

  
  
  
export  function addToDone(todoTasks: Task[]) {
    localStorage.setItem("DONE-TASKS", JSON.stringify(todoTasks))
  }
  
  
export  function deleteOne(item: HTMLLIElement, taskID: number, todoTasks: Task[], key: string){
    item.remove();
    console.log(key)
    const filtered = todoTasks.filter(task => task.id !== taskID);
    console.log(todoTasks)
    localStorage.setItem(key, JSON.stringify(filtered));
    //bad practice
    location.reload();
  }
  
  
export  function showInput(key:string) {
    var x = document.getElementById(key) as HTMLFormElement;
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
  
  
export  function deleteAll(key:string){
    localStorage.removeItem(key) 
    location.reload()
  }