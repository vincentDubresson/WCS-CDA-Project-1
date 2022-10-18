import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import path from "path";

import WilderResolver from "./resolvers/Wilder.resolver";

import SkillRepository from "./models/Skill/Skill.repository";
import SchoolRepository from "./models/School/School.repository";
import WilderRepository from "./models/Wilder/Wilder.repository";
import { skills } from "./models/Skill/Skill.service";
import { schools } from "./models/School/School.service";
import { wildersArray } from "./models/Wilder/Wilder.fixtures";

export const startServer = async () => {
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [WilderResolver],
      emitSchemaFile: path.resolve(__dirname, "schema.gql"),
    }),
    csrfPrevention: true,
    cache: "bounded",
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  });

  server.listen().then(async ({ url }) => {
    await SkillRepository.initializeRepository();
    await SchoolRepository.initializeRepository();
    await WilderRepository.initializeRepository();

    await SkillRepository.initializeSkill(skills);
    await SchoolRepository.initializeSchool(schools);
    await WilderRepository.initializeWilders(wildersArray);
    console.log(`🚀  Server ready at ${url}`);
  });
};
