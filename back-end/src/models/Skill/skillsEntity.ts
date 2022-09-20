import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsInt, Length, Min, Max } from "class-validator";
import Wilder from "../Wilder/wildersEntity";

@Entity()
export default class Skill {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @Length(1, 255)
  skillName: string;

  @Column()
  @IsInt()
  @Min(1)
  @Max(5)
  skillScore: number;

  @ManyToMany(() => Wilder, (wilder) => wilder.skills)
  wilders: Wilder[];
}
