const { getWilderRepository, getSkillRepository } = require("../../database/utils");
const { getSchoolByName } = require("../School/schoolManager");
const { getSkillByName } = require("../Skill/skillsManager");
const { wildersArray } = require("./wildersFixtures");


// Requête pour initialiser la BDD au lancement du serveur
async function initializeWilders() {
  const wilderRepository = await getWilderRepository();
  await wilderRepository.clear();

  // On insère ici un fake dataset
  await Promise.all(wildersArray.map(async (wilder) => {
    const wilderSchool = await getSchoolByName(wilder.school);

    const wilderSkills = [];
    for (skill of wilder.skills) {
      wilderSkills.push(await getSkillByName(skill));
    }
    //const wilderSkills = await getSkillByName(wilder.skills);
    await wilderRepository.save({
      firstName: wilder.firstName,
      lastName: wilder.lastName,
      description: wilder.description,
      picture: wilder.picture,
      isTeacher: wilder.isTeacher,
      school: wilderSchool,
      skills: wilderSkills, });
  }));
}

// Requête pour récupérer la liste des Wilders
async function getWilders() {
  const wilderRepository = await getWilderRepository();
  return wilderRepository.find();
}

// Requête pour récupérer un Wilder par son Id
async function getWilderById(id) {
  const wilderRepository = await getWilderRepository();
  const wilder = await wilderRepository.findOneBy({ id });
  if (!wilder) {
    throw Error("No existing Wilder matching ID.");
  }
  return wilder;
}

// Requête pour créer un nouveau wilder
async function createWilder(firstName, lastName, description, school, skills) {
  const wilderRepository = await getWilderRepository();
  const newWilder = wilderRepository.create({ firstName, lastName, description, school, skills });
  await wilderRepository.save(newWilder);
  return newWilder;
}

// Requête pour modifier un wilder
async function updateWilder(id, firstName, lastName) {
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
async function deleteWilder(id) {
  const wilderRepository = await getWilderRepository();
  const wilder = await wilderRepository.findOneBy({ id });
  if (!wilder) {
    throw Error("No existing Wilder matching ID.");
  }
  return wilderRepository.remove(wilder);
}

// Requête pour ajouter un skill à un wilder
async function addSkillToWilder(wilderId, skillId) {
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

module.exports = {
  initializeWilders,
  getWilders,
  getWilderById,
  createWilder,
  updateWilder,
  deleteWilder,
  addSkillToWilder,
};
