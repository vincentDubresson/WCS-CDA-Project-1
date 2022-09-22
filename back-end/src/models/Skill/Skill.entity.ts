import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Length } from "class-validator";
import Wilder from "../Wilder/Wilder.entity";

@Entity()
export default class Skill {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @Length(1, 255)
  skillName: string;

  @ManyToMany(() => Wilder, (wilder) => wilder.skills)
  wilders: Wilder[];
}
