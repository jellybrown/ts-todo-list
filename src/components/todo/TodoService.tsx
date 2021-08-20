import { useState, useEffect } from "react";

export type Itodo = {
  id: number;
  text: string;
  date: string;
  done: boolean;
};

let initialTodos: Itodo[] = [];

export const useTodo = () => {
  const [todoState, setTodoState] = useState(initialTodos);
  var nextIdState = 0;

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveData();
  }, [todoState]);

  const incrementNextId = () => {
    nextIdState = nextIdState + 1;
  };

  const toggleTodo = (id: number) => {
    setTodoState((prevState) => {
      return prevState.map((todo: Itodo) => {
        if (todo.id === id) return { ...todo, done: !todo.done };
        else return todo;
      });
    });
  };

  const removeTodo = (id: number) => {
    setTodoState((prevState) =>
      prevState.filter((todo: Itodo) => todo.id !== id)
    );
  };

  const createTodo = (todo: Itodo) => {
    const nextId = todoState.length + 1;
    setTodoState((prevState) =>
      prevState.concat({
        ...todo,
        id: nextId,
      })
    );
  };

  const editTodo = (editedTodo: Itodo) => {
    setTodoState((prevState) =>
      prevState.map((todo: Itodo) => {
        if (todo.id === editedTodo.id) return { ...todo, ...editedTodo };
        else return todo;
      })
    );
  };

  const loadData = () => {
    let data = localStorage.getItem("todos");
    if (data === undefined) data = "";
    initialTodos = data && JSON.parse(data);
    if (initialTodos && initialTodos.length >= 1) {
      incrementNextId();
    }
    setTodoState(initialTodos);
  };

  const saveData = () => {
    localStorage.setItem("todos", JSON.stringify(todoState));
  };

  return {
    todoState,
    nextIdState,
    incrementNextId,
    toggleTodo,
    removeTodo,
    createTodo,
    editTodo,
  };
};
