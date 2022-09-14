const { getSchoolRepository, getWilderRepository } = require("../../database/utils");

const schools = ["WCS-Lyon", "WCS-Bordeaux", "WCS-Paris", "WCS-La-Loupe"];

// Requête pour initialiser la BDD au lancement du serveur
async function initializeSchool() {
  const schoolRepository = await getWilderRepository();
  const wilderRepository = await getSchoolRepository();
  await schoolRepository.clear();
  await wilderRepository.clear();
  schools.forEach(async (school) => {
    await wilderRepository.save({ schoolName: school });
  });
}

// On récupère l'école par son nom
async function getSchoolByName(name) {
  const schoolRepository = await getSchoolRepository();
  return await schoolRepository.findOneBy({ schoolName: name });
}

module.exports = {
  initializeSchool,
  getSchoolByName,
  schools,
}