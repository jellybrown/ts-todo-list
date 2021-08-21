import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Moment } from "moment";
import { ONE_DAY } from "hooks/useDatePicker";

interface DdayProps {
  done: Readonly<boolean>;
  dayLength: Readonly<number>;
}

const Dday = styled.span<DdayProps>`
  position: absolute;
  left: ${({ dayLength }) => (dayLength === 2 ? "-34px" : "-28px")};
  top: 50%;
  transform: translateY(-50%);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 11px;
  background-color: #fbcb64;
  z-index: 20;
  color: #fff;
  opacity: ${({ done }) => (done ? "0" : "1")};
`;

interface TodoDdayProps {
  done: boolean;
  today: Date;
  targetDay: Moment;
}

const TodoDday = ({ done, today, targetDay }: TodoDdayProps) => {
  const [dDay, setDday] = useState<null | number>(null);

  useEffect(() => {
    const dayValue = targetDay.toDate().getTime() - today.getTime();
    const restDay = Math.abs(Math.ceil(dayValue / ONE_DAY));

    setDday(restDay);
  }, [today, targetDay]);

  return (
    <Dday done={done} dayLength={dDay && dDay > 9 ? 2 : 1}>
      D-{dDay}
    </Dday>
  );
};

export default TodoDday;
