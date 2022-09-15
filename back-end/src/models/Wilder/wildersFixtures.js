const { schools } = require("../School/schoolManager");
const { skills } = require("../Skill/skillsManager");
const { faker } = require("@faker-js/faker");

function RandArray(array){
  var rand = Math.random()*array.length | 0;
  var rValue = array[rand];
  return rValue;
}

// Fonction utilisée pour créer un jeu de données en faker
const wildersFixtures = (schools, skills) => {
let wildersArray = [];
for (let i = 0; i < 50; i++) {
    wildersArray.push({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    description: faker.lorem.sentence(25),
    school: RandArray(schools),
    skills: [RandArray(skills)],
  });
};
return wildersArray;
}

const wildersArray = wildersFixtures(schools, skills);

module.exports = {
  wildersArray,
}