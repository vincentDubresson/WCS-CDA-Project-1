const { schools } = require("../School/schoolManager");
const { skills } = require("../Skill/skillsManager");
const { faker } = require("@faker-js/faker");
const { randomInArray } = require("./WildersService");

// Fonction utilisée pour créer un jeu de données en faker
const wildersFixtures = (schools, skills) => {
let wildersArray = [];
for (let i = 1; i <= 50; i++) {
    const isTeacher = !(i % 10);
    wildersArray.push({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    description: faker.lorem.sentence(25),
    picture: `https://i.pravatar.cc/300?img=${i}`,
    isTeacher,
    school: randomInArray(schools),
    skills: skills,
  });
};
  return wildersArray;
}

const wildersArray = wildersFixtures(schools, skills);

module.exports = {
  wildersArray,
}