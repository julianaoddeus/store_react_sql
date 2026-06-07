export const getFinalDate = (initialDate: Date, months: number) => {
  const date = new Date(initialDate);
  date.setMonth(date.getMonth() + months);
  return date;
};
