import { MaxLength, MinLength } from "class-validator";
import { ArgsType, Field, ID } from "type-graphql";

@ArgsType()
export class CreateWilderArgs {
  @Field()
  @MinLength(1)
  @MaxLength(255)
  firstName: string;

  @Field()
  @MinLength(1)
  @MaxLength(255)
  lastName: string;

  @Field()
  @MinLength(1)
  description: string;

  @Field()
  isTeacher: boolean;

  @Field({ nullable: true })
  picture: string;

  @Field()
  schoolName: string;

  @Field(() => [String])
  skills: string[];
}

@ArgsType()
export class UpdateWilderArgs extends CreateWilderArgs {
  @Field(() => ID)
  id: string;
}

@ArgsType()
export class addSkillsToWilderArgs {
  @Field(() => ID)
  wilderId: string;

  @Field(() => ID)
  skillId: string;
}
