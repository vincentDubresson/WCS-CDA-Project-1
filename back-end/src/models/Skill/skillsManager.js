const { getSkillRepository } = require("../../database/utils");

const skills = [
  "PHP",
  "JS",
  "CSS",
  "Java",
  "Python",
  "Ruby",
  "C#"
];

async function initializeSkill() {
  const skillRepository = await getSkillRepository();
  await skillRepository.clear();
  skills.forEach(async (skill) => {
   await skillRepository.save({ skillName: skill });
  });
}

// On récupère l'école par son nom
async function getSkillByName(name) {
  const skillRepository = await getSkillRepository();
  return await skillRepository.findOneBy({ skillName: name });
}

module.exports = {
  initializeSkill,
  getSkillByName,
  skills,
}