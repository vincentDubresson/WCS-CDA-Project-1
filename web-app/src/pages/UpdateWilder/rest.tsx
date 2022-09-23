import { Wilder } from "../../data/types";
import { HTTPVerb, query, WILDERS_PATH } from "../../services/rest";

export async function fetchWilder(id: string | undefined) {
  return query(`${WILDERS_PATH}/${id}`, HTTPVerb.GET);
}

export async function updateWilder(
  id: string,
  firstName: string,
  lastName: string,
  description: string,
  isTeacher: null | boolean,
  schoolName: string,
  skills: { skillName: string }[]
): Promise<Wilder> {
  return query(`${WILDERS_PATH}/${id}`, HTTPVerb.PUT, {
    firstName,
    lastName,
    description,
    isTeacher,
    schoolName,
    skills,
  });
}
