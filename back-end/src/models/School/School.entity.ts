import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Contains, Length } from "class-validator";
import Wilder from "../Wilder/Wilder.entity";

@Entity()
export default class School {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @Index({ unique: true })
  @Contains("WCS-")
  @Length(5, 255)
  schoolName: string;

  @OneToMany(() => Wilder, (wilder) => wilder.school)
  wilders: Wilder[];
}
