const { getWilderRepository, getSkillRepository, getSchoolRepository } = require("../../database/utils");
const { getSchoolByName, schools} = require("../School/schoolManager");
const { getSkillByName, skills  } = require("../Skill/skillsManager");
const { faker } = require('@faker-js/faker');

function RandArray(array){
    var rand = Math.random()*array.length | 0;
    var rValue = array[rand];
    return rValue;
}
// Fonction utilisée pour créer un jeu de données en faker
const wilders = (schools, skills) => {
  let wildersArray = [];
  for (let i = 0; i < 10; i++) {
      wildersArray.push({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      description: faker.lorem.sentence(25),
      school: RandArray(schools),
      skills: [RandArray(skills)],
    });
  };
  return wildersArray;
}
const wildersArray = wilders(schools, skills);

// Requête pour initialiser la BDD au lancement du serveur
async function initializeWilders() {
  const wilderRepository = await getWilderRepository();
  await wilderRepository.clear();
  const lyonSchool = await getSchoolByName("WCS-Lyon");
  const phpSkill = await getSkillByName("PHP");
  // On insère ici un fake dataset
  wildersArray.forEach(async (wilder) => {
    const wilderSchool = await getSchoolByName(wilder.school);
    const wilderSkills = await getSkillByName(wilder.skills);
    await wilderRepository.save({
      firstName: wilder.firstName,
      lastName: wilder.lastName,
      description: wilder.description,
      school: wilderSchool,
      skills: [wilderSkills], });
  });
  await wilderRepository.save({
    firstName: "John",
    lastName: "Doe",
    description: faker.lorem.sentence(25),
    school: lyonSchool,
    skills: [phpSkill], });
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
