import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import Wilder from "../models/Wilder/Wilder.entity";
import WilderRepository from "../models/Wilder/Wilder.repository";
import {
  addSkillsToWilderArgs,
  CreateWilderArgs,
  UpdateWilderArgs,
} from "./Wilder.args";

@Resolver(Wilder)
export default class WilderResolver {
  @Query(() => [Wilder])
  wilders(): Promise<Wilder[]> {
    return WilderRepository.getWilders();
  }

  @Query(() => Wilder)
  wilder(@Arg("id") id: string): Promise<Wilder> {
    return WilderRepository.getWilderById(id);
  }

  @Mutation(() => Wilder)
  createWilder(
    @Args()
    {
      firstName,
      lastName,
      description,
      isTeacher,
      picture,
      schoolName,
      skills,
    }: CreateWilderArgs
  ): Promise<Wilder> {
    return WilderRepository.createWilder(
      firstName,
      lastName,
      description,
      isTeacher,
      picture,
      schoolName,
      skills
    );
  }

  @Mutation(() => Wilder)
  updateWilder(
    @Args()
    {
      id,
      firstName,
      lastName,
      description,
      isTeacher,
      picture,
      schoolName,
      skills,
    }: UpdateWilderArgs
  ): Promise<Wilder> {
    return WilderRepository.updateWilder(
      id,
      firstName,
      lastName,
      description,
      isTeacher,
      picture,
      schoolName,
      skills
    );
  }

  @Mutation(() => Wilder)
  deleteWilder(@Arg("id") id: string): Promise<Wilder> {
    return WilderRepository.deleteWilder(id);
  }

  @Mutation(() => Wilder)
  addSkillToWilder(@Args() { wilderId, skillId }: addSkillsToWilderArgs) {
    return WilderRepository.addSkillToWilder(wilderId, skillId);
  }
}
