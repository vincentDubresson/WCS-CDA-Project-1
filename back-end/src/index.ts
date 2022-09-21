import express from "express";
import * as wildersController from "./controllers/wildersController";
import { skills } from "./models/Skill/Skill.service";
import { schools } from "./models/School/School.service";
import { wildersArray } from "./models/Wilder/Wilder.fixtures";
import SkillRepository from "./models/Skill/Skill.repository";
import SchoolRepository from "./models/School/School.repository";
import WilderRepository from "./models/Wilder/Wilder.repository";

// On crée le Serveur
const app = express();
app.use(express.json());

// On crée les routes sans oublier de tester en HTTP
app.get("/", function (req, res) {
  res.send("Hello World !!");
});

// On crée le CRUD pour l'entité Wilders
const API_WILDERS_PATH = "/api/wilders";
app.get(API_WILDERS_PATH, wildersController.get);
app.get(`${API_WILDERS_PATH}/:id`, wildersController.getById);
app.post(API_WILDERS_PATH, wildersController.post);
app.put(`${API_WILDERS_PATH}/:id`, wildersController.put);
app.delete(`${API_WILDERS_PATH}/:id`, wildersController.del);
app.post(`${API_WILDERS_PATH}/:id/skills`, wildersController.addSkill);

// Pour Node on va utiliser le port 4000.
const PORT = 4000;
// Fonction pour démarrer le serveur
async function start() {
  await SkillRepository.initializeRepository();
  await SchoolRepository.initializeRepository();
  await WilderRepository.initializeRepository();
  // On attend l'initialisation de la BDD.
  await SkillRepository.initializeSkill(skills);
  await SchoolRepository.initializeSchool(schools);
  await WilderRepository.initializeWilders(wildersArray);
  // On efface et récupère les données de la BDD.
  //await getDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 👍`);
  });
}

start();
