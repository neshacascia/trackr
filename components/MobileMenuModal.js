import Link from 'next/link';
import { useContext } from 'react';
import { Context } from './context/StateContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function MobileMenuModal() {
  const { toggleMenu } = useContext(Context);

  return (
    <>
      {toggleMenu && (
        <div>
          <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>

          <ul>
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
      )}
    </>
  );
}
