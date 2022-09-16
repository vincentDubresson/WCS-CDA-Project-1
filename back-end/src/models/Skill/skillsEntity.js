// On appelle la dépendance 'TypeORM'
const EntitySchema = require("typeorm").EntitySchema;

// On crée une table de la base de données
module.exports = new EntitySchema({
  name: "Skill",
  columns: {
    id: {
      primary: true,
      // On utilise le type uuid pour que l'id soit unique et inviolable
      type: "uuid",
      generated: "uuid",
    },
    skillName: {
      type: "text",
    },
    skillScore: {
      type: "int",
    }
  },
});