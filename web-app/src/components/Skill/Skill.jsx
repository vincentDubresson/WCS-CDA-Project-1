import './Skill.scss';

export default function Skill({ name, numberOfVotes }) {
  return(
    <>
      { name }
      <span className="votes">{ numberOfVotes }</span>
    </>

  )
}