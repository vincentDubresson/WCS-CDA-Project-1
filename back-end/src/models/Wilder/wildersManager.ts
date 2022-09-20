import { getWilderRepository, getSkillRepository } from "../../database/utils";
import { getSchoolByName } from "../School/schoolManager";
import School from "../School/schoolsEntity";
import Skill from "../Skill/skillsEntity";
import { getRandomSkillByName, getSkillByName } from "../Skill/skillsManager";
import Wilder from "./wildersEntity";
import { wildersArray } from "./wildersFixtures";

// Requête pour initialiser la BDD au lancement du serveur
async function initializeWilders() {
  const wilderRepository = await getWilderRepository();
  await wilderRepository.clear();

  // On insère ici un fake dataset
  await Promise.all(wildersArray.map(async (wilder) => {
    const wilderSchool = await getSchoolByName(wilder.school) as School;

    const wilderSkills = [];
    for (const skill of wilder.skills) {
      wilderSkills.push(await getRandomSkillByName(skill) as Skill);
    }
    const newWilder = new Wilder(
      wilder.firstName,
      wilder.lastName,
      wilder.description,
      wilder.isTeacher,
      wilder.picture,
      wilderSchool,
      wilderSkills
    );
    
    await wilderRepository.save(newWilder);
  }));
}

// Requête pour récupérer la liste des Wilders
async function getWilders() {
  const wilderRepository = await getWilderRepository();
  return wilderRepository.find();
}

// Requête pour récupérer un Wilder par son Id
async function getWilderById(id: string) {
  const wilderRepository = await getWilderRepository();
  const wilder = await wilderRepository.findOneBy({ id });
  if (!wilder) {
    throw Error("No existing Wilder matching ID.");
  }
  return wilder;
}

// Requête pour créer un nouveau wilder
async function createWilder(
  wilderFirstname: string,
  wilderLastname: string,
  wilderDescription: string,
  wilderIsTeacher: boolean,
  wilderPicture: string,
  schoolName: string,
  wilderSkillsDatas: {skillName: string, skillScore: number}[]) {
  const wilderRepository = await getWilderRepository();
  const wilderSchool = await getSchoolByName(schoolName) as School;
  const wilderSkills = [];
  for (const skillDatas of wilderSkillsDatas) {
    wilderSkills.push(await getSkillByName(skillDatas.skillName, skillDatas.skillScore) as Skill);
  }
  const newWilder = new Wilder(
    wilderFirstname,
    wilderLastname,
    wilderDescription,
    wilderIsTeacher,
    wilderPicture,
    wilderSchool,
    wilderSkills
  );
  
  await wilderRepository.save(newWilder);
  return newWilder;
}

// Requête pour modifier un wilder
async function updateWilder(id: string, firstName: string, lastName: string) {
  const wilderRepository = await getWilderRepository();
  const wilder = await wilderRepository.findOneBy({ id });
  if (!wilder) {
    throw Error("No existing Wilder matching ID.");
  }
  const updateWilder = wilderRepository.save(
    {
      id,
      firstName,
      lastName,
    }
  );
  return updateWilder;
}

// Requête pour supprimer un wilder
async function deleteWilder(id: string) {
  const wilderRepository = await getWilderRepository();
  const wilder = await wilderRepository.findOneBy({ id });
  if (!wilder) {
    throw Error("No existing Wilder matching ID.");
  }
  return wilderRepository.remove(wilder);
}

// Requête pour ajouter un skill à un wilder
async function addSkillToWilder(wilderId: string, skillId: string) {
  const wilderRepository = await getWilderRepository();
  const skillRepository = await getSkillRepository();
  const wilder = await wilderRepository.findOneBy({ id: wilderId });
  if (!wilder) {
    throw Error("No existing Wilder matching ID.");
  }
  const skill = await skillRepository.findOneBy({ id: skillId });
  if (!skill) {
    throw Error("No existing Skill matching ID.");
  }
  wilder.skills = [...wilder.skills, skill];
  return wilderRepository.save(wilder);
}

export {
  initializeWilders,
  getWilders,
  getWilderById,
  createWilder,
  updateWilder,
  deleteWilder,
  addSkillToWilder,
};
