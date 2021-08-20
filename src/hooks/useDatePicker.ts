import React, { useState } from "react";
import { Moment } from "moment";

const useDatePicker = () => {
  const [momentDate, setMomentDate] = useState<Moment | null>(null);
  const [date, setDate] = useState("");

  const disabledDate = (current: any) => {
    const oneDay = 1000 * 60 * 60 * 24;
    return current.valueOf() < Date.now() - oneDay;
  };

  const handlePickDate = (e: Moment | null) => {
    if (!e) return;
    setMomentDate(e);
    setDate(e.format("MM월 DD일"));
  };

  return {
    momentDate,
    setMomentDate,
    date,
    setDate,
    disabledDate,
    handlePickDate,
  };
};

export default useDatePicker;
