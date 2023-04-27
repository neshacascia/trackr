import Link from 'next/link';
import { useContext } from 'react';
import { Context } from './context/StateContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function MobileMenuModal() {
  const { toggleMenu, closeMobileMenu } = useContext(Context);

  return (
    <>
      {toggleMenu && (
        <div className="bg-[rgba(0,0,0,0.4)] h-screen fixed inset-0 z-50">
          <div className="text-white bg-mainPurple w-[60%] h-screen flex flex-col justify-center items-center">
            <FontAwesomeIcon
              icon={faXmark}
              onClick={closeMobileMenu}
              className="text-xl absolute right-[45%] top-[5%] cursor-pointer"
            ></FontAwesomeIcon>

            <ul className="text-2xl flex flex-col gap-6">
              <li>
                <Link href="/">home</Link>
              </li>
              <li>
                <Link href="/invoices">invoices</Link>
              </li>
              <li>
                <Link href="/expenses">expenses</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
