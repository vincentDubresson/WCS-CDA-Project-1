import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./UpdateWilder.scss";

import { HOME_PATH } from "../paths";
import { fetchWilder, updateWilder } from "./rest";
import { getErrorMessage } from "../../utils";
import { SelectSkill, skills as skillArray } from "../../data/skills";
import { Skill } from "../../data/types";
import { Wilder } from "../../data/types";
import Skills from "../../components/Skill/Skill";

export default function UpdateWilder() {
  const { id } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [description, setDescription] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [isTeacher, setIsTeacher] = useState<null | boolean>(null);
  const [selectedSkills, setSelectedSkills] = useState<null | SelectSkill[]>(
    null
  );

  const skillFunction = (selectedSkills: SelectSkill[]): Skill[] => {
    let skills: any[] = [];
    selectedSkills.forEach((selectedSkill) => {
      skills.push({ skillName: `${selectedSkill.value}` });
    });
    return skills;
  };

  const prefillForm = (wilder: Wilder): void => {
    setFirstName(wilder.firstName);
    setLastName(wilder.lastName);
    setDescription(wilder.description);
    setSchoolName(wilder.school.schoolName);
    setIsTeacher(wilder.isTeacher);
    setSelectedSkills(
      ((wilderSkills) => {
        let skills: any[] = [];
        wilderSkills.forEach((skill) => {
          skills.push({ value: skill.skillName, label: skill.skillName });
        });
        return skills;
      })(wilder.skills)
    );
  };
  console.log(selectedSkills);

  useEffect(() => {
    (async () => {
      try {
        const fetchedWilder: Wilder = await fetchWilder(id);
        console.log(fetchedWilder);
        prefillForm(fetchedWilder);
      } catch (error) {
        console.log(getErrorMessage(error));
      }
    })();
  }, [id]);

  const handleSubmit = async () => {
      const skills: Skill[] = skillFunction(selectedSkills as SelectSkill[]);
    try {
      await updateWilder(
        id as string,
        firstName,
        lastName,
        description,
        isTeacher,
        schoolName,
        skills
      );
      toast.success(`Wilder ${firstName} ${lastName} modifié avec succès.`);
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
              onChange={(data) => {setSelectedSkills(data as SelectSkill[])}}
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
