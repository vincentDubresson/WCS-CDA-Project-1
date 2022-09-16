import { query, WILDERS_PATH } from '../../services/rest';

export async function createWilder(
  firstName,
  lastName,
  description,
  isTeacher,
  schoolName,
  skills
) {
  return query(WILDERS_PATH, "POST", {
    firstName,
    lastName,
    description,
    isTeacher,
    schoolName,
    skills
  })
}