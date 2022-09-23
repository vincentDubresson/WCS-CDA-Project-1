import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MaxLength, MinLength } from "class-validator";
import School from "../School/School.entity";
import Skill from "../Skill/Skill.entity";

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
  @MaxLength(255, {
    message: "Le prénom ne doit pas dépasser 255 caractères.",
  })
  firstName: string;

  @Column()
  @MaxLength(255, {
    message: "Le nom ne doit pas dépasser 255 caractères.",
  })
  lastName: string;

  @Column()
  @MinLength(1, {
    message: "Merci de rentrer une description (même très courte)."
  })
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
