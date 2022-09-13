// On appelle Express
const express = require('express');

// On appelle TypeORM
const typeorm = require('typeorm');

// On appelle l'entité
const Wilder = require("./models/Wilder");

// On crée le Serveur
const app = express();

// On crée ou on va chercher la base de données.
const dataSource = new typeorm.DataSource({
  type: "sqlite",
  database: "./WCS-CDA-Project-1.sqlite",
  // Ne jamais mettre l'option ci-dessous en prod
  synchronize: true,
  // On déclare l'entité utilisée dans la base de données.
  entities: [Wilder],
  // Ne jamais mettre l'option ci-dessous en prod
  logging: true,
})

// On récupère la route
app.get('/', function (req, res) {
  res.send('Hello World !!')
})

// Pour Node on va utiliser le port 4000.
const PORT = 4000;

// Fonction pour démarrer le serveur
async function start() {
  // On attend l'initialisation de la BDD, l'effacement et l'insertion avant la suite
  await dataSource.initialize();
  await dataSource.getRepository(Wilder).clear();
  await dataSource.getRepository(Wilder).save({ name: "John Doe"});
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
  });
}

start();
