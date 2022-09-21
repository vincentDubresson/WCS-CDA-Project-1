import { Skill } from "../../data/types";
import "./Skill.scss";

type PropType = Omit<Skill, "id">;

export default function Skills({ skillName, skillScore }: PropType) {
  return (
    <>
      {skillName}
      <span className="SkillVotes">{skillScore}</span>
    </>
  );
}
