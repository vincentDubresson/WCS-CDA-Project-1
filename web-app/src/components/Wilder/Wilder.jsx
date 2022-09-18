import Skill from '../Skill/Skill';
import TeachStamp from '../../assets/images/TeacherStamp.png';
import './Wilder.scss';
import moreHorizon from '../../assets/icons/moreHorizon.png';
import WilderCardOptions from '../WilderCardOptions/WilderCardOptions';
import { useState } from 'react';

export default function Wilder({
  firstName,
  lastName,
  description,
  picture,
  isTeacher,
  school,
  skills
}) {
  const [optionListClass, setOptionListClass] = useState('WilderCardOptionsContainer');
  
  const openWilderOptionsList = () => {
    setOptionListClass('WilderCardOptionsContainer OptionsDisplay');  
  }

  const wilderCardOptionsCallback = (className) => {
    setOptionListClass(className);
  }

  return(
    <article className={isTeacher ? "WilderCard TeachCard" : "WilderCard"}>
      {isTeacher ? (
        <img className="WilderCardTeacherStamp" src={TeachStamp} alt="Teacher stamp" />
      ) : null}
      <img
        className="WilderCardOptionsIcon"
        src={moreHorizon}
        alt="options popup open icon"
        onClick={() => {openWilderOptionsList()}}
        />
      <WilderCardOptions
        dynamicClass={optionListClass}
        callback={wilderCardOptionsCallback}/>
      <img className="WilderCardPicture" src={picture} alt={`${firstName} ${lastName} profile`} />
      <h3 className="WilderCardName">{firstName} {lastName}</h3>
      <h4 className="WilderCardSchool">{school.schoolName}</h4>
      <p className="WilderCardDescription">
        {description}
      </p>
      <h4 className="WilderCardSkillsTitle">Wild Skills</h4>
      <ul className="WilderCardSkillsContainer">
        {
          skills.map((skill) => {
            return (
              <li className="WilderCardSkills" key={skill.id}>
                <Skill name={skill.skillName} numberOfVotes={isTeacher ? 5 : skill.skillScore} />
              </li>
            )
          })
        }
      </ul>
    </article>
  )
}