import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function DataStats(props) {
  return (
    <div className="bg-mainPurple h-32 flex justify-between gap-6 rounded-lg py-8 pl-8 pr-20">
      <div className="bg-borderPurple w-12 h-12 flex items-center justify-center rounded-full p-3">
        <FontAwesomeIcon
          icon={props.icon}
          className="text-grayerPurple text-xl"
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-white text-2xl">${}</p>
        <p className="text-draft font-light">Total {props.title}</p>
      </div>
    </div>
  );
}
