import { Wilder } from "../../data/types";
import { HTTPVerb, query, WILDERS_PATH } from "../../services/rest";

export async function fetchWilder(id: string | undefined) {
  return query(`${WILDERS_PATH}/${id}`, HTTPVerb.GET);
}

export async function updateWilder(
  firstName: string,
  lastName: string,
  description: string,
  isTeacher: null | boolean,
  schoolName: string,
  skills: { skillName: string; skillScore: number | string }[]
): Promise<Wilder> {
  return query(WILDERS_PATH, HTTPVerb.PUT, {
    firstName,
    lastName,
    description,
    isTeacher,
    schoolName,
    skills,
  });
}
