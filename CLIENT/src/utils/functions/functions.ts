export const capitalizeFirstLetter = (str: string) => {
  const capizalized = str.charAt(0).toUpperCase() + str.slice(1);
  return capizalized;
};

export const getHourFromDate = (dateTimeString: string): string => {
  const dateObj = new Date(dateTimeString);
  const timeString = dateObj.toTimeString().slice(0, 5);
  return timeString;
};

export const formatDate = (date: string, n1: number, n2: number) => {
  return date.slice(n1, n2);
};
