export const getStringByDate = (dateConstructor: Date): string => {
  const year = dateConstructor.getFullYear();
  const month = dateConstructor.getMonth();
  const date = dateConstructor.getDate();
  const day = dateConstructor.getDay();

  return `${year}년 ${month}월 ${date}일 ${DAY_KO[day]}`;
};

const DAY_KO = [
  "월요일",
  "화요일",
  "수요일",
  "목요일",
  "금요일",
  "토요일",
  "일요일",
];
