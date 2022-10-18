// Fonction de select random dans un tableau
export const randomInArray = (array: any) => {
  const randomKey = (Math.random() * array.length) | 0;

  return array[randomKey];
};
