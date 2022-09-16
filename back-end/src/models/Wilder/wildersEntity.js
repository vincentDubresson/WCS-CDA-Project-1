const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "Wilder",
  columns: {
    id: {
      primary: true,
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
    },
    picture: {
      type: "text",
      default: "http://placeimg.com/300/300/people"
    },
    isTeacher: {
      type: "boolean",
      default: false,
    }
  },
  relations: {
    school: {
      target: "School",
      type: "many-to-one",
      eager: true,
    },
    skills: {
      target: "Skill",
      type: "many-to-many",
      joinTable: true,
      eager: true,
    },
  }
});