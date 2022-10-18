import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";

import Wilder from "../Wilder/Wilder.entity";

@Entity()
@ObjectType()
export default class Skill {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  skillName: string;

  @ManyToMany(() => Wilder, (wilder) => wilder.skills)
  @Field(() => [Wilder])
  wilders: Wilder[];
}
