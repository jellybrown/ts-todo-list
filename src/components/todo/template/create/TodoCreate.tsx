import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PlusCircleOutlined } from "@ant-design/icons";
import moment, { Moment } from "moment";
import { DatePicker, Space } from "antd";
import "moment/locale/ko";
import locale from "antd/es/date-picker/locale/ko_KR";
import { Itodo } from "components/todo/TodoService";
import { warning } from "utils/modal";
import useDatePicker from "hooks/useDatePicker";

const CircleButton = styled.button<{ open: boolean }>`
  background: #33bb77;
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  left: 50%;
  transform: translate(50%, 0%);
  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const InsertFormPositioner = styled.div`
  width: 100%;
  border-bottom: 1px solid #eeeeee;
`;

const InsertForm = styled.form`
  display: flex;
  background: #eeeeee;
  padding-left: 40px;
  padding-top: 36px;
  padding-right: 60px;
  padding-bottom: 36px;
`;

const Input = styled.input`
  padding: 12px;
  margin-right: 10px;
  border: 1px solid #dddddd;
  width: 100%;
  outline: none;
  font-size: 21px;
  box-sizing: border-box;
  color: #119955;
  &::placeholder {
    color: #dddddd;
    font-size: 16px;
  }
`;

interface TodoCreateProps {
  nextId: number;
  createTodo: (todo: Itodo) => void;
  incrementNextId: () => void;
}

const TodoCreate = ({
  nextId,
  createTodo,
  incrementNextId,
}: TodoCreateProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState(true);
  const {
    momentDate,
    setMomentDate,
    date,
    setDate,
    momentString,
    setMomentString,
    disabledDate,
    handlePickDate,
  } = useDatePicker();

  const handleToggle = () => setOpen(!open);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  useEffect(() => {
    if (value.length < 1 || date.length < 1) setError(true);
    else setError(false);
  }, [value, date]);

  const openWarning = () => {
    if (value.length < 1) return warning("????????? ??????????????????.");
    if (!momentDate) return warning("?????? ????????? ??????????????????.");
  };

  const submitTodo = () => {
    if (!momentDate) return;

    createTodo({
      id: nextId,
      text: value,
      date,
      moment: momentDate,
      done: false,
    });
    incrementNextId(); // nextId ?????? ??????

    setValue(""); // input ?????????
    setMomentDate(null);
    setDate("");
    setMomentString("");
    setOpen(false); // open ??????
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // ???????????? ??????

    if (error) openWarning();
    else submitTodo();
  };

  return (
    <>
      <InsertFormPositioner>
        <InsertForm onSubmit={handleSubmit}>
          <Input
            autoFocus
            placeholder="?????? ??? ?????? ??????????"
            onChange={handleChange}
            value={value}
          />
          <Space direction="horizontal">
            <DatePicker
              value={momentString !== "" ? moment(momentString) : null}
              locale={locale}
              disabledDate={disabledDate}
              onChange={(e: Moment | null, string: string) =>
                handlePickDate(e, string)
              }
              placeholder="?????????"
            />
          </Space>
          <CircleButton onClick={handleToggle} open={open}>
            <PlusCircleOutlined />
          </CircleButton>
        </InsertForm>
      </InsertFormPositioner>
    </>
  );
};

export default React.memo(TodoCreate);
