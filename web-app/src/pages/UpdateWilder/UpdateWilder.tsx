import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { HOME_PATH } from "../paths";
import { fetchWilder, updateWilder } from "./rest";

import "react-toastify/dist/ReactToastify.css";
import "./UpdateWilder.scss";
import { getErrorMessage } from "../../utils";
import { Wilder } from "../../data/types";

export default function UpdateWilder() {
  const { id } = useParams();
  const [wilderById, setWilderById] = useState<null | Wilder>(null);
  const [firstName, setFirstName] = useState(wilderById?.firstName);
  const [lastName, setLastName] = useState("");
  const [description, setDescription] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [isTeacher, setIsTeacher] = useState<null | boolean>(null);
  const skillPhp = "PHP";
  const [skillScorePhp, setSkillScorePhp] = useState<string | number>(1);
  const skillJs = "JS";
  const [skillScoreJs, setSkillScoreJs] = useState<string | number>(1);
  const skillJava = "java";
  const [skillScoreJava, setSkillScoreJava] = useState<string | number>(1);
  const skillPython = "Python";
  const [skillScorePython, setSkillScorePython] = useState<string | number>(1);
  const skillCSharp = "C#";
  const [skillScoreCsharp, setSkillScoreCsharp] = useState<string | number>(1);
  const skillRuby = "Ruby";
  const [skillScoreRuby, setSkillScoreRuby] = useState<string | number>(1);


  useEffect(() => {
    (async () => {
      try {
        const fetchedWilder = await fetchWilder(id);
        setWilderById(fetchedWilder);
      } catch (error) {
        console.log(getErrorMessage(error));
      }
    })();
  }, [id]);

  console.log({ wilderById });

  const skills = [
    {
      skillName: skillPhp,
      skillScore: skillScorePhp,
    },
    {
      skillName: skillJs,
      skillScore: skillScoreJs,
    },
    {
      skillName: skillJava,
      skillScore: skillScoreJava,
    },
    {
      skillName: skillPython,
      skillScore: skillScorePython,
    },
    {
      skillName: skillCSharp,
      skillScore: skillScoreCsharp,
    },
    {
      skillName: skillRuby,
      skillScore: skillScoreRuby,
    },
    {
      skillName: "C+",
      skillScore: 2,
    },
  ];

  const handleSubmit = async () => {
    try {
      console.log(skills);
      await updateWilder(
        firstName as string,
        lastName as string,
        description as string,
        isTeacher as boolean,
        schoolName as string,
        skills
      );
      toast.success(`Wilder ${firstName} ${lastName} créé avec succès.`);
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
          await handleSubmit();
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
              value={wilderById?.firstName}
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
              value={wilderById?.lastName}
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
              value={wilderById?.description}
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
              value={wilderById?.school.schoolName}
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
                  checked={wilderById?.isTeacher ? true : false}
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
                  checked={wilderById?.isTeacher === false ? true : false}
                />
              </label>
            </div>
          </div>
        </fieldset>
        <fieldset className="WilderFormFieldset TechFieldset">
          <legend className="WilderFormFieldsetLegend">
            Compétences techniques
          </legend>
          <div className="WilderFormRangeContainer">
            {wilderById?.skills.map((skill) => {
              return (
                <label className="WilderFormRangeLabel">
                  {skill.skillName}
                  <input type="hidden" defaultValue="PHP" name="skillName" />
                  <input
                    className="WilderFormRangeInput"
                    type="range"
                    name="skillScore"
                    min="1"
                    max="5"
                    step="1"
                    value="1"
                    onChange={(e) => {
                      setSkillScorePhp(e.target.value);
                    }}
                  />
                </label>
              );
            })}
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
