import { query, WILDERS_PATH } from '../../services/rest';

export async function fetchWilder(id) {
  return query(`${WILDERS_PATH}/${id}`, "GET");
}

export async function updateWilder(
  firstName,
  lastName,
  description,
  isTeacher,
  schoolName,
  skills
) {
  return query(WILDERS_PATH, "PUT", {
    firstName,
    lastName,
    description,
    isTeacher,
    schoolName,
    skills
  })
}