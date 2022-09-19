import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HOME_PATH } from '../paths';

import './UpdateWilder.scss';
import { fetchWilder, updateWilder } from './rest';
import { useEffect } from 'react';

export default function UpdateWilder() {
  const { id } = useParams();
  const [wilderById, setWilderById] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [description, setDescription] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [isTeacher, setIsTeacher] = useState(null);
  const skillPhp = "PHP";
  const [skillScorePhp, setSkillScorePhp] = useState(1);
  const skillJs = "JS";
  const [skillScoreJs, setSkillScoreJs] = useState(1);
  const skillJava = "java";
  const [skillScoreJava, setSkillScoreJava] = useState(1);
  const skillPython = "Python";
  const [skillScorePython, setSkillScorePython] = useState(1);
  const skillCSharp = "C#";
  const [skillScoreCsharp, setSkillScoreCsharp] = useState(1);
  const skillRuby = "Ruby";
  const [skillScoreRuby, setSkillScoreRuby] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        const fetchedWilder = await fetchWilder(id);
        setWilderById(fetchedWilder);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [id]);

  console.log(wilderById);

/*   useEffect(() => {
    (async () => {
      setFirstName(wilderById.firstName);
      setLastName(wilderById.lastName);
      setDescription(wilderById.description);
      setSchoolName(wilderById.school.schoolName);
      setIsTeacher(wilderById.isTeacher);
    })();
  }, [wilderById]); */
  
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
    }
  ];

  const handleSubmit = async () => {
    try {
      console.log(skills)
      await updateWilder(
        firstName,
        lastName,
        description,
        isTeacher,
        schoolName,
        skills
      );
      toast.success(`Wilder ${firstName} ${lastName} créé avec succès.`);
    } catch (error) {
      toast.error(error.message);
    }
  }

  return(
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
          <legend className="WilderFormFieldsetLegend">Informations d'usage</legend>
          <label className="WilderFormTextLabel">
            Prénom
            <input
              className="WilderFormTextInput"
              type="text"
              value={firstName}
              onChange={(e) => {setFirstName(e.target.value)}}
              required
            />
          </label>
          <label className="WilderFormTextLabel">
            Nom
            <input
              className="WilderFormTextInput"
              type="text"
              value={lastName}
              onChange={(e) => {setLastName(e.target.value)}}
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
            onChange={(e) => {setDescription(e.target.value)}}
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
          <legend className="WilderFormFieldsetLegend">Centre de formation</legend>
          <label className="WilderFormSelectLabel">
            Centre de Formation
            <select
              className="WilderFormSelect"
              value={schoolName}
              onChange={(e) => {setSchoolName(e.target.value)}}
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
                  onChange={() => {setIsTeacher(true)}}
                  checked={isTeacher ? "checked" : null}
                  required
                />
              </label>
              <label>
                Non
                <input
                  type="radio"
                  name="isTeacher"
                  onChange={() => {setIsTeacher(false)}}
                  checked={(isTeacher === false) ? "checked" : null}
                  />
              </label>
            </div>
          </div>
        </fieldset>
        <fieldset className="WilderFormFieldset TechFieldset">
          <legend className="WilderFormFieldsetLegend">Compétences techniques</legend>
            <div className="WilderFormRangeContainer">
              <label className="WilderFormRangeLabel">
                PHP
                <input type="hidden" defaultValue="PHP" name="skillName" />
                <input
                  className="WilderFormRangeInput"
                  type="range"
                  name="skillScore"
                  min="1"
                  max="5"
                  step="1"
                  value={skillScorePhp}
                  onChange={(e) => {setSkillScorePhp(e.target.value)}}
                />
              </label>
              <label className="WilderFormRangeLabel">
                Javascript
                <input type="hidden" defaultValue="JS" name="skillName" />
                <input
                  className="WilderFormRangeInput"
                  type="range"
                  name="skillScore"
                  min="1"
                  max="5"
                  step="1"
                  value={skillScoreJs}
                  onChange={(e) => {setSkillScoreJs(e.target.value)}}
                />
              </label>
            </div>
            <div className="WilderFormRangeContainer">
              <label className="WilderFormRangeLabel">
                Java
                <input type="hidden" defaultValue="Java" name="skillName" />
                <input
                  className="WilderFormRangeInput"
                  type="range"
                  name="skillScore"
                  min="1"
                  max="5"
                  step="1"
                  value={skillScoreJava}
                  onChange={(e) => {setSkillScoreJava(e.target.value)}}
                />
              </label>
              <label className="WilderFormRangeLabel">
                Python
                <input type="hidden" defaultValue="Python" name="skillName" />
                <input
                  className="WilderFormRangeInput"
                  type="range"
                  name="skillScore"
                  min="1"
                  max="5"
                  step="1"
                  value={skillScorePython}
                  onChange={(e) => {setSkillScorePython(e.target.value)}}
                />
              </label>
            </div>
            <div className="WilderFormRangeContainer">
              <label className="WilderFormRangeLabel">
                C#
                <input type="hidden" defaultValue="C#" name="skillName" />
                <input
                  className="WilderFormRangeInput"
                  type="range"
                  name="skillScore"
                  min="1"
                  max="5"
                  step="1"
                  value={skillScoreCsharp}
                  onChange={(e) => {setSkillScoreCsharp(e.target.value)}}
                />
              </label>
              <label className="WilderFormRangeLabel">
                Ruby
                <input type="hidden" defaultValue="Ruby" name="skillName" />
                <input
                  className="WilderFormRangeInput"
                  type="range"
                  name="skillScore"
                  min="1"
                  max="5"
                  step="1"
                  value={skillScoreRuby}
                  onChange={(e) => {setSkillScoreRuby(e.target.value)}}
                />
              </label>
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
  )
}