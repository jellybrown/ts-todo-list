import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import { Itodo } from "components/todo/TodoService";
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #119955;
  font-size: 16px;
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      display: initial;
    }
  }
`;

const CheckCircle = styled.div<{ done: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 16px;
  border: 1px solid #33bb77;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${(props) =>
    props.done &&
    css`
      border: 1px solid #dddddd;
      color: #dddddd;
    `}
`;

const TextBox = styled.div<{ done: boolean }>`
  flex: 1;
  font-size: 16px;
  color: #119955;
  ${(props) =>
    props.done &&
    css`
      color: #ced4da;
      text-decoration: line-through;
    `}
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const EditInput = styled.input`
  margin: 0;
  padding: 0;
  border: none;
  position: absolute;
  left: 0;
  outline: none;
  opacity: 1;
  visibility: visible;

  &:disabled {
    opacity: 0;
    visibility: hidden;
  }
`;

const Text = styled.span``;

const DateText = styled.span`
  font-size: 13px;
  margin-right: 15px;
`;

interface TodoItemProps {
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  editTodo: (editedTodo: Itodo) => void;
  todo: Itodo;
}

const TodoItem = ({
  toggleTodo,
  removeTodo,
  editTodo,
  todo,
}: TodoItemProps) => {
  const [todoText, setTodoText] = useState(todo.text);

  const handleToggle = () => {
    toggleTodo(todo.id);
  };

  const handleRemove = () => {
    removeTodo(todo.id);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (todo.done === true) return;
    setTodoText(e.target.value);
  };

  useEffect(() => {
    if (todo.done === true) return;

    editTodo({
      id: todo.id,
      text: todoText,
      date: todo.date,
      done: false,
    });
  }, [todoText]);

  return (
    <TodoItemBlock>
      <CheckCircle done={todo.done} onClick={handleToggle}>
        {todo.done && <CheckOutlined />}
      </CheckCircle>
      <TextBox done={todo.done}>
        <EditInput
          disabled={todo.done}
          defaultValue={todoText}
          onChange={(e) => handleChangeInput(e)}
        />
        <Text>{todo.text}</Text>
        <DateText>{todo.date}</DateText>
      </TextBox>
      <Remove onClick={handleRemove}>
        <DeleteOutlined />
      </Remove>
    </TodoItemBlock>
  );
};

export default React.memo(TodoItem);
