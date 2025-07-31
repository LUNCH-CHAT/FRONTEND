export const formatDate = (input: Date | string | number) => {
  const date = new Date(input);

  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월 (0~11)
  const day = String(date.getDate()).padStart(2, '0'); // 일
  const hours = String(date.getHours()).padStart(2, '0'); // 시
  const minutes = String(date.getMinutes()).padStart(2, '0'); // 분

  return { year, month, day, hours, minutes };
};

export const getDayOfWeek = (input: Date | string | number) => {
  const week = ['일', '월', '화', '수', '목', '금', '토'];

  const dayOfWeek = week[new Date(input).getDay()];

  return dayOfWeek;
};
