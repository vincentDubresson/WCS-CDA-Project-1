import { Wilder } from "../../data/types";
import { HTTPVerb, query, WILDERS_PATH } from "../../services/rest";

export async function createWilder(
  firstName: string,
  lastName: string,
  description: string,
  isTeacher: null | boolean,
  schoolName: string,
  skills: { skillName: string }[]
): Promise<Wilder> {
  return query(WILDERS_PATH, HTTPVerb.POST, {
    firstName,
    lastName,
    description,
    isTeacher,
    schoolName,
    skills,
  });
}
