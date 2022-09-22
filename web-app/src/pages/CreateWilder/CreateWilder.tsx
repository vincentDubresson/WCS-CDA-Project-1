import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./CreateWilder.scss";

import { HOME_PATH } from "../paths";
import { createWilder } from "./rest";
import { getErrorMessage } from "../../utils";
import { skills as skillArray } from "../../data/skills";

export default function CreateWilder() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [description, setDescription] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [isTeacher, setIsTeacher] = useState<null | boolean>(null);
  const [selectedSkills, setSelectedSkills] = useState<any>(null);
  const navigate = useNavigate();

  const skillFunction = (selectedSkills: any[]) => {
    let skills: any = [];
    selectedSkills.forEach((selectedSkill) => {
      skills.push({ skillName: `${selectedSkill.value}` });
    });
    return skills;
  };

  const initializeForm = () => {
    setFirstName("");
    setLastName("");
    setDescription("");
    setIsTeacher(null);
    setSchoolName("");
    setSelectedSkills(null);
  };

  const handleSubmit = async () => {
    const skills: any = skillFunction(selectedSkills);
    try {
      await createWilder(
        firstName,
        lastName,
        description,
        isTeacher,
        schoolName,
        skills
      );
      toast.success(`Wilder ${firstName} ${lastName} créé avec succès.`);
      toast.success("Redirection vers la page d'accueil dans 5 secondes");
      initializeForm();
      setTimeout(() => {
        navigate("/");
      }, 6000);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <>
      <h2 className="CreateWilderTitle">Ajouter un Wilder</h2>
      <form
        className="WilderForm"
        onSubmit={async (e) => {
          e.preventDefault();
          selectedSkills ? await handleSubmit() : toast.error('Merci de choisir au moins une compétence technique.');
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
          {/*<label className="WilderFormFileLabel">
            Photo
            <input type="file" onChange={(e) => {selectedFile(e)}} />
          </label>*/}
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
              <option value="">Choisir une école</option>
              <option value="WCS-Lyon">WCS-Lyon</option>
              <option value="WCS-Paris">WCS-Paris</option>
              <option value="WCS-Bordeaux">WCS-Bordeaux</option>
              <option value="WCS-La-Loupe">WCS-La-Loupe</option>
            </select>
          </label>
          <div className="WilderFormRadioContainer">
            <p className="WilderFormRadioTitle">Est-tu un formateur ?</p>
            <div className="WilderFormRadio">
              <label>
                Oui
                <input
                  type="radio"
                  name="isTeacher"
                  onChange={() => {
                    setIsTeacher(true);
                  }}
                  checked={isTeacher === true}
                  required
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
              onChange={setSelectedSkills}
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
