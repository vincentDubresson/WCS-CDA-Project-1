import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import NoWilder from '../../components/NoWilder/NoWilder';
import Wilder from "../../components/Wilder/Wilder";
import './Home.scss';

export default function Home() {
  const [wildersList, setWildersList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/wilders');
      const fetchedWilders = await response.json();
      setWildersList(fetchedWilders);
      setIsLoading(false);
    })();
  }, []);

  console.log(wildersList);

  return (
    <>
      <h2 className="HomeTitle">Wilders</h2>
      <Link className="HomeCreateButtonLink" to="/create-wilder">
        <button className="HomeCreateButton">Créer un Wilder</button>
      </Link>
      {isLoading ?
        (
          <Loader />
        ) : (
          (wildersList.length) ? (
            <section className="CardsSection">
            {
              wildersList.map((wilder) => (
                <Wilder
                  key={wilder.id}
                  firstName={wilder.firstName}
                  lastName={wilder.lastName}
                  description={wilder.description}
                  picture={wilder.picture}
                  isTeacher={wilder.isTeacher}
                  school={wilder.school}
                  skills={wilder.skills}
                />
              ))
            }
            </section>
          ) : (
            <NoWilder />
          )
        ) 
      }
    </>
  )
}