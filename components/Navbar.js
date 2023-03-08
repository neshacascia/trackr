import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  return (
    <nav className="text-white bg-mainPurple h-[72px] flex items-center">
      <div className="bg-nav bg-no-repeat w-20 h-full">
        <FontAwesomeIcon
          icon={faBars}
          className="text-white text-2xl pl-5 py-[22px]"
        ></FontAwesomeIcon>
      </div>

      <h1 className="font-spartan font-medium text-2xl tracking-wide ml-6 mr-auto">
        trackr
      </h1>

      <ul className="hidden">
        <li>
          <Link href="/"></Link>
        </li>
        <li>
          <Link href="/invoices">Invoices</Link>
        </li>
        <li>
          <Link href="/expenses">Expenses</Link>
        </li>
      </ul>

      <FontAwesomeIcon
        icon={faSun}
        className="text-lightPurple text-lg"
      ></FontAwesomeIcon>
      <div className="h-full border-lightPurple border-r-[1px] mx-6"></div>

      <img src="/assets/avatar.jpg" className="w-8 h-8 rounded-full mr-6" />
    </nav>
  );
}
