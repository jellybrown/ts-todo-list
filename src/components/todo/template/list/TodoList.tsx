import { Itodo } from "components/todo/TodoService";
import React, { useState } from "react";
import styled from "styled-components";
import TodoItem from "./item/TodoItem";

const TodoListBlock = styled.div<{ onClick: any }>`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

interface TodoListProps {
  todos: Itodo[];
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  editTodo: (editedTodo: Itodo) => void;
}

const TodoList = ({
  toggleTodo,
  removeTodo,
  editTodo,
  todos,
}: TodoListProps) => {
  const [openedPickerId, setOpenedPickerId] = useState<number | null>(null);

  const closePicker = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    setOpenedPickerId(null);
  };

  const handleClickPicker = (id: number | null) => {
    if (openedPickerId === id) setOpenedPickerId(null);
    else setOpenedPickerId(id);
  };

  return (
    <TodoListBlock onClick={closePicker}>
      {todos &&
        todos.map((todo) => (
          <TodoItem
            toggleTodo={toggleTodo}
            removeTodo={removeTodo}
            editTodo={editTodo}
            openedPickerId={openedPickerId}
            handleClickPicker={handleClickPicker}
            key={todo.id}
            todo={todo}
          />
        ))}
    </TodoListBlock>
  );
};

export default React.memo(TodoList);
