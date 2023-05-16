import { useContext } from 'react';
import { Context } from './context/StateContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function DataStats({ icon, total, emails, title }) {
  const { isDarkMode } = useContext(Context);

  return (
    <div
      className={`${
        isDarkMode ? 'bg-mainPurple' : 'bg-white'
      } w-full h-32 flex justify-between gap-6 rounded-lg py-8 pl-6 pr-24`}
    >
      <FontAwesomeIcon
        icon={icon}
        className={`text-grayerPurple ${
          isDarkMode ? 'bg-borderPurple' : 'bg-[#ededf1]'
        } text-xl p-4 rounded-full`}
      />

      <div className="min-w-full flex flex-col gap-2">
        <p className={`${isDarkMode ? 'text-white' : 'text-black'} text-2xl`}>
          {total ? `$${total.toFixed(2)}` : emails}
        </p>
        <p
          className={`${
            isDarkMode ? 'text-draft' : 'text-detailPurple'
          } font-light`}
        >
          {title === 'Emails' ? `${title} Sent` : `Total ${title}`}
        </p>
      </div>
    </div>
  );
}
