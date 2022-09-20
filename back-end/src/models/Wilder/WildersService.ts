// Fonction de select random dans un tableau
const randomInArray = (array: any) => {
  let randomKey = (Math.random() * array.length) | 0;
  let returnedValue = array[randomKey];
  return returnedValue;
};

export { randomInArray };
