import React, { useReducer, useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';
import { addTaskAC, removeTaskAC, tasksReducer } from './reducers/tasksReducer';
import { changeFilterAC, filterReducer } from './reducers/filterReducer';

export type FilterValuesType = "all" | "active" | "completed";
// type todolistsType = { id: string, title: string, filter: FilterValuesType }

function App() {

    let [tasks, dispatchTasks] = useReducer(tasksReducer, [
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Rest API", isDone: false },
        { id: v1(), title: "GraphQL", isDone: false },
    ]);


    function removeTask(id: string) {
        dispatchTasks(removeTaskAC(id))
        // let filteredTasks = tasks.filter(t => t.id != id);
        // setTasks(filteredTasks);
    }

    function addTask(title: string) {
        dispatchTasks(addTaskAC(title))
        // let task = { id: v1(), title: title, isDone: false };
        // let newTasks = [task, ...tasks];
        // setTasks(newTasks);
    }

    function changeStatus(taskId: string, isDone: boolean) {
        // let task = tasks.find(t => t.id === taskId);
        // if (task) {
        //     task.isDone = isDone;
        // }

        // setTasks([...tasks]);
    }

    let [filter, dispatchFilter] = useReducer(filterReducer, "all");
    // let [filter, setFilter] = useState<FilterValuesType>("all");

    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }

    function changeFilter(value: FilterValuesType) {
        dispatchFilter(changeFilterAC(value));
    }


    // let [todolists, setTodolists] = useState<Array<todolistsType>>([
    //     { id: v1(), title: 'What to learn', filter: 'all' },
    //     { id: v1(), title: 'What to buy', filter: 'all' },
    // ])


    return (
        <div className="App">
            <Todolist
                title='What to learn'
                // title={title}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;
