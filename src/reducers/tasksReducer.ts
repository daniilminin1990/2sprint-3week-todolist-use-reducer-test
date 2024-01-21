import { v1 } from "uuid";
import { TaskType } from "../Todolist"

export const tasksReducer = (state: TaskType[], action: TasksReducerType ): TaskType[]=> {
  switch (action.type) {
    case "REMOVE-TASK": {
        // let filteredTasks = tasks.filter(t => t.id != id);
        // setTasks(filteredTasks);
      return state.filter(el => el.id!==action.payload.id)
    }
    case "ADD=TASK": {
      let newTask = { id: v1(), title: action.payload.title, isDone: false };
      // let task = { id: v1(), title: title, isDone: false };
      // let newTasks = [task, ...tasks];
      // setTasks(newTasks);
      return [...state, newTask]
    }
    default: return state
  }
}

type TasksReducerType = RemoveTaskACType | AddTaskACType

type RemoveTaskACType = ReturnType <typeof removeTaskAC>
export const removeTaskAC = (id: string) => {
  return {
    type: 'REMOVE-TASK',
    payload: {
      id
    }
  } as const
}

type AddTaskACType = ReturnType <typeof addTaskAC>
export const addTaskAC = (title: string) => {
  return {
    type: "ADD=TASK",
    payload: {
      title
    }
  } as const 
}