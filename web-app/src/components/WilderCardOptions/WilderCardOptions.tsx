import { Link } from "react-router-dom";
import "./WilderCardOptions.scss";
import closeIcon from "../../assets/icons/closeDark.png";

type PropType = {
  dynamicClass: string;
  wilderId: string;
  callback: Function;
  handleDeleteWilder: Function;
};

export default function WilderCardOptions({
  dynamicClass,
  wilderId,
  callback,
  handleDeleteWilder,
}: PropType) {
  const closeWilderOptionsList = () => {
    callback("WilderCardOptionsContainer");
  };

  return (
    <div className={dynamicClass}>
      <img
        className="WilderCardOptionsClose"
        src={closeIcon}
        alt="wilder options close icon"
        onClick={() => {
          closeWilderOptionsList();
        }}
      />
      <Link className="WilderCardOptionsLink" to={`/update-wilder/${wilderId}`}>
        Modifier le Wilder
      </Link>
      <button
        className="WilderCardDeleteButton"
        onClick={() => {
          callback("WilderCardOptionsContainer");
          handleDeleteWilder(wilderId);
        }}
      >
        Supprimer le Wilder
      </button>
    </div>
  );
}
