import useTime from "hooks/useTime";
import React from "react";
import styled from "styled-components";
import { getStringByDate } from "utils/getStringByDate";

const TodoHeadBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 32px;
  padding-bottom: 24px;
  border-bottom: 3px solid #33bb77;
`;

const DateText = styled.div`
  font-size: 20px;
  color: #119955;
  padding-top: 5px;
`;

const TimeText = styled.div`
  font-size: 13px;
  color: #119955;
`;

const TodoHead = () => {
  const [time] = useTime();
  const dateString = getStringByDate(new Date());

  return (
    <TodoHeadBlock>
      <DateText>{dateString}</DateText>
      <TimeText>{time}</TimeText>
    </TodoHeadBlock>
  );
};

export default React.memo(TodoHead);
