import { schools } from "../School/School.service";
import { skills } from "../Skill/Skill.service";
import { faker } from "@faker-js/faker";
import { randomInArray } from "./Wilder.service";

// Fonction utilisée pour créer un jeu de données en faker
const wildersFixtures = (schools: string[], skills: string[]) => {
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
      skills: skills.sort(() => Math.random() - 0.5).slice(0, 4),
    });
  }
  return wildersArray;
};

const wildersArray = wildersFixtures(schools, skills);

export { wildersArray };
