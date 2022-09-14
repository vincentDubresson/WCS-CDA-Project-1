const { getSkillRepository } = require("../../database/utils")

async function initializeSkill() {
  const skillRepository = await getSkillRepository();
  await skillRepository.clear();
  await skillRepository.save({ skillName: "PHP" });
  await skillRepository.save({ skillName: "React" });
}

module.exports = {
  initializeSkill,
}