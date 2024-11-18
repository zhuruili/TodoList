import React from "react";
import { useState } from "react";


function Form(props) {

    //定义name状态变量，初始值为"Learn React"，而setName函数用于更新name的值
    const [name, setName] = useState(""); 

    function handleChange(event) {
      setName(event.target.value);
    }
    
    function handleSubmit(event) {
      event.preventDefault();
      props.addTask(name);
      setName("");
    }

    return (
        <form onSubmit={handleSubmit}>
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            What needs to be done?
          </label>
        </h2>
        <input 
        type="text" 
        id="new-todo-input" 
        className="input input__lg" 
        name="text" 
        autoComplete="off" 
        value={name} 
        onChange={handleChange}
        />
        <button type="submit" className="btn btn__primary btn__lg">Add</button>
        </form>
    );
}

export default Form;