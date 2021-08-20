import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import { Itodo } from "components/todo/TodoService";
import useDatePicker from "hooks/useDatePicker";
import { DatePicker } from "antd";
import locale from "antd/es/date-picker/locale/ko_KR";
import { Moment } from "moment";
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

const Content = styled.div<{ done: boolean }>`
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

const DateText = styled.span<{ onClick: any }>`
  position: relative;
  font-size: 13px;
  margin-right: 7px;
  z-index: 3;
  display: inline-block;
  padding: 10px 15px;
  background-color: #fff;
`;

const PickerWrap = styled.div`
  position: absolute;
  right: 10px;
  top: 5px;
`;

const TextWrap = styled.div`
  position: relative;
`;

const DateWrap = styled.div`
  position: relative;
`;

interface TodoItemProps {
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  editTodo: (editedTodo: Itodo) => void;
  openedPickerId: number | null;
  handleClickPicker: (id: number | null) => void;
  todo: Itodo;
}

const TodoItem = ({
  toggleTodo,
  removeTodo,
  editTodo,
  openedPickerId,
  handleClickPicker,
  todo,
}: TodoItemProps) => {
  const [todoText, setTodoText] = useState(todo.text);
  const { momentDate, setMomentDate, date, disabledDate, handlePickDate } =
    useDatePicker();

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

  const handleEditDate = (e: Moment | null) => {
    console.log("handleEditDate");
    handlePickDate(e);
    handleClickPicker(null);
  };

  useEffect(() => {
    if (todoText === todo.text) return;

    editTodo({
      id: todo.id,
      text: todoText,
      date: todo.date,
      done: false,
    });
  }, [todoText]);

  useEffect(() => {
    if (date === "") return;

    editTodo({
      id: todo.id,
      text: todoText,
      date: date,
      done: false,
    });
  }, [date]);

  return (
    <TodoItemBlock>
      <CheckCircle done={todo.done} onClick={handleToggle}>
        {todo.done && <CheckOutlined />}
      </CheckCircle>
      <Content done={todo.done}>
        <TextWrap>
          <EditInput
            disabled={todo.done}
            defaultValue={todoText}
            onChange={(e) => handleChangeInput(e)}
          />
          <Text>{todo.text}</Text>
        </TextWrap>
        <DateWrap>
          <DateText onClick={() => handleClickPicker(todo.id)}>
            {todo.date}
          </DateText>
          <PickerWrap>
            <DatePicker
              value={momentDate}
              open={!todo.done && todo.id === openedPickerId}
              locale={locale}
              disabledDate={disabledDate}
              onChange={(e: Moment | null) => handleEditDate(e)}
              placeholder="목표일"
            />
          </PickerWrap>
        </DateWrap>
      </Content>
      <Remove onClick={handleRemove}>
        <DeleteOutlined />
      </Remove>
    </TodoItemBlock>
  );
};

export default React.memo(TodoItem);
