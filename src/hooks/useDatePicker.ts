import React, { useState } from "react";
import { Moment } from "moment";

const useDatePicker = () => {
  const [momentDate, setMomentDate] = useState<number | null>(null);
  const [date, setDate] = useState("");
  const [momentString, setMomentString] = useState<string>("");

  const disabledDate = (current: any) => {
    return current.valueOf() < Date.now() - ONE_DAY;
  };

  const handlePickDate = (e: Moment | null, string: string) => {
    if (!e || !string) return;
    setMomentDate(e.toDate().getTime());
    setMomentString(string);
    setDate(e.format("MM월 DD일"));
  };

  return {
    momentDate,
    setMomentDate,
    date,
    setDate,
    momentString,
    setMomentString,
    disabledDate,
    handlePickDate,
  };
};

export default useDatePicker;

export const ONE_DAY = 1000 * 60 * 60 * 24;
