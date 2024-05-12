export const capitalizeFirstLetter = (str: string) => {
  const capizalized = str.charAt(0).toUpperCase() + str.slice(1);
  return capizalized;
};
