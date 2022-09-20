import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import Wilder from "../Wilder/wildersEntity";

@Entity()
export default class Skill {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  skillName: string;

  @Column()
  skillScore: number;

  @ManyToMany(() => Wilder, (wilder) => wilder.skills)
  wilders: Wilder[];
}