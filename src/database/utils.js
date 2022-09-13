const typeorm = require('typeorm');
const Wilder = require("../models/Wilder");

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

async function connectToDatabase() {
  await dataSource.initialize();
  console.log("Connected to Database.");
}

exports.dataSource = dataSource;
exports.connectToDatabase = connectToDatabase;
