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
    e.preventDefault();

    // Check if task title is empty
    if (!task.title.trim()) {
      alert("Task title can't be empty! 🤷‍♂️");
      return;
    }

    if (editTask) {
      // Edit existing task
      const updatedTodoList = todoList.map((item) =>
        item.id === task.id ? task : item
      );

      setTodoList(updatedTodoList);
      localStorage.setItem("todoList", JSON.stringify(updatedTodoList));
      setEditTask(false);
    } else {
      // Add new task
      const newTodoList = [...todoList, { ...task, id: uuidv4() }];
      setTodoList(newTodoList);
      localStorage.setItem("todoList", JSON.stringify(newTodoList));
    }

    // Reset task form after submission
    setTask(initialTask);
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
    const updatedTodoList = todoList.map((item) =>
      item.id === task.id ? { ...item, status: "Completed" } : item
    );
    setTodoList(updatedTodoList);
    localStorage.setItem("todoList", JSON.stringify(updatedTodoList));
  };

  return (
    <div>
      {/* <TodosHeader /> */}
      <TodosForm
        onSubmit={handleOnSubmit}
        task={task}
        onChange={handleOnTaskChange}
        buttonText={editTask ? "Edit Task" : "Add Task"}
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
