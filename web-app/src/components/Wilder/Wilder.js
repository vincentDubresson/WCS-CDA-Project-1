import Skill from '../Skill/Skill';
import './Wilder.css';
import blank_profile from '../../assets/images/8bRN5ga.png';

export default function Wilder({ firstName, lastName, skills }) {
  return(
    <article className="card">
            <img src={blank_profile} alt={firstName + " " + lastName + " profile"} />
            <h3>{firstName} {lastName}</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
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