import { Repository } from "typeorm";
import { getRepository } from "../../database/utils";
import Skill from "./Skill.entity";

export default class SkillRepository extends Skill {
  private static repository: Repository<Skill>;
  static async initializeRepository() {
    this.repository = await getRepository(Skill);
  }

  static async clearRepository(): Promise<void> {
    this.repository.clear();
  }

  static async initializeSkill(skills: string[]): Promise<void> {
    this.repository.clear();
    skills.forEach(async (skill) => {
      for (let i = 1; i <= 5; i++) {
        await this.repository.save({ skillName: skill, skillScore: i });
      }
    });
  }

  static async getRandomSkillByName(name: string): Promise<Skill | null> {
    const score: number = Math.floor(Math.random() * 5) + 1;
    return await this.repository.findOne({
      where: {
        skillName: name,
        skillScore: score,
      },
    });
  }

  static async getSkillByName(
    name: string,
    score: number
  ): Promise<Skill | null> {
    return await this.repository.findOne({
      where: {
        skillName: name,
        skillScore: score,
      },
    });
  }

  static async getSkillById(id: string): Promise<Skill | null> {
    return await this.repository.findOneBy({ id });
  }
}
