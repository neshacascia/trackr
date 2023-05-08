import { useRouter } from 'next/router';
import { useState, useContext } from 'react';
import { Context } from './context/StateContext';
import DeleteConfirmationModal from './DeleteConfirmationModal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faCircle } from '@fortawesome/free-solid-svg-icons';

export default function PaymentDetail({ type, data, expenseData }) {
  const router = useRouter();

  const { isDarkMode } = useContext(Context);

  const currentStatus =
    data?.status[0].toLowerCase() + data?.status.slice(1) ||
    expenseData.status[0].toLowerCase() + expenseData.status.slice(1);
  const statusColours = {
    paid: 'bg-bgPaid text-paid',
    pending: 'bg-bgPending text-pending',
    draft: `${
      isDarkMode ? 'bg-bgDraft text-draft' : 'text-draftLight bg-bgDraftLight'
    }`,
  };

  const date = type === 'invoices' ? new Date(data.invoiceDate) : '';

  let paymentPeriod;

  if (type === 'invoices') {
    if (data.paymentTerms === 'Net 1 Day') {
      paymentPeriod = 1;
    } else if (data.paymentTerms === 'Net 7 Days') {
      paymentPeriod = 7;
    } else if (data.paymentTerms === 'Net 14 Days') {
      paymentPeriod = 14;
    } else {
      paymentPeriod = 30;
    }
  }

  const paymentDueDate =
    type === 'invoices'
      ? new Date(date.getTime() + paymentPeriod * 25 * 60 * 60 * 1000)
      : '';

  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };

  const invoiceDate =
    type === 'invoices' ? date.toLocaleDateString('en-US', options) : '';
  const formattedDate =
    type === 'invoices'
      ? paymentDueDate.toLocaleDateString('en-US', options)
      : '';

  const expenseDateObj = new Date(
    `${expenseData?.expenseDueDate}T00:00:00.000Z`
  );
  const formattedExpenseDate = expenseDateObj.toLocaleString('default', {
    timeZone: 'UTC',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const totals =
    type === 'invoices'
      ? Array.from(data.items).reduce((acc, curr) => {
          return acc + Number(curr.total);
        }, 0)
      : '';

  function editPaymentHandler() {
    if (type === 'invoices') {
      router.push(`/invoices/edit/${data?.id}`);
    } else {
      router.push(`/expenses/edit/${expenseData.id}`);
    }
  }

  const [deletePayment, setDeletePayment] = useState(false);

  async function deletePaymentHandler() {
    const res = await fetch(`/api/update-${type.slice(0, -1)}`, {
      method: 'DELETE',
      body: JSON.stringify(data?.id || expenseData.id),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseData = await res.json();
    console.log(responseData);

    router.push(`/${type}`);
  }

  async function markAsPaidHandler() {
    const res = await fetch(`/api/update-${type.slice(0, -1)}`, {
      method: 'POST',
      body: JSON.stringify(data?.id || expenseData.id),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseData = await res.json();
    console.log(responseData);

    router.push(`/${type}`);
  }

  async function updateToPendingHandler() {
    if (type === 'invoices') {
      const res = await fetch('/api/new-invoice', {
        method: 'PUT',
        body: JSON.stringify(data.id),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseData = await res.json();
      console.log(responseData);

      router.push('/invoices');
    }
  }

  return (
    <>
      <main
        className={`${
          isDarkMode ? 'bg-darkPurple' : 'bg-lightBg'
        } h-full flex flex-col gap-6 px-6 pb-14`}
      >
        <button
          onClick={() => router.push(`/${type}`)}
          className="flex items-center gap-6 pt-8"
        >
          <FontAwesomeIcon
            icon={faAngleLeft}
            className="text-brightPurple text-lg"
          ></FontAwesomeIcon>{' '}
          <p
            className={`${
              isDarkMode
                ? 'text-white hover:text-grayPurple'
                : 'lightText hover:text-detailPurple'
            } font-medium pt-[2px]`}
          >
            Go back
          </p>
        </button>

        <section
          className={`${
            isDarkMode ? 'bg-mainPurple' : 'bg-white'
          } h-[91px] flex items-center justify-between rounded-lg px-6`}
        >
          <span
            className={`${
              isDarkMode ? 'text-white' : 'text-grayerPurple'
            } font-light py-10`}
          >
            Status
          </span>
          <div
            className={`${statusColours[currentStatus]} flex items-center gap-2 rounded-md py-2.5 px-7`}
          >
            <FontAwesomeIcon
              icon={faCircle}
              className="text-[10px]"
            ></FontAwesomeIcon>
            <p className="font-medium pt-[1.5px]">
              {data?.status || expenseData.status}
            </p>
          </div>
        </section>

        <section
          className={`text-white ${
            isDarkMode ? 'bg-mainPurple' : 'bg-white'
          } flex flex-col gap-[30px] rounded-lg p-6`}
        >
          <div className="flex justify-between">
            <div className="flex flex-col">
              <span
                className={`${
                  isDarkMode ? 'text-white' : 'text-lightText'
                } font-medium`}
              >
                <span className="text-detailPurple font-medium">#</span>
                {data?.id.slice(-6).toUpperCase() ||
                  expenseData.referenceNo.toUpperCase()}
              </span>
              <span
                className={`${
                  isDarkMode ? 'text-draft' : 'text-detailPurple'
                } font-light`}
              >
                {data?.description || expenseData.notes}
              </span>
            </div>

            <span className="font-light">{expenseData?.expenseCategory}</span>
          </div>

          {type === 'invoices' ? (
            <div
              className={`${
                isDarkMode ? 'text-draft' : 'text-detailPurple'
              } font-light flex flex-col`}
            >
              <span>{data?.street}</span>
              <span>{data?.city}</span>
              <span>{data?.postal}</span>
              <span>{data?.country}</span>
            </div>
          ) : (
            <div
              className={`${
                isDarkMode ? 'text-draft' : 'text-detailPurple'
              } font-light flex flex-col`}
            >
              <span>Account Number</span>
              <span
                className={`${
                  isDarkMode ? 'text-white' : 'text-lightText'
                } text-[19px] font-medium`}
              >
                {expenseData?.accountNo}
              </span>
            </div>
          )}

          <div className="flex gap-10">
            <div className="flex flex-col gap-8">
              {type === 'invoices' ? (
                <div className="flex flex-col">
                  <span
                    className={`${
                      isDarkMode ? 'text-draft' : 'text-detailPurple'
                    } font-light mb-3`}
                  >
                    Invoice Date
                  </span>

                  <span
                    className={`${
                      isDarkMode ? 'text-white' : 'text-lightText'
                    } text-[19px] font-medium`}
                  >
                    {invoiceDate}
                  </span>
                </div>
              ) : (
                ''
              )}

              <div className="flex flex-col">
                <span
                  className={`${
                    isDarkMode ? 'text-draft' : 'text-detailPurple'
                  } font-light mb-3`}
                >
                  Payment Due
                </span>
                <span
                  className={`${
                    isDarkMode ? 'text-white' : 'text-lightText'
                  } text-[19px] font-medium`}
                >
                  {formattedDate || formattedExpenseDate}
                </span>
              </div>
            </div>

            <div
              className={`${
                isDarkMode ? 'text-draft' : 'text-detailPurple'
              } flex flex-col`}
            >
              <span
                className={`${
                  isDarkMode ? 'text-draft' : 'text-detailPurple'
                } font-light mb-3`}
              >
                Bill To
              </span>
              <span
                className={`${
                  isDarkMode ? 'text-white' : 'text-lightText'
                } text-[19px] font-medium mb-2`}
              >
                {data?.clientName || expenseData.merchant}
              </span>
              <span className="font-light">{data?.clientStreet}</span>
              <span className="font-light">{data?.clientCity}</span>
              <span className="font-light">{data?.clientPostal}</span>
              <span className="font-light">{data?.clientCountry}</span>
            </div>
          </div>

          {type === 'invoices' ? (
            <div className="flex flex-col">
              <span
                className={`${
                  isDarkMode ? 'text-draft' : 'text-detailPurple'
                } font-light mb-3`}
              >
                Sent to
              </span>
              <span
                className={`${
                  isDarkMode ? 'text-white' : 'text-lightText'
                } text-[19px] font-medium`}
              >
                {data.clientEmail}
              </span>
            </div>
          ) : (
            ''
          )}

          <section>
            <div
              className={`${
                isDarkMode ? 'bg-borderPurple' : 'bg-grey'
              } flex flex-col gap-6 rounded-t-lg p-6`}
            >
              {type === 'invoices' ? (
                data?.items.map((item, ind) => (
                  <div
                    key={ind}
                    className={`${
                      isDarkMode ? 'text-white' : 'text-lightText'
                    } font-medium flex justify-between items-center`}
                  >
                    <div className="flex flex-col">
                      <span>{item.itemName}</span>
                      <span
                        className={`${
                          isDarkMode ? 'text-grayPurple' : 'text-detailPurple'
                        }`}
                      >{`${item.quantity} x ${
                        item.price ? item.price.toFixed(2) : ''
                      }`}</span>
                    </div>
                    <span>${item.total?.toFixed(2)}</span>
                  </div>
                ))
              ) : (
                <div
                  className={`${
                    isDarkMode ? 'text-white' : 'text-lightText'
                  } font-medium flex justify-between items-center`}
                >
                  {expenseData.accountType}
                </div>
              )}
            </div>
            <div
              className={`${
                isDarkMode ? 'bg-black' : 'bg-draftLight'
              } flex justify-between items-center rounded-b-lg px-6 py-[30px]`}
            >
              <span className="font-light">Amount Due</span>
              <span className="text-2xl font-medium">
                $
                {type === 'invoices'
                  ? totals.toFixed(2)
                  : expenseData.expenseAmount}
              </span>
            </div>
          </section>
        </section>
      </main>

      <footer
        className={`${
          isDarkMode ? 'bg-mainPurple' : 'bg-white'
        } h-[91px] flex items-center gap-2 px-6`}
      >
        <button
          type="button"
          onClick={editPaymentHandler}
          className={`${
            isDarkMode
              ? 'text-draft bg-borderPurple hover:text-detailPurple hover:bg-white'
              : 'text-detailPurple bg-grey hover:text-detailPurple hover:bg-draft'
          } font-medium w-full rounded-3xl py-4 px-[18px]`}
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => setDeletePayment(true)}
          className="text-white bg-deleteBtn font-medium w-full rounded-3xl py-4 px-[18px] hover:bg-hoverRed"
        >
          Delete
        </button>
        {data?.status === 'Pending' && (
          <button
            onClick={markAsPaidHandler}
            className="text-white bg-brightPurple font-medium w-full rounded-3xl py-4 px-[18px] hover:bg-hoverPurple"
          >
            Mark as Paid
          </button>
        )}
        {expenseData?.status === 'Pending' && (
          <button
            onClick={markAsPaidHandler}
            className="text-white bg-brightPurple font-medium w-full rounded-3xl py-4 px-[18px] hover:bg-hoverPurple"
          >
            Mark as Paid
          </button>
        )}
        {data?.status === 'Draft' && (
          <button
            onClick={updateToPendingHandler}
            className="text-white bg-brightPurple font-medium w-full rounded-3xl py-4 px-[18px] hover:bg-hoverPurple"
          >
            Save & Send
          </button>
        )}
      </footer>
      <DeleteConfirmationModal
        deletePayment={deletePayment}
        id={data?.id || expenseData.id}
        referenceNo={expenseData?.referenceNo}
        setDeletePayment={setDeletePayment}
        deletePaymentHandler={deletePaymentHandler}
        isDarkMode={isDarkMode}
      />
    </>
  );
}
