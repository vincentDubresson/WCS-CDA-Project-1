const express = require('express');
const wildersController = require('./controllers/wildersController');
const { initializeWilders } = require("./models/Wilder/wildersManager");
const { initializeSchool } = require("./models/School/SchoolManager");
const { getDatabase } = require("./database/utils");

// On crée le Serveur
const app = express();
app.use(express.json());

// On crée les routes sans oublier de tester en HTTP
app.get("/", function (req, res) {
  res.send("Hello World !!")
});

// On crée le CRUD pour l'entité Wilders
const API_WILDERS_PATH = "/api/wilders";
app.get(API_WILDERS_PATH, wildersController.get);
app.get(`${API_WILDERS_PATH}/:id`, wildersController.getById)
app.post(API_WILDERS_PATH, wildersController.post);
app.put(`${API_WILDERS_PATH}/:id`, wildersController.put);
app.delete(`${API_WILDERS_PATH}/:id`, wildersController.del);

// Pour Node on va utiliser le port 4000.
const PORT = 4000;
// Fonction pour démarrer le serveur
async function start() {
  // On attend l'initialisation de la BDD.
  await initializeSchool();
  await initializeWilders();
  // On efface et récupère les données de la BDD.
  await getDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 👍`);
  });
}

start();




