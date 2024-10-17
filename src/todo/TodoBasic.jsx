import React, { useEffect, useState } from "react";
import TodosHeader from "./TodosHeader";
import TodosFooter from "./TodosFooter";
import TodosForm from "./TodosForm";
import TodosList from "./TodosList";
import { v4 as uuidv4 } from "uuid";
const Todos = () => {
  const initialTask = {
    title: "",
    description: "",
    id: uuidv4(),
    status: "todo",
  };
  const [task, setTask] = useState(initialTask);
  const [editTask, setEditTask] = useState(false);
  const [todoList, setTodoList] = useState([]);

  const handleOnTaskChange = (e) => {
    const { value } = e.target;

    setTask({ ...task, title: value });
  };

  const handleOnSubmit = (e) => {
    if (!task.title.trim()) {
      alert("Task title can't be empty! 🤷‍♂️");
      return;
    }
    e.preventDefault();
    const newTodoList = [...todoList, task];
    setTodoList(newTodoList);
    localStorage.setItem("todoList", JSON.stringify(newTodoList));
    
    setTask(initialTask);

    if (editTask) {
      setEditTask(false);
      const filteredItems = todoList.slice();
      const indexOfList = todoList.findIndex((item) => item.id === task.id);
      filteredItems[indexOfList] = task;
      setTodoList(filteredItems);
      localStorage.setItem("todoList", JSON.stringify(filteredItems));
      setEditTask(false);
    }
  };

  useEffect(() => {
    const todoListLS = localStorage.getItem("todoList");
    if (todoListLS) {
      const todoListLSArr = JSON.parse(todoListLS);
      setTodoList(todoListLSArr);
    }
  }, []);

  const handleOnDelete = (item) => {
    const filteredItems = todoList.filter((task) => task.id !== item.id);
    setTodoList(filteredItems);
    localStorage.setItem("todoList", JSON.stringify(filteredItems));
  };

  const handleOnEdit = (item) => {
    setEditTask(true);
    setTask(item);
  };

  const handleOnComplete = (task) => {
    const filteredItems = todoList.slice();
    const indexOfList = todoList.findIndex((item) => item.id === task.id);
    filteredItems[indexOfList] = { ...task, status: "Completed " };
    setTodoList(filteredItems);
    localStorage.setItem("todoList", JSON.stringify(filteredItems));
  };

  return (
    <div>
      {/* <TodosHeader /> */}

      <TodosForm
        onSubmit={handleOnSubmit}
        task={task}
        onChange={handleOnTaskChange}
      />
      <TodosList
        list={todoList}
        onDelete={handleOnDelete}
        onEdit={handleOnEdit}
        onComplete={handleOnComplete}
      />
      {/* <TodosFooter /> */}
    </div>
  );
};

export default Todos;
