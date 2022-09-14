const { getSkillRepository } = require("../../database/utils")

async function initializeSkill() {
  const skillRepository = await getSkillRepository();
  await skillRepository.clear();
  await skillRepository.save({ skillName: "PHP" });
  await skillRepository.save({ skillName: "Javascript" });
  await skillRepository.save({ skillName: "Typescript" });
  await skillRepository.save({ skillName: "Java" });
  await skillRepository.save({ skillName: "Python" });
  await skillRepository.save({ skillName: "Ruby" });
  await skillRepository.save({ skillName: "C#" });
}

// On récupère l'école par son nom
async function getSkillByName(name) {
  const skillRepository = await getSkillRepository();
  return await skillRepository.findOneBy({ skillName: name });
}

module.exports = {
  initializeSkill,
  getSkillByName,
}