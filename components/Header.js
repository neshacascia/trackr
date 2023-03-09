import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDown,
  faAngleUp,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

export default function Header(props) {
  return (
    <header className="font-spartan w-screen h-11 flex items-center">
      <div className="mr-auto">
        <h2 className="text-xl font-medium">{props.title}</h2>
        <p>{props.title.toLowerCase()}</p>
      </div>

      <div className="flex items-center gap-3 mr-5">
        <label className="font-medium">Filter</label>
        <FontAwesomeIcon
          icon={faAngleDown}
          className="text-brightPurple"
        ></FontAwesomeIcon>
      </div>

      <button className="bg-brightPurple font-medium flex items-center gap-2 rounded-3xl p-2">
        <FontAwesomeIcon
          icon={faPlus}
          className="text-brightPurple bg-white rounded-full p-2.5"
        ></FontAwesomeIcon>
        <span className="pt-[1px] pr-2.5">New</span>
      </button>
    </header>
  );
}
