import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import School from "../School/schoolsEntity";
import Skill from "../Skill/skillsEntity";

@Entity()
export default class Wilder {
  constructor(
    firstName: string,
    lastName: string,
    description: string,
    isTeacher: boolean,
    picture?: string,
    school?: School,
    skills?: Skill[]
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.description = description;
    this.isTeacher = isTeacher;
    if (picture) {
      this.picture = picture;
    }
    if (school) {
      this.school = school;
    }
    if (skills) {
      this.skills = skills;
    }
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  description: string;

  @Column({ default: "http://placeimg.com/300/300/people" })
  picture: string;

  @Column()
  isTeacher: boolean;

  @ManyToOne(() => School, (school) => school.wilders, { eager: true })
  school: School;

  @ManyToMany(() => Skill, { eager: true })
  @JoinTable()
  skills: Skill[];
}
