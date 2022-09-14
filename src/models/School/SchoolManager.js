const { getSchoolRepository, getWilderRepository } = require("../../database/utils");

// Requête pour initialiser la BDD au lancement du serveur
async function initializeSchool() {
  const schoolRepository = await getWilderRepository();
  const wilderRepository = await getSchoolRepository();
  await schoolRepository.clear();
  await wilderRepository.clear();
  await wilderRepository.save({ schoolName: "WCS-Lyon" });
  await wilderRepository.save({ schoolName: "WCS-Bordeaux"});
}

// On récupère l'école par son nom
async function getSchoolByName(name) {
  const schoolRepository = await getSchoolRepository();
  return await schoolRepository.findOneBy({ schoolName: name });
}

module.exports = {
  initializeSchool,
  getSchoolByName,
}