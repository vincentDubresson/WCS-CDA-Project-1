import { ApolloServer, gql } from 'apollo-server';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

import SkillRepository from "./models/Skill/Skill.repository";
import SchoolRepository from "./models/School/School.repository";
import WilderRepository from "./models/Wilder/Wilder.repository";
import { skills } from "./models/Skill/Skill.service";
import { schools } from "./models/School/School.service";
import { wildersArray } from "./models/Wilder/Wilder.fixtures";



// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
  },
};


// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
  /**
   * What's up with this embed: true option?
   * These are our recommended settings for using AS;
   * they aren't the defaults in AS3 for backwards-compatibility reasons but
   * will be the defaults in AS4. For production environments, use
   * ApolloServerPluginLandingPageProductionDefault instead.
  **/
  plugins: [
    ApolloServerPluginLandingPageLocalDefault({ embed: true }),
  ],
});

// The `listen` method launches a web server.
server.listen().then(async ({ url }) => {
  await SkillRepository.initializeRepository();
  await SchoolRepository.initializeRepository();
  await WilderRepository.initializeRepository();
  // On attend l'initialisation de la BDD.
  await SkillRepository.initializeSkill(skills);
  await SchoolRepository.initializeSchool(schools);
  await WilderRepository.initializeWilders(wildersArray);
  console.log(`🚀  Server ready at ${url}`);
});

/* // On crée le Serveur
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

start(); */


