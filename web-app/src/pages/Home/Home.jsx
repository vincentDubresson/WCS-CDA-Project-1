import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import NoWilder from '../../components/NoWilder/NoWilder';
import Wilder from "../../components/Wilder/Wilder";
import { CREATE_WILDER_PATH } from "../paths";
import { fetchWilders } from "./rest";
import './Home.scss';

export default function Home() {
  const [wildersList, setWildersList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const fetchedWilders = await fetchWilders();
        setWildersList(fetchedWilders);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const renderMainContent = () => {
    if (isLoading) {
      return <Loader />;
    }
    if (errorMessage) {
      return errorMessage;
    }
    if (!wildersList?.length) {
      return <NoWilder />;
    }
    return (
      <section className="CardsSection">
        {
          wildersList.map((wilder) => (
            <Wilder
              key={wilder.id}
              id={wilder.id}
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
    )
  }

  return (
    <>
      <h2 className="HomeTitle">Liste des Wilders</h2>
      <Link className="HomeCreateButtonLink" to={CREATE_WILDER_PATH}>
        <button className="HomeCreateButton">Ajouter un Wilder</button>
      </Link>
      {renderMainContent()}
    </>
  )
}