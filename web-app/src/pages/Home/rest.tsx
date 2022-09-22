import { Wilder } from "../../data/types";
import { HTTPVerb, query, WILDERS_PATH } from "../../services/rest";

export async function fetchWilders(): Promise<Wilder[]> {
  return query(WILDERS_PATH, HTTPVerb.GET);
}

export async function deleteWilder(id: string): Promise<void> {
  return query(`${WILDERS_PATH}/${id}`, HTTPVerb.DELETE);
}
