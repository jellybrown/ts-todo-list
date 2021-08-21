import React, { useState } from "react";
import { Moment } from "moment";

const useDatePicker = () => {
  const [momentDate, setMomentDate] = useState<Moment | null>(null);
  const [date, setDate] = useState("");

  const disabledDate = (current: any) => {
    return current.valueOf() < Date.now() - ONE_DAY;
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

export const ONE_DAY = 1000 * 60 * 60 * 24;
