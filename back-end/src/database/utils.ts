import { DataSource } from 'typeorm';
import Wilder from "../models/Wilder/wildersEntity";
import School from "../models/School/schoolsEntity";
import Skill from "../models/Skill/skillsEntity";

// On crée ou on va chercher la base de données.
const dataSource = new DataSource({
  type: "sqlite",
  database: "./WCS-CDA-Project-1.sqlite",
  // Ne jamais mettre l'option ci-dessous en prod
  synchronize: true,
  // On déclare les entités utilisées dans la base de données.
  entities: [Wilder, School, Skill],
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

// Fonction de récupération du Repository de la table School
async function getSchoolRepository() {
  return (await getDatabase()).getRepository(School);
}

// Fonction de récupération du Repository de la table Skill
async function getSkillRepository() {
  return (await getDatabase()).getRepository(Skill);
}

export {
  getDatabase,
  getWilderRepository,
  getSchoolRepository,
  getSkillRepository,
}
