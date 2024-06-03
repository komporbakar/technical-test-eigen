export const convertDate = (date: Date, day?: any) => {
  let dateObj = new Date(date);

  dateObj.setDate(dateObj.getDate() + day ?? 0);

  let newDateStr = dateObj.toISOString();

  return newDateStr;
};
