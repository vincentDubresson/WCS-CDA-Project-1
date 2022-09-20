import {
  getWilders,
  getWilderById,
  createWilder,
  deleteWilder,
  updateWilder,
  addSkillToWilder,
} from "../models/Wilder/wildersManager";
import { Request, Response } from "express";
import { getErrorMessage } from "../utils";

// Fonction get pour récupérer les Wilders
export const get = async (req: Request, res: Response): Promise<void> => {
  const wilders = await getWilders();
  res.json(wilders);
};

// Fonction getById pour récupérer un Wilder
export const getById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const wilder = await getWilderById(id);
    res.status(201).json(wilder);
  } catch (error) {
    res.status(404).json({ error: getErrorMessage(error) });
  }
};

// Fonction post pour créer un nouveau wilder (prise en charge erreurs)
export const post = async (req: Request, res: Response): Promise<void> => {
  const {
    firstName,
    lastName,
    description,
    isTeacher,
    picture = undefined,
    schoolName,
    skills,
  } = req.body;
  if (!firstName || !lastName) {
    res.status(404).json({ error: "Firstname and lastname are mandatory." });
  } else {
    const newWilder = await createWilder(
      firstName,
      lastName,
      description,
      isTeacher,
      picture,
      schoolName,
      skills
    );
    res.status(201).json(newWilder);
  }
};

// Fonction put pour modifier un wilder
export const put = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { firstName, lastName } = req.body;

  if (!firstName || !lastName) {
    res.status(404).json({ error: "Firstname and lastname are mandatory." });
  } else {
    try {
      const wilderToUpdate = await updateWilder(id, firstName, lastName);
      res.status(201).json(wilderToUpdate);
    } catch (error) {
      res.status(404).json({ error: getErrorMessage(error) });
    }
  }
};

// Fonction delete pour supprimer un wilder
export const del = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    await deleteWilder(id);
    res.json({ message: `Wilder ${id} has been successfully removed.` });
  } catch (error) {
    res.status(404).json({ error: getErrorMessage(error) });
  }
};

// Fonction addSkil pour ajouter un skill à un wilder.
export const addSkill = async (req: Request, res: Response): Promise<void> => {
  const { id: wilderId } = req.params;
  const { skillId } = req.body;

  if (!skillId) {
    res.status(404).json({ error: "Skill Id is mandatory." });
  } else {
    try {
      const skillUpdatedToWilder = await addSkillToWilder(wilderId, skillId);
      res.status(201).json(skillUpdatedToWilder);
    } catch (error) {
      res.status(404).json({ error: getErrorMessage(error) });
    }
  }
};
