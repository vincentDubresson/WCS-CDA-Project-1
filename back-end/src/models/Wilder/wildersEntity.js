// On appelle la dépendance 'TypeORM'
const EntitySchema = require("typeorm").EntitySchema;

// On crée une table de la base de données
module.exports = new EntitySchema({
  name: "Wilder",
  columns: {
    id: {
      primary: true,
      // On utilise le type uuid pour que l'id soit unique et inviolable
      type: "uuid",
      generated: "uuid",
    },
    firstName: {
      type: "text",
    },
    lastName: {
      type: "text",
    },
    description: {
      type: "text",
      default: "lorem ipsum lorem."
    },
    picture: {
      type: "text",
      default: "8bRN5ga.png"
    }
  },
  relations: {
    school: {
      target: "School",
      type: "many-to-one",
      // eager permet de créer les relations automatiquement
      eager: true,
    },
    skills: {
      target: "Skill",
      type: "many-to-many",
      // joinTable permet de créer une table de jointure.
      joinTable: true,
      eager: true,
    },
  }
});