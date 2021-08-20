import useTime from "hooks/useTime";
import React from "react";
import styled from "styled-components";

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
  font-size: 26px;
  color: #119955;
  padding-left: 10px;
`;

const DayText = styled.div`
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
  //@TODO 현재 시간을 표시해야합니다.
  const dayString = "Tuesday";
  const dateString = "July 20, 2021";

  return (
    <TodoHeadBlock>
      <DayText>
        {dayString} {dateString}
      </DayText>
      {/* <DateText></DateText> */}
      <TimeText>{time}</TimeText>
    </TodoHeadBlock>
  );
};

export default React.memo(TodoHead);
