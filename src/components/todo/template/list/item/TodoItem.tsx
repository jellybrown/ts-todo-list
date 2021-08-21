import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import { Itodo } from "components/todo/TodoService";
import useDatePicker from "hooks/useDatePicker";
import { DatePicker } from "antd";
import locale from "antd/es/date-picker/locale/ko_KR";
import moment, { Moment } from "moment";
import TodoDday from "../dday/TodoDday";

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #119955;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    transform: scale(1.3);
  }
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

const EditInput = styled.input<{ inputWidth: number | null }>`
  margin: 0;
  padding: 0 5px;
  border: none;
  width: ${({ inputWidth }) => (inputWidth ? `${inputWidth}px` : "auto")};
  position: absolute;
  left: 0;
  top: 0;
  outline: none;
  opacity: 1;
  visibility: visible;
  box-sizing: unset;

  &:disabled {
    opacity: 0;
    visibility: hidden;
  }
`;

const Text = styled.span`
  padding: 0 5px;
`;

const DateText = styled.span<{ onClick: any }>`
  position: relative;
  font-size: 13px;
  margin-right: 7px;
  z-index: 3;
  display: inline-block;
  padding: 10px 15px;
  background-color: #fff;
  cursor: pointer;
`;

const PickerWrap = styled.div`
  position: absolute;
  right: 10px;
  top: 5px;
`;

interface TextWrapProps {
  inputWidth: number | null;
  showUnderLine: boolean;
}

const TextWrap = styled.div<TextWrapProps>`
  position: relative;
  min-width: 5px;
  min-height: 25px;

  &:before {
    content: "";
    position: absolute;
    left: 0;
    bottom: -3px;
    height: 1px;
    width: ${({ inputWidth }) => (inputWidth ? `${inputWidth}px` : "inherit")};
    background-color: #000;
    opacity: ${({ showUnderLine }) => (showUnderLine ? "0.1" : "0")};
  }
`;

const DateWrap = styled.div`
  position: relative;
`;

const CHAR_WIDTH = 14;

const getLength = (string: string): number => {
  let spaceCount = string.split("").filter((char) => char === " ").length;
  return string.replaceAll(" ", "").length + spaceCount / 2 || 0;
};

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
  const [showUnderLine, setShowUnderLine] = useState(false);
  const [inputWidth, setInputWidth] = useState<number | null>(
    getLength(todo.text) * CHAR_WIDTH
  );
  const { date, momentDate, momentString, disabledDate, handlePickDate } =
    useDatePicker();

  const handleToggle = () => {
    toggleTodo(todo.id);
    handleClickPicker(null);
  };

  const handleRemove = () => {
    removeTodo(todo.id);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (todo.done === true) return;

    const length = getLength(e.target.value);
    setInputWidth(length ? length * CHAR_WIDTH : null);
    setTodoText(e.target.value);
  };

  const handleEditDate = (e: Moment | null, string: string) => {
    handlePickDate(e, string);
    handleClickPicker(null);
  };

  useEffect(() => {
    if (todoText === todo.text) return;

    editTodo({
      id: todo.id,
      text: todoText,
      date: todo.date,
      moment: todo.moment,
      done: false,
    });
  }, [todoText]);

  useEffect(() => {
    if (date === "" || !momentDate) return;

    editTodo({
      id: todo.id,
      text: todoText,
      date: date,
      moment: momentDate,
      done: false,
    });
  }, [date, momentDate]);

  return (
    <TodoItemBlock>
      <CheckCircle done={todo.done} onClick={handleToggle}>
        {todo.done && <CheckOutlined />}
      </CheckCircle>
      <Content done={todo.done}>
        <TextWrap inputWidth={inputWidth} showUnderLine={showUnderLine}>
          <EditInput
            inputWidth={inputWidth}
            disabled={todo.done}
            defaultValue={todoText}
            spellCheck={false}
            onFocus={() => setShowUnderLine(true)}
            onBlur={() => setShowUnderLine(false)}
            onChange={(e) => handleChangeInput(e)}
          />
          <Text>{todo.text}</Text>
        </TextWrap>
        <DateWrap>
          <TodoDday
            done={todo.done}
            today={new Date()}
            targetDay={momentDate || todo.moment}
          />
          <DateText onClick={() => handleClickPicker(todo.id)}>
            {todo.date}
          </DateText>
          <PickerWrap>
            <DatePicker
              value={momentString !== "" ? moment(momentString) : null}
              open={!todo.done && todo.id === openedPickerId}
              locale={locale}
              disabledDate={disabledDate}
              onChange={(e: Moment | null, string: string) =>
                handleEditDate(e, string)
              }
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
