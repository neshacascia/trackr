import { useRouter } from 'next/router';
import { useContext, useState, useEffect } from 'react';
import { Context } from './context/StateContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDown,
  faAngleUp,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

export default function Header({ title, payments, setShowModal }) {
  const router = useRouter();

  const [displayFilters, setDisplayFilters] = useState(false);

  const {
    isDarkMode,
    filterInvoices,
    setFilterInvoices,
    filterExpenses,
    setFilterExpenses,
  } = useContext(Context);

  useEffect(() => {
    setFilterInvoices([]);
    setFilterExpenses([]);
  }, [router.pathname]);

  function filterPaymentsHandler(e) {
    if (title === 'Invoices') {
      if (!filterInvoices.includes(e.target.value)) {
        setFilterInvoices(prevState => [...prevState, e.target.value]);
      } else {
        setFilterInvoices(prevState =>
          prevState.filter(item => item !== e.target.value)
        );
      }
    } else {
      if (!filterExpenses.includes(e.target.value)) {
        setFilterExpenses(prevState => [...prevState, e.target.value]);
      } else {
        setFilterExpenses(prevState =>
          prevState.filter(item => item !== e.target.value)
        );
      }
    }
  }

  function createNewPayment() {
    if (title === 'Invoices') {
      if (window.innerWidth >= 768) {
        setShowModal(true);
      } else {
        router.push('/invoices/new-invoice');
      }
    } else {
      if (window.innerWidth >= 768) {
        setShowModal(true);
      } else {
        router.push('/expenses/new-expense');
      }
    }
  }

  return (
    <header className="w-screen h-11 flex items-center mt-9 px-6 md:px-12 md:mt-14 xl:px-[252px]">
      <div className="mr-auto">
        <h2 className="text-2xl font-medium md:text-3xl md:mb-2">{title}</h2>
        <p
          className={`${
            isDarkMode ? 'text-white' : 'text-grayPurple'
          } font-light`}
        >
          <span className="hidden md:inline">
            There are&nbsp;
            {payments.length === 0
              ? 'no ' + title.toLowerCase()
              : payments.length === 1
              ? payments.length + ' ' + title.toLowerCase().slice(0, -1)
              : payments.length + ' ' + title.toLowerCase()}
          </span>

          <span className="md:hidden">
            {payments.length === 0
              ? 'No ' + title.toLowerCase()
              : payments.length === 1
              ? payments.length + ' ' + title.toLowerCase().slice(0, -1)
              : payments.length + ' ' + title.toLowerCase()}
          </span>
        </p>
      </div>

      <div className="flex items-center gap-3 mr-5 hover:cursor-pointer md:mr-10">
        <div
          onClick={() => setDisplayFilters(prevState => !prevState)}
          className="flex items-center gap-3"
        >
          <label className="font-medium hover:cursor-pointer hover:text-grayPurple">
            Filter <p className="hidden md:inline-block">by status</p>
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
            } w-[192px] absolute top-40 right-28 flex flex-col gap-4 rounded-lg p-6 md:top-48 md:right-52 xl:right-[400px]`}
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
                  onClick={e => filterPaymentsHandler(e)}
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
                onClick={e => filterPaymentsHandler(e)}
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
                onClick={e => filterPaymentsHandler(e)}
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
        <span className="text-white pt-[1px] pr-2.5">
          New <p className="hidden md:inline-block">{title.slice(0, -1)}</p>
        </span>
      </button>
    </header>
  );
}
