import { useEffect, useState } from "react";

type Timer = NodeJS.Timeout | null;

const useTime = () => {
  const [time, setTime] = useState<string | null>(null);
  let timerInfo: Timer = null;

  const getCurrentTime = (): string => {
    const date = new Date();
    const dateString = date.toLocaleTimeString("ko-KR");

    return dateString;
  };

  useEffect(() => {
    timerInfo = setTimeout(() => setTime(getCurrentTime), 1000);

    return () => {
      if (!timerInfo) return;
      clearTimeout(timerInfo);
    };
  });
  return [time];
};

export default useTime;
