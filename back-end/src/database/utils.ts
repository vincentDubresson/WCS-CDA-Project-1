import { DataSource, EntityTarget } from "typeorm";

// On crée ou on va chercher la base de données.
const dataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  // Ne jamais mettre l'option ci-dessous en prod
  synchronize: true,
  // On déclare les entités utilisées dans la base de données.
  entities: [__dirname + "/../models/**/*.entity.js"],
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

// Fonction de récupération du Repository pour une entité
async function getRepository(entity: EntityTarget<any>) {
  return (await getDatabase()).getRepository(entity);
}

export { getDatabase, getRepository };
