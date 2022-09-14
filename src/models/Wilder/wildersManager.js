const { IsNull } = require("typeorm");
const { getWilderRepository } = require("../../database/utils");

// Requête pour initialiser la BDD au lancement du serveur
async function initializeWilders() {
  const wilderRepository = await getWilderRepository();
  await wilderRepository.clear();
  await wilderRepository.save({ firstName: "John", lastName: "Doe" });
}

// Requête pour récupérer la liste des Wilders
async function getWilders() {
  const wilderRepository = await getWilderRepository();
  return wilderRepository.find();
}

// Requête pour récupérer un Wilder par son Id
async function getWilderById(id) {
  const wilderRepository = await getWilderRepository();
  const wilderById = await wilderRepository.findOneBy({ id });
  if (!wilderById) {
    throw Error("No existing Wilder matching ID.");
  }
  return wilderById;
}

// Requête pour créer un nouveau wilder
async function createWilder(firstName, lastName) {
  const wilderRepository = await getWilderRepository();
  const newWilder = wilderRepository.create({ firstName, lastName });
  await wilderRepository.save(newWilder);
  return newWilder;
}

// Requête pour modifier un wilder
async function updateWilder(id, firstName, lastName) {
  const wilderRepository = await getWilderRepository();
  const existingWilder = await wilderRepository.findOneBy({ id });
  if (!existingWilder) {
    throw Error("No existing Wilder matching ID.");
  }
  const wilderToUpdate = wilderRepository.save(
    {
      id,
      firstName,
      lastName,
    }
  );
  return wilderToUpdate;
}

// Requête pour supprimer un wilder
async function deleteWilder(id) {
  const wilderRepository = await getWilderRepository();
  const delWilder = await wilderRepository.findOneBy({ id });
  if (!delWilder) {
    throw Error("No existing Wilder matching ID.");
  }
  return wilderRepository.remove(delWilder);
}

module.exports = {
  initializeWilders,
  getWilders,
  getWilderById,
  createWilder,
  updateWilder,
  deleteWilder,
};
