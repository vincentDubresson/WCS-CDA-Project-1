// On appelle la dépendance 'TypeORM'
const EntitySchema = require("typeorm").EntitySchema;

// On crée une table de la base de données
module.exports = new EntitySchema({
  name: "Wilder",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      // A confirmer mais pas obligatoire de mettre VARCHAR
      type: "text",
    }
  },
})