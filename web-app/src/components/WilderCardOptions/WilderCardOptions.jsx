import { Link } from "react-router-dom";
import './WilderCardOptions.scss';
import closeIcon from '../../assets/icons/closeDark.png';

export default function WilderCardOptions({ dynamicClass, wilderId, callback }) {
  
  const closeWilderOptionsList = () => {
    callback("WilderCardOptionsContainer");
  }

  return(
    <div className={dynamicClass}>
      <img
        className="WilderCardOptionsClose"
        src={closeIcon}
        alt="wilder options close icon"
        onClick={() => {closeWilderOptionsList()}}
        />
      <Link className="WilderCardOptionsLink" to={`/update-wilder/${wilderId}`}>Modifier le Wilder</Link>
      <Link className="WilderCardOptionsLink" to={`/delete-wilder/${wilderId}`}>Supprimer le Wilder</Link>
    </div>
  )
}