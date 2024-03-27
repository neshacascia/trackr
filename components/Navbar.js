import { useContext } from 'react';
import { Context } from './context/StateContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const { storeAuthValue, openMobileMenu, isDarkMode, toggleDarkMode } =
    useContext(Context);

  const pathname = usePathname();

  return (
    <nav
      className={`text-white ${
        isDarkMode ? 'bg-mainPurple' : 'bg-draftBtn'
      } w-full h-[72px] flex items-center fixed z-50`}
    >
      <div className="bg-nav bg-no-repeat w-20 h-full">
        {/* displayed when signed in */}
        <FontAwesomeIcon
          icon={faBars}
          className="text-white text-2xl pl-5 py-[22px] md:hidden cursor-pointer "
          onClick={openMobileMenu}
        ></FontAwesomeIcon>
        {/* displayed when signed in */}
      </div>

      <h1 className="font-medium text-2xl tracking-wide ml-6 mr-auto md:mr-20">
        trackr
      </h1>

      {/* displayed when signed in */}
      <ul className="hidden md:flex mr-auto gap-10">
        <li>
          <Link
            href="/dashboard"
            className={`${
              pathname.startsWith('/dashboard')
                ? 'text-[#9e8af1]'
                : 'hover:text-grayPurple'
            } text-lg font-normal tracking-wide`}
          >
            home
          </Link>
        </li>
        <li>
          <Link
            href="/invoices"
            className={`${
              pathname.startsWith('/invoices')
                ? 'text-[#9e8af1]'
                : 'hover:text-grayPurple'
            } text-lg font-normal tracking-wide`}
          >
            invoices
          </Link>
        </li>
        <li>
          <Link
            href="/expenses"
            className={`${
              pathname.startsWith('/expenses')
                ? 'text-[#9e8af1]'
                : 'hover:text-grayPurple'
            } text-lg font-normal tracking-wide`}
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
      {/* displayed when signed in */}

      {/* displayed when signed out */}
      <div className="flex items-center gap-8 ml-auto">
        <Link
          href="/auth"
          onClick={() => storeAuthValue('login')}
          className="hover:text-hoverPurple"
        >
          Login
        </Link>

        <Link
          href="/auth"
          onClick={() => storeAuthValue('signup')}
          className="bg-brightPurple rounded-3xl py-3 px-6 hover:bg-hoverPurple"
        >
          Sign up
        </Link>
      </div>
      {/* displayed when signed out */}

      {/* logout button */}
    </nav>
  );
}
