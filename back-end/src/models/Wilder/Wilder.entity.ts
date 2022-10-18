import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ID, Field, ObjectType } from "type-graphql";

import School from "../School/School.entity";
import Skill from "../Skill/Skill.entity";

@Entity()
@ObjectType()
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
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @Column()
  @Field()
  description: string;

  @Column({ default: "http://placeimg.com/300/300/people" })
  @Field()
  picture: string;

  @Column()
  @Field()
  isTeacher: boolean;

  @ManyToOne(() => School, (school) => school.wilders, { eager: true })
  @Field(() => School)
  school: School;

  @ManyToMany(() => Skill, { eager: true })
  @JoinTable()
  @Field(() => [Skill])
  skills: Skill[];
}
