const typeorm = require('typeorm');
const Wilder = require("../models/Wilder/wildersEntity");

// On crée ou on va chercher la base de données.
const dataSource = new typeorm.DataSource({
  type: "sqlite",
  database: "./WCS-CDA-Project-1.sqlite",
  // Ne jamais mettre l'option ci-dessous en prod
  synchronize: true,
  // On déclare l'entité utilisée dans la base de données.
  entities: [Wilder],
  // Ne jamais mettre l'option ci-dessous en prod
  logging: ["query", "error"],
});

// Fonction de connexion à la BDD
let initialized = false;
async function getDatabase() {
  if (!initialized) {
    await dataSource.initialize();
    initialized = true;
    console.log("#### - Successfully connected to database - ####");
  }
  return dataSource;
}

// Fonction de récupération du Repository de la table Wilder
async function getWilderRepository() {
  return (await getDatabase()).getRepository(Wilder);
}

module.exports = {
  getDatabase,
  getWilderRepository,
}
