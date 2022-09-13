const { getWilderRepository } = require("../../database/utils");

// Requête pour initialiser la BDD au lancement du serveur
async function initializeWilders() {
  const wilderRepository = await getWilderRepository();
  await wilderRepository.clear();
  await wilderRepository.save({ name: "John Doe" });
}

// Requête pour récupérer les données en BDD
async function getWilders() {
  const wilderRepository = await getWilderRepository();
  return wilderRepository.find();
}

async function createWilder() {
  return;
}

async function updateWilder() {
  return;
}

async function deleteWilder() {
  return;
}

module.exports = {
  initializeWilders,
  getWilders,
  createWilder,
  updateWilder,
  deleteWilder,
};
