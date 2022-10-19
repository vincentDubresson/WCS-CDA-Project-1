//import React from 'react';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useQuery, useMutation } from "@apollo/client";

import Loader from "../../components/Loader/Loader";
import NoWilder from "../../components/NoWilder/NoWilder";
import WilderCard from "../../components/Wilder/Wilder";
import { CREATE_WILDER_PATH } from "../paths";
import { getErrorMessage } from "../../utils";
import { GET_WILDERS } from "../../services/queries";
import { DELETE_WILDER } from "../../services/mutations";
import "./Home.scss";

import {
  DeleteWilderMutation,
  DeleteWilderMutationVariables,
  GetWildersQuery,
} from "../../gql/graphql";

export default function Home() {
  const { data, loading, error, refetch } = useQuery<GetWildersQuery>(
    GET_WILDERS,
    { fetchPolicy: "cache-and-network" }
  );
  const [deleteOneWilder] = useMutation<
    DeleteWilderMutation,
    DeleteWilderMutationVariables
  >(DELETE_WILDER);

  const handleDeleteWilder = (deleteWilderId: string): void => {
    if (window.confirm("Êtes-vous sûr de supprimer ce wilder ?")) {
      (async () => {
        try {
          await deleteOneWilder({ variables: { deleteWilderId } });
          await refetch();
          toast.success(`Suppression réussie`);
        } catch (error) {
          toast.error(getErrorMessage(error));
        }
      })();
    }
  };

  const renderMainContent = () => {
    if (loading) {
      return <Loader />;
    }
    if (error) {
      return error.message;
    }
    if (!data?.wilders?.length) {
      return <NoWilder />;
    }
    return (
      <section className="CardsSection">
        {data?.wilders.map((wilder) => (
          <WilderCard
            key={wilder.id}
            id={wilder.id}
            firstName={wilder.firstName}
            lastName={wilder.lastName}
            description={wilder.description}
            picture={wilder.picture}
            isTeacher={wilder.isTeacher}
            school={wilder.school}
            skills={wilder.skills}
            handleDeleteWilder={handleDeleteWilder}
          />
        ))}
      </section>
    );
  };

  return (
    <>
      <h2 className="HomeTitle">Liste des Wilders</h2>
      <Link className="HomeCreateButtonLink" to={CREATE_WILDER_PATH}>
        <button className="HomeCreateButton">Ajouter un Wilder</button>
      </Link>
      {renderMainContent()}
      <ToastContainer />
    </>
  );
}
