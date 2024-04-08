import { useContext } from 'react';
import { Context } from './context/StateContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function DataStats({ icon, total, title }) {
  const { isDarkMode } = useContext(Context);

  return (
    <div
      className={`${
        isDarkMode ? 'bg-mainPurple' : 'bg-[#fdfdfd]'
      } w-full h-32 flex justify-between gap-6 rounded-lg py-8 pl-6 pr-20`}
    >
      <div
        className={`text-grayerPurple ${
          isDarkMode ? 'bg-borderPurple' : 'bg-[#ededf1]'
        } w-12 h-12 flex justify-center items-center rounded-full`}
      >
        <FontAwesomeIcon icon={icon} className="text-xl p-4" />
      </div>

      <div className="min-w-full flex flex-col gap-2">
        <p
          className={`${
            isDarkMode ? 'text-white' : 'text-black font-medium'
          } text-2xl`}
        >
          {`$${total.toFixed(2)}`}
        </p>
        <p
          className={`${
            isDarkMode ? 'text-draft' : 'text-detailPurple'
          } font-light`}
        >
          {`Total ${title}`}
        </p>
      </div>
    </div>
  );
}
