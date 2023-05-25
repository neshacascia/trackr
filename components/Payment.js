import Link from 'next/link';
import { useContext } from 'react';
import { Context } from './context/StateContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faAngleRight } from '@fortawesome/free-solid-svg-icons';

export default function Payment({
  type,
  id,
  clientName,
  invoiceDate,
  paymentTerms,
  items,
  status,
  merchant,
  referenceNo,
  expenseDueDate,
  expenseAmount,
}) {
  const { isDarkMode } = useContext(Context);

  const date = new Date(invoiceDate);

  let paymentPeriod;

  if (paymentTerms === 'Net 1 Day') {
    paymentPeriod = 1;
  } else if (paymentTerms === 'Net 7 Days') {
    paymentPeriod = 7;
  } else if (paymentTerms === 'Net 14 Days') {
    paymentPeriod = 14;
  } else {
    paymentPeriod = 30;
  }

  const paymentDueDate = new Date(
    date.getTime() + paymentPeriod * 25 * 60 * 60 * 1000
  );

  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };

  const formattedDate = paymentDueDate.toLocaleDateString('en-US', options);

  const expenseDateObj = new Date(`${expenseDueDate}T00:00:00.000Z`);
  const formattedExpenseDate = expenseDateObj.toLocaleString('default', {
    timeZone: 'UTC',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const totals =
    type === 'invoices'
      ? Array.from(items).reduce((acc, curr) => {
          return acc + Number(curr.total);
        }, 0)
      : Number(expenseAmount);

  const currentStatus = status[0].toLowerCase() + status.slice(1);
  const statusColours = {
    paid: 'text-paid bg-bgPaid',
    pending: 'text-pending bg-bgPending',
    draft: `${
      isDarkMode ? 'bg-bgDraft text-draft' : 'text-draftLight bg-bgDraftLight'
    }`,
  };

  return (
    <>
      <div
        className={`${
          isDarkMode ? 'bg-mainPurple' : 'bg-[#fdfdfd]'
        } flex flex-col gap-6 border-[1px] border-transparent rounded-lg px-6 py-6 hover:border-[1px] hover:border-brightPurple md:hidden`}
      >
        <Link
          href={`${
            type === 'invoices' ? `/invoices/${id}` : `/expenses/${id}`
          }`}
        >
          <div className="flex justify-between">
            <span className="font-medium">
              <span
                className={`${
                  isDarkMode ? 'text-lightPurple' : 'text-detailPurple'
                }`}
              >
                #
              </span>
              {referenceNo?.toUpperCase() || id.slice(-6).toUpperCase()}
            </span>
            <p
              className={`${
                isDarkMode ? 'text-white' : 'text-grayerPurple'
              } font-light`}
            >
              {type === 'invoices' ? clientName : merchant}
            </p>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p
                className={`${
                  isDarkMode ? 'text-draft' : 'text-detailPurple'
                } font-light`}
              >
                Due {type === 'invoices' ? formattedDate : formattedExpenseDate}
              </p>
              <span className="text-lg font-medium">${totals.toFixed(2)}</span>
            </div>

            <div
              className={`${statusColours[currentStatus]} flex items-center gap-2 rounded-md py-2.5 px-7`}
            >
              <FontAwesomeIcon
                icon={faCircle}
                className="text-[10px]"
              ></FontAwesomeIcon>
              <p className="font-medium pt-[1.5px]">{status}</p>
            </div>
          </div>
        </Link>
      </div>

      <div
        className={`${
          isDarkMode ? 'bg-mainPurple' : 'bg-[#fdfdfd]'
        } gap-6 border-[1px] border-transparent rounded-lg px-6 py-6 hover:border-[1px] hover:border-brightPurple hidden md:flex`}
      >
        <Link
          href={`${
            type === 'invoices' ? `/invoices/${id}` : `/expenses/${id}`
          }`}
          className="flex items-center justify-between w-full"
        >
          <span className="font-medium">
            <span
              className={`${
                isDarkMode ? 'text-lightPurple' : 'text-detailPurple'
              }`}
            >
              #
            </span>
            {id.slice(-6).toUpperCase()}
          </span>

          <p
            className={`${
              isDarkMode ? 'text-draft' : 'text-detailPurple'
            } font-light`}
          >
            Due {type === 'invoices' ? formattedDate : formattedExpenseDate}
          </p>
          <p
            className={`${
              isDarkMode ? 'text-white' : 'text-grayerPurple'
            } font-light`}
          >
            {type === 'invoices' ? clientName : merchant}
          </p>
          <span className="text-lg font-medium">${totals.toFixed(2)}</span>

          <div
            className={`${statusColours[currentStatus]} w-[104px] flex justify-center items-center gap-2 rounded-md py-2.5 px-7 -mr-5`}
          >
            <FontAwesomeIcon
              icon={faCircle}
              className="text-[10px]"
            ></FontAwesomeIcon>
            <p className="font-medium pt-[1.5px]">{status}</p>
          </div>

          <FontAwesomeIcon
            icon={faAngleRight}
            className="text-brightPurple"
          ></FontAwesomeIcon>
        </Link>
      </div>
    </>
  );
}
