import Wilder from "./Wilder.entity";
import { validateOrReject } from "class-validator";

// Fonction de select random dans un tableau
const randomInArray = (array: any) => {
  let randomKey = (Math.random() * array.length) | 0;
  let returnedValue = array[randomKey];
  return returnedValue;
};

// Validate or Reject
async function validateOrRejectWilderCreation(newWilder: Wilder) {
  try {
    await validateOrReject(newWilder);
  } catch (errors: any) {
    return errors;
  }
}

export { randomInArray, validateOrRejectWilderCreation };
