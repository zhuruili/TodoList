import React from 'react';
import { useState } from 'react';
import { nanoid } from 'nanoid';

import Todo from './components/Todo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed, 
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {

  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');
  const taskList = tasks.filter(FILTER_MAP[filter]).map((task)=> (
    <Todo 
    id={task.id} 
    name={task.name} 
    completed={task.completed}
    key={task.id}
    toggleTaskCompleted={toggleTaskCompleted} 
    deleteTask={deleteTask}
    editTask={editTask}
    />
  ));
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton 
    key={name} 
    name={name} 
    isPressed={name === filter}
    setFilter={setFilter}  //这里在第一次写的时候=之前的filter写成了fliter，之后报错说props.setFilter is not a function,这说明它只认识你传入的等号之前的内容
    />
  ));
  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  function addTask(name) {
    const newTask = {
      id:`todo-${nanoid()}`,
      name, 
      completed: false
    };
    setTasks([...tasks, newTask]);
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return {...task, completed: !task.completed}
      }
      // if this task has a different ID, return it as is
      return task;
    });
    setTasks(updatedTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      // 如果和传入id相同则在最后更新name
      if (id === task.id) {
        return {...task, name: newName}
      }
      // 否则返回原task
      return task;
    });
    setTasks(editedTaskList);
  }

  function deleteTask(id) {
    // 如果id与传入的id不等，则保留，否则过滤
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks)
  }

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}

export default App;
