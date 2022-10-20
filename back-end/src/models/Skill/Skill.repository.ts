import { Repository } from "typeorm";
import { getRepository } from "../../database/utils";
import WilderRepository from "../Wilder/Wilder.repository";
import Skill from "./Skill.entity";

export default class SkillRepository extends Skill {
  private static repository: Repository<Skill>;
  static async initializeRepository() {
    this.repository = await getRepository(Skill);
  }

  static async clearRepository(): Promise<void> {
    this.repository.delete({});
  }

  static async initializeSkill(skills: string[]): Promise<void> {
    await WilderRepository.clearRepository();
    await this.clearRepository();
    skills.forEach(async (skill) => {
      await this.repository.save({ skillName: skill });
    });
  }

  static async getSkillByName(name: string): Promise<Skill | null> {
    return await this.repository.findOneBy({ skillName: name });
  }

  static async getSkillById(id: string): Promise<Skill | null> {
    return await this.repository.findOneBy({ id });
  }
}
