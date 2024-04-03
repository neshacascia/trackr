import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';
import { Context } from './context/StateContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function MobileMenuModal() {
  const { isDarkMode, toggleMenu, closeMobileMenu } = useContext(Context);

  const pathname = usePathname();

  return (
    <>
      {toggleMenu && (
        <div className="bg-[rgba(0,0,0,0.4)] h-screen fixed inset-0 z-50">
          <div
            className={`text-white ${
              isDarkMode ? 'bg-mainPurple' : 'bg-draftBtn'
            } w-[60%] h-full flex flex-col justify-center items-center`}
          >
            <FontAwesomeIcon
              icon={faXmark}
              onClick={closeMobileMenu}
              className="text-xl absolute right-[45%] top-[5%] cursor-pointer hover:text-grayPurple"
            ></FontAwesomeIcon>

            <ul className="text-2xl tracking-wide flex flex-col gap-6">
              <li>
                <Link
                  href="/dashboard"
                  onClick={closeMobileMenu}
                  className={`${
                    pathname.endsWith('/')
                      ? 'text-[#9e8af1]'
                      : 'hover:text-grayPurple'
                  }`}
                >
                  dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/invoices"
                  onClick={closeMobileMenu}
                  className={`${
                    pathname.startsWith('/invoices')
                      ? 'text-[#9e8af1]'
                      : 'hover:text-grayPurple'
                  }`}
                >
                  invoices
                </Link>
              </li>
              <li>
                <Link
                  href="/expenses"
                  onClick={closeMobileMenu}
                  className={`${
                    pathname.startsWith('/expenses')
                      ? 'text-[#9e8af1]'
                      : 'hover:text-grayPurple'
                  }`}
                >
                  expenses
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
