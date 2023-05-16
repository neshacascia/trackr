import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function DataStats(props) {
  return (
    <div className="bg-mainPurple h-32 flex justify-between gap-6 rounded-lg py-8 pl-6 pr-20">
      <FontAwesomeIcon
        icon={props.icon}
        className="text-grayerPurple bg-borderPurple text-xl p-4 rounded-full"
      />

      <div className="min-w-full flex flex-col gap-2">
        <p className="text-white text-2xl">${}</p>
        <p className="text-draft font-light">Total {props.title}</p>
      </div>
    </div>
  );
}
