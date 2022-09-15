import { useState } from 'react';

export default function CreateWilder() {

  return(
    <>
      <h2 className="CreateWilderTitle">Ajouter un Wilder</h2>
      <form>
        <fieldset>
          <legend>Comment t'appelles-tu ?</legend>
          <label>
            Prénom
            <input
              type="text"
              value=""
              onChange=""
            />
          </label>
          <label>
            Nom
            <input
              type="text"
              value=""
              onChange=""
            />
          </label>
        </fieldset>
        <fieldset>
          <legend>Qui est-tu ?</legend>
          <label>
          Biographie
          <textarea
            value=""
            onChange=""
          ></textarea>
          </label>
          <label>
            Uploader une photo
            <input
              type="file"
              value=""
              onChange=""
            />
          </label>
        </fieldset>

        <fieldset>
          <legend>Quel est ton centre de formation ?</legend>
          <label>
            Centre de Formation
            <select>
              <option>Choisir une école</option>
              <option>WCS-Lyon</option>
              <option>WCS-Paris</option>
              <option>WCS-Bordeaux</option>
              <option>WCS-La-Loupe</option>
            </select>
          </label>
          <div>
            <p>Est-tu un formateur ?</p>
            <label>
              Oui
              <input
                type="radio"
                />
            </label>
            <label>
              Non
              <input
                type="radio"
                />
            </label>
          </div>
        </fieldset>
        <fieldset>
          <legend>Tes compétences techniques</legend>
            <div>
              <label>
                PHP
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                />
              </label>
              <label>
                Javascript
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                />
              </label>
              <label>
                Java
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                />
              </label>
            </div>
            <div>
              <label>
                Python
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                />
              </label>
              <label>
                C#
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                />
              </label>
              <label>
                Ruby
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                />
              </label>
            </div>
        </fieldset>
        <div>
          <button>Envoyer</button>
          <button>Annuler</button>
        </div>
      </form>
    </>
  )
}