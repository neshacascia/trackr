import { useContext } from 'react';
import { Context } from './context/StateContext';
import Link from 'next/link';
import Image from 'next/image';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const { openMobileMenu, isDarkMode, toggleDarkMode } = useContext(Context);

  return (
    <nav
      className={`text-white ${
        isDarkMode ? 'bg-mainPurple' : 'bg-draftBtn'
      } w-full h-[72px] flex items-center fixed z-50`}
    >
      <div className="bg-nav bg-no-repeat w-20 h-full">
        <FontAwesomeIcon
          icon={faBars}
          className="text-white text-2xl pl-5 py-[22px] md:hidden cursor-pointer "
          onClick={openMobileMenu}
        ></FontAwesomeIcon>
      </div>

      <h1 className="font-medium text-2xl tracking-wide ml-6 mr-auto md:mr-20">
        trackr
      </h1>

      <ul className="hidden md:flex mr-auto gap-10">
        <li>
          <Link
            href="/"
            className="text-lg font-normal tracking-wide hover:text-grayPurple"
          >
            home
          </Link>
        </li>
        <li>
          <Link
            href="/invoices"
            className="text-lg font-normal tracking-wide hover:text-grayPurple"
          >
            invoices
          </Link>
        </li>
        <li>
          <Link
            href="/expenses"
            className="text-lg font-normal tracking-wide hover:text-grayPurple"
          >
            expenses
          </Link>
        </li>
      </ul>

      {isDarkMode ? (
        <FontAwesomeIcon
          icon={faSun}
          onClick={toggleDarkMode}
          className="text-lightPurple text-lg cursor-pointer"
        ></FontAwesomeIcon>
      ) : (
        <FontAwesomeIcon
          icon={faMoon}
          onClick={toggleDarkMode}
          className={`${
            isDarkMode ? 'text-lightPurple' : 'text-detailPurple'
          } text-lg cursor-pointer`}
        ></FontAwesomeIcon>
      )}

      <div className="h-full border-lightPurple border-r-[1px] mx-6"></div>

      <Image
        src="/assets/avatar.jpg"
        width={32}
        height={32}
        alt="Profile picture"
        className="rounded-full mr-6"
      />
    </nav>
  );
}
