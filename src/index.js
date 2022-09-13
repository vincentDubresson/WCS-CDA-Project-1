// On appelle Express
const express = require('express');
// On appelle TypeORM
const { dataSource, connectToDatabase } = require("./database/utils");
// On appelle l'entité
const Wilder = require("./models/Wilder");

// On crée le Serveur
const app = express();

// On récupère la route
app.get('/', function (req, res) {
  res.send('Hello World !!')
})

// Pour Node on va utiliser le port 4000.
const PORT = 4000;

// Fonction pour démarrer le serveur
async function start() {
  // On attend l'initialisation de la BDD, l'effacement et l'insertion avant la suite
  await connectToDatabase();
  await dataSource.getRepository(Wilder).clear();
  await dataSource.getRepository(Wilder).save({ name: "John Doe"});
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
  });
}

start();



