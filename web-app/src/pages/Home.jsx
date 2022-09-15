import Wilder from "../components/Wilder/Wilder";
import { WILDERS } from '../data/wilders';
import './Home.scss';

export default function Home() {
  return (
    <>
      <h2 className="HomeTitle">Wilders</h2>
      <section className="CardsSection">
        {
          WILDERS.map((wilder) => (
            <Wilder
              key={wilder.id}
              firstName={wilder.firstName}
              lastName={wilder.lastName}
              description={wilder.description}
              picture={wilder.picture}
              school={wilder.school}
              skills={wilder.skills}
            />
          ))
        }
      </section>
    </>
  )
}