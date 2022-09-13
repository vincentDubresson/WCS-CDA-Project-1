const express = require('express');
const wildersController = require('./controllers/wildersController');
const { initializeWilders } = require("./models/Wilder/wildersManager");
const { getDatabase } = require("./database/utils");

// On crée le Serveur
const app = express();

// On crée les routes sans oublier de tester en HTTP
app.get("/", function (req, res) {
  res.send("Hello World !!")
});
app.get("/wilders", wildersController.get);

// Pour Node on va utiliser le port 4000.
const PORT = 4000;
// Fonction pour démarrer le serveur
async function start() {
  // On attend l'initialisation de la BDD.
  await initializeWilders();
  // On efface et récupère les données de la BDD.
  await getDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 👍`);
  });
}

start();




