import { Repository } from "typeorm";
import { getRepository } from "../../database/utils";
import WilderRepository from "../Wilder/Wilder.repository";
import School from "./School.entity";

export default class SchoolRepository extends School {
  private static repository: Repository<School>;

  static async initializeRepository() {
    this.repository = await getRepository(School);
  }

  static async clearRepository(): Promise<void> {
    this.repository.delete({});
  }

  static async initializeSchool(schools: string[]): Promise<void> {
    await this.clearRepository();
    for (const school of schools) {
      await this.repository.save({ schoolName: school });
    }
  }

  static async getSchoolByName(name: string): Promise<School | null> {
    return await this.repository.findOneBy({ schoolName: name });
  }
}
