import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { Context } from './context/StateContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDown,
  faAngleUp,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

export default function Header({ title, payments }) {
  const router = useRouter();

  const [displayFilters, setDisplayFilters] = useState(false);

  const { isDarkMode, filterInvoices, setFilterInvoices } = useContext(Context);

  function filterInvoicesHandler(e) {
    if (!filterInvoices.includes(e.target.value)) {
      setFilterInvoices(prevState => [...prevState, e.target.value]);
    } else {
      setFilterInvoices(prevState =>
        prevState.filter(item => item !== e.target.value)
      );
    }
  }

  function createNewPayment() {
    if (title === 'Invoices') {
      router.push('/new-invoice');
    } else {
      router.push('/new-expense');
    }
  }

  return (
    <header className="w-screen h-11 flex items-center px-6">
      <div className="mr-auto">
        <h2 className="text-2xl font-medium">{title}</h2>
        <p
          className={`${
            isDarkMode ? 'text-white' : 'text-grayPurple'
          } font-light`}
        >
          {payments.length === 0
            ? 'No ' + title.toLowerCase()
            : payments.length === 1
            ? payments.length + ' ' + title.toLowerCase().slice(0, -1)
            : payments.length + ' ' + title.toLowerCase()}
        </p>
      </div>

      <div className="flex items-center gap-3 mr-5 hover:cursor-pointer">
        <div
          onClick={() => setDisplayFilters(prevState => !prevState)}
          className="flex items-center gap-3"
        >
          <label className="font-medium hover:cursor-pointer hover:text-grayPurple">
            Filter
          </label>
          {displayFilters ? (
            <FontAwesomeIcon
              icon={faAngleUp}
              className="text-brightPurple"
            ></FontAwesomeIcon>
          ) : (
            <FontAwesomeIcon
              icon={faAngleDown}
              className="text-brightPurple"
            ></FontAwesomeIcon>
          )}
        </div>

        {displayFilters && (
          <div
            className={`${
              isDarkMode ? 'bg-borderPurple' : 'text-lightText bg-white'
            } w-[192px] absolute top-[22%] right-[20%] flex flex-col gap-4 rounded-lg p-6`}
          >
            {title === 'Invoices' ? (
              <label
                htmlFor="draft"
                className="font-medium block relative pl-9 cursor-pointer"
              >
                <input
                  type="checkbox"
                  id="draft"
                  value="Draft"
                  onClick={e => filterInvoicesHandler(e)}
                  className="absolute w-0 h-0 cursor-pointer checkbox"
                />
                <span
                  className={`${
                    isDarkMode ? 'bg-mainPurple' : 'bg-draft'
                  } w-5 h-5 absolute top-0 left-0 rounded-sm border-[1px] border-transparent hover:border-brightPurple checkmark`}
                ></span>
                Draft
              </label>
            ) : (
              ''
            )}

            <label
              htmlFor="pending"
              className="font-medium block relative pl-9 cursor-pointer"
            >
              <input
                type="checkbox"
                id="pending"
                value="Pending"
                onClick={e => filterInvoicesHandler(e)}
                className="absolute w-0 h-0 cursor-pointer checkbox"
              />
              <span
                className={`${
                  isDarkMode ? 'bg-mainPurple' : 'bg-draft'
                } w-5 h-5 absolute top-0 left-0 rounded-sm border-[1px] border-transparent hover:border-brightPurple checkmark`}
              ></span>
              Pending
            </label>

            <label
              htmlFor="paid"
              className="font-medium block relative pl-9 cursor-pointer"
            >
              <input
                type="checkbox"
                id="paid"
                value="Paid"
                onClick={e => filterInvoicesHandler(e)}
                className="absolute w-0 h-0 cursor-pointer checkbox"
              />
              <span
                className={`${
                  isDarkMode ? 'bg-mainPurple' : 'bg-draft'
                } w-5 h-5 absolute top-0 left-0 rounded-sm border-[1px] border-transparent hover:border-brightPurple checkmark`}
              ></span>
              Paid
            </label>
          </div>
        )}
      </div>

      <button
        onClick={createNewPayment}
        className="bg-brightPurple font-medium flex items-center gap-2 rounded-3xl p-2 hover:bg-hoverPurple"
      >
        <FontAwesomeIcon
          icon={faPlus}
          className="text-brightPurple bg-white rounded-full p-2"
        ></FontAwesomeIcon>
        <span className="text-white pt-[1px] pr-2.5">New</span>
      </button>
    </header>
  );
}
