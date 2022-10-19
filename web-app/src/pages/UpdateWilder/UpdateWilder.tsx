import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import { useMutation, useQuery } from "@apollo/client";

import { HOME_PATH } from "../paths";
import { getErrorMessage } from "../../utils";
import { SelectSkill, skills as skillArray } from "../../data/skills";
import {
  UpdateWilderMutation,
  UpdateWilderMutationVariables,
  WilderQuery,
  WilderQueryVariables,
} from "../../gql/graphql";
import { GET_WILDER } from "../../services/queries";
import { UPDATE_WILDER } from "../../services/mutations";

import "react-toastify/dist/ReactToastify.css";
import "./UpdateWilder.scss";

export default function UpdateWilder() {
  const { id } = useParams();
  const wilderId = id as string;
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [picture, setPicture] = useState<string>("");
  const [schoolName, setSchoolName] = useState<string>("");
  const [isTeacher, setIsTeacher] = useState<boolean>(false);
  const [selectedSkills, setSelectedSkills] = useState<null | SelectSkill[]>(
    null
  );

  function GetWilder(wilderId: string): WilderQuery {
    const { data } = useQuery<WilderQuery, WilderQueryVariables>(GET_WILDER, {
      variables: { wilderId },
    });
    return data as WilderQuery;
  }

  const fetchedWilder = GetWilder(wilderId) as WilderQuery;

  const [updateWilder] = useMutation<
    UpdateWilderMutation,
    UpdateWilderMutationVariables
  >(UPDATE_WILDER);

  const skillFunction = (selectedSkills: SelectSkill[]): string[] => {
    let skills: string[] = [];
    selectedSkills.forEach((selectedSkill) => {
      skills.push(`${selectedSkill.value}`);
    });
    return skills;
  };

  const prefillForm = (wilder: WilderQuery): void => {
    setFirstName(wilder.wilder.firstName);
    setLastName(wilder.wilder.lastName);
    setDescription(wilder.wilder.description);
    setSchoolName(wilder.wilder.school.schoolName);
    setPicture(wilder.wilder.picture);
    setIsTeacher(wilder.wilder.isTeacher);
    setSelectedSkills(
      ((wilderSkills) => {
        let skills: any[] = [];
        wilderSkills.forEach((skill) => {
          skills.push({ value: skill.skillName, label: skill.skillName });
        });
        return skills;
      })(wilder.wilder.skills)
    );
  };

  useEffect(() => {
    (async () => {
      try {
        prefillForm(fetchedWilder);
      } catch (error) {
        console.log(getErrorMessage(error));
      }
    })();
  }, [fetchedWilder]);

  const handleSubmit = async () => {
    const skills: string[] = skillFunction(selectedSkills as SelectSkill[]);
    const updateWilderId = id as string;
    console.log({
      id,
      firstName,
      lastName,
      description,
      picture,
      isTeacher,
      schoolName,
      skills,
    });
    try {
      await updateWilder({
        variables: {
          updateWilderId,
          firstName,
          lastName,
          description,
          picture,
          isTeacher,
          schoolName,
          skills,
        },
      });
      toast.success(`Wilder ${firstName} ${lastName} modifié avec succès.`);
      toast.success("Redirection vers la page d'accueil dans 5 secondes");
      setTimeout(() => {
        navigate("/");
      }, 6000);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <>
      <h2 className="UpdateWilderTitle">Modifier un Wilder</h2>
      <form
        className="WilderForm"
        onSubmit={async (e) => {
          e.preventDefault();
          selectedSkills
            ? await handleSubmit()
            : toast.error(
                "Merci de choisir au moins une compétence technique."
              );
        }}
      >
        <fieldset className="WilderFormFieldset InfoFieldset">
          <legend className="WilderFormFieldsetLegend">
            Informations d'usage
          </legend>
          <label className="WilderFormTextLabel">
            Prénom
            <input
              className="WilderFormTextInput"
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              required
            />
          </label>
          <label className="WilderFormTextLabel">
            Nom
            <input
              className="WilderFormTextInput"
              type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              required
            />
            <input type="hidden" value={picture} />
          </label>
        </fieldset>
        <fieldset className="WilderFormFieldset DetailsFieldset">
          <legend className="WilderFormFieldsetLegend">Détails</legend>
          <label className="WilderFormTextareaLabel">
            Biographie
            <textarea
              className="WilderFormTextarea"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              required
            ></textarea>
          </label>
          {/* PRENDRE EN CHARGE L'IMPORT D'IMAGES */}
          {/* <label className="WilderFormFileLabel">
            Photo
            <input
              type="file"
              value="aaa"
            />
          </label> */}
        </fieldset>

        <fieldset className="WilderFormFieldset SchoolFieldset">
          <legend className="WilderFormFieldsetLegend">
            Centre de formation
          </legend>
          <label className="WilderFormSelectLabel">
            Centre de Formation
            <select
              className="WilderFormSelect"
              value={schoolName}
              onChange={(e) => {
                setSchoolName(e.target.value);
              }}
              required
            >
              <option defaultValue="">Choisir une école</option>
              <option defaultValue="WCS-Lyon">WCS-Lyon</option>
              <option defaultValue="WCS-Paris">WCS-Paris</option>
              <option defaultValue="WCS-Bordeaux">WCS-Bordeaux</option>
              <option defaultValue="WCS-La-Loupe">WCS-La-Loupe</option>
            </select>
          </label>
          <div className="WilderFormRadioContainer">
            <p className="WilderFormRadioTitle">Est-tu un formateur ?</p>
            <div className="WilderFormRadio">
              <label>
                Oui
                <input
                  type="radio"
                  name="true"
                  onChange={() => {
                    setIsTeacher(true);
                  }}
                  checked={isTeacher === true}
                />
              </label>
              <label>
                Non
                <input
                  type="radio"
                  name="isTeacher"
                  onChange={() => {
                    setIsTeacher(false);
                  }}
                  checked={isTeacher === false}
                />
              </label>
            </div>
          </div>
        </fieldset>
        <fieldset className="WilderFormFieldset TechFieldset">
          <legend className="WilderFormFieldsetLegend">
            Compétences techniques
          </legend>
          <div style={{ zIndex: "3" }}>
            <Select
              options={skillArray}
              value={selectedSkills}
              onChange={(data) => {
                setSelectedSkills(data as SelectSkill[]);
              }}
              isMulti
            />
          </div>
        </fieldset>
        <div className="WilderFormButtonsContainer">
          <button className="WilderFormButton">Envoyer</button>
          <Link to={HOME_PATH}>
            <button className="WilderFormButton">Annuler</button>
          </Link>
        </div>
      </form>
      <ToastContainer />
    </>
  );
}
