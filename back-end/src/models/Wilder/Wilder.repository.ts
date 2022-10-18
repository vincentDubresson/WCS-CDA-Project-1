import { Repository } from "typeorm";
import { getRepository } from "../../database/utils";

import Wilder from "./Wilder.entity";
import School from "../School/School.entity";
import Skill from "../Skill/Skill.entity";

import SchoolRepository from "../School/School.repository";
import SkillRepository from "../Skill/Skill.repository";

export default class WilderRepository extends Wilder {
  private static repository: Repository<Wilder>;
  static async initializeRepository() {
    this.repository = await getRepository(Wilder);
  }

  static async clearRepository(): Promise<void> {
    this.repository.clear();
  }

  static async initializeWilders(
    wildersArray: {
      firstName: string;
      lastName: string;
      description: string;
      picture: string;
      isTeacher: boolean;
      school: any;
      skills: string[];
    }[]
  ): Promise<void> {
    await this.repository.clear();
    await Promise.all(
      wildersArray.map(async (wilder) => {
        const wilderSchool = (await SchoolRepository.getSchoolByName(
          wilder.school
        )) as School;
        const wilderSkills = [];
        for (const skill of wilder.skills) {
          wilderSkills.push(
            (await SkillRepository.getSkillByName(skill)) as Skill
          );
        }
        const newWilder = new Wilder(
          wilder.firstName,
          wilder.lastName,
          wilder.description,
          wilder.isTeacher,
          wilder.picture,
          wilderSchool,
          wilderSkills
        );
        await this.repository.save(newWilder);
      })
    );
  }

  static async getWilders(): Promise<Wilder[]> {
    return this.repository.find();
  }

  static async getWilderById(id: string): Promise<Wilder> {
    const wilder = await this.repository.findOneBy({ id });

    if (!wilder) {
      throw Error("No existing Wilder matching ID.");
    }

    return wilder;
  }

  static async createWilder(
    wilderFirstname: string,
    wilderLastname: string,
    wilderDescription: string,
    wilderIsTeacher: boolean,
    wilderPicture: string,
    schoolName: string,
    wilderSkillsDatas: string[]
  ): Promise<Wilder> {
    const wilderSchool = (await SchoolRepository.getSchoolByName(
      schoolName
    )) as School;
    const wilderSkills = [];

    for (const skillDatas of wilderSkillsDatas) {
      wilderSkills.push(
        (await SkillRepository.getSkillByName(skillDatas)) as Skill
      );
    }

    const newWilder = new Wilder(
      wilderFirstname,
      wilderLastname,
      wilderDescription,
      wilderIsTeacher,
      wilderPicture,
      wilderSchool,
      wilderSkills
    );

    return await this.repository.save(newWilder);
  }

  static async updateWilder(
    id: string,
    firstName: string,
    lastName: string,
    description: string,
    isTeacher: boolean,
    picture: string,
    schoolName: string,
    wilderSkillsDatas: string[]
  ): Promise<Wilder> {
    const wilder = await this.repository.findOneBy({ id });

    if (!wilder) {
      throw Error("No existing Wilder matching ID.");
    }

    const wilderSchool = (await SchoolRepository.getSchoolByName(
      schoolName
    )) as School;
    const wilderSkills: Skill[] = [];

    for (const skillDatas of wilderSkillsDatas) {
      wilderSkills.push(
        (await SkillRepository.getSkillByName(skillDatas)) as Skill
      );
    }

    const updateWilder: Wilder = await this.repository.save({
      id: id,
      firstName: firstName,
      lastName: lastName,
      description: description,
      isTeacher: isTeacher,
      picture: picture,
      school: wilderSchool,
      skills: wilderSkills,
    });

    return updateWilder;
  }

  static async deleteWilder(id: string): Promise<Wilder> {
    const wilder = await this.repository.findOneBy({ id });

    if (!wilder) {
      throw Error("No existing Wilder matching ID.");
    }

    return this.repository.remove(wilder);
  }

  static async addSkillToWilder(
    wilderId: string,
    skillId: string
  ): Promise<Wilder> {
    const wilder = await this.repository.findOneBy({ id: wilderId });

    if (!wilder) {
      throw Error("No existing Wilder matching ID.");
    }

    const skill = await SkillRepository.getSkillById(skillId);

    if (!skill) {
      throw Error("No existing Skill matching ID.");
    }

    wilder.skills = [...wilder.skills, skill];

    return this.repository.save(wilder);
  }
}
