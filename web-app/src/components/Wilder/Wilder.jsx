import Skill from '../Skill/Skill';
import './Wilder.scss';

export default function Wilder({
  firstName,
  lastName,
  description,
  picture,
  isTeacher,
  school,
  skills
}) {
  return(
    <article className={isTeacher ? "WilderCard TeachCard" : "WilderCard"}>
            <img className="WilderCardPicture" src={picture} alt={firstName + " " + lastName + " profile"} />
            <h3 className="WilderCardName">{firstName} {lastName} - {school}</h3>
            <p className="WilderCardDescription">
              {description}
            </p>
            <h4 className="WilderCardSkillsTitle">Wild Skills</h4>
            <ul className="WilderCardSkillsContainer">
              {
                skills.map((skill) => {
                  return (
                    <li className="WilderCardSkills" key={skill.id}>
                      <Skill name={skill.skillName} numberOfVotes="5" />
                    </li>
                  )
                })
              }
            </ul>
          </article>
  )
}