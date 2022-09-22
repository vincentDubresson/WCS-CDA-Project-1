import Skills from "../Skill/Skill";
import TeachStamp from "../../assets/images/TeacherStamp.png";
import "./Wilder.scss";
import moreHorizon from "../../assets/icons/moreHorizon.png";
import WilderCardOptions from "../WilderCardOptions/WilderCardOptions";
import { useState } from "react";
import { Wilder } from "../../data/types";

export default function WilderCard({
  id,
  firstName,
  lastName,
  description,
  picture,
  isTeacher,
  school,
  skills,
}: Wilder) {
  const [optionListClass, setOptionListClass] = useState(
    "WilderCardOptionsContainer"
  );

  const openWilderOptionsList = () => {
    setOptionListClass("WilderCardOptionsContainer OptionsDisplay");
  };

  const wilderCardOptionsCallback = (className: string) => {
    setOptionListClass(className);
  };

  return (
    <article className={isTeacher ? "WilderCard TeachCard" : "WilderCard"}>
      {isTeacher ? (
        <img
          className="WilderCardTeacherStamp"
          src={TeachStamp}
          alt="Teacher stamp"
        />
      ) : null}
      <img
        className="WilderCardOptionsIcon"
        src={moreHorizon}
        alt="options popup open icon"
        onClick={() => {
          openWilderOptionsList();
        }}
      />
      <WilderCardOptions
        dynamicClass={optionListClass}
        wilderId={id}
        callback={wilderCardOptionsCallback}
      />
      <img
        className="WilderCardPicture"
        src={picture}
        alt={`${firstName} ${lastName} profile`}
      />
      <h3 className="WilderCardName">
        {firstName} {lastName}
      </h3>
      <h4 className="WilderCardSchool">{school.schoolName}</h4>
      <p className="WilderCardDescription">{description}</p>
      <h4 className="WilderCardSkillsTitle">Wild Skills</h4>
      <ul className="WilderCardSkillsContainer">
        {skills.map((skill) => {
          return (
            <li className="WilderCardSkills" key={skill.id}>
              <Skills
                skillName={skill.skillName}
              />
            </li>
          );
        })}
      </ul>
    </article>
  );
}
