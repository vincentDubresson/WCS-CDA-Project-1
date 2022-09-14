import Skill from '../Skill/Skill';
import './Wilder.scss';

export default function Wilder({
  firstName,
  lastName,
  description,
  picture,
  school,
  skills
}) {
  return(
    <article className="card">
            <img src={picture} alt={firstName + " " + lastName + " profile"} />
            <h3>{firstName} {lastName} - {school}</h3>
            <p>
              {description}
            </p>
            <h4>Wild Skills</h4>
            <ul className="skills">
              {
                skills.map((skill) => {
                  return (
                    <li key={skill.id}>
                      <Skill name={skill.skillName} numberOfVotes="5" />
                    </li>
                  )
                })
              }
            </ul>
          </article>
  )
}