export const capitalizeFirstLetter = (str: string) => {
  const capizalized = str.charAt(0).toUpperCase() + str.slice(1);
  return capizalized;
};

export const formatDate = (date: string, n1: number, n2: number) => {
  return date.slice(n1, n2);
};
