const { getSkillRepository } = require("../../database/utils");

const skills = [
  "Ruby",
  "C#",
  "Python",
  "Java",
  "JS",
  "PHP"
];

async function initializeSkill() {
  const skillRepository = await getSkillRepository();
  await skillRepository.clear();
  skills.forEach(async (skill) => {
    for (let i = 1; i <= 5; i++) {
      await skillRepository.save({ skillName: skill, skillScore: i });
    }
  });
}

// On récupère l'école par son nom
async function getSkillByName(name) {
  const skillRepository = await getSkillRepository();
  const score = Math.floor(Math.random() * 5) + 1;
  return await skillRepository.findOne({ 
    where: {
      skillName: name,
      skillScore: score
    }
   });
}

module.exports = {
  initializeSkill,
  getSkillByName,
  skills,
}