import { useRouter } from 'next/router';
import { useContext } from 'react';
import { Context } from '@/components/context/StateContext';
import NewInvoiceForm from '@/components/NewInvoiceForm';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

export default function NewPayment() {
  const router = useRouter();

  const { isDarkMode } = useContext(Context);

  async function addInvoiceHandler(enteredInvoiceData) {
    const res = await fetch('/api/new-invoice', {
      method: 'POST',
      body: JSON.stringify(enteredInvoiceData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = res.json();
    console.log(data);

    router.push('/invoices');
  }

  return (
    <main
      className={`${
        isDarkMode ? 'bg-darkPurple' : 'bg-lightBg'
      } h-full flex flex-col gap-6 px-6 pt-[72px]`}
    >
      <button
        onClick={() => router.push('/invoices')}
        className="flex items-center gap-6 pt-8"
      >
        <FontAwesomeIcon
          icon={faAngleLeft}
          className="text-brightPurple text-lg"
        ></FontAwesomeIcon>{' '}
        <p
          className={`${
            isDarkMode ? 'text-white' : 'text-lightText'
          } font-medium pt-[2px] hover:text-grayPurple`}
        >
          Go back
        </p>
      </button>

      <h2
        className={`${
          isDarkMode ? 'text-white' : 'text-lightText'
        } text-3xl font-medium`}
      >
        New Invoice
      </h2>

      <NewInvoiceForm addInvoice={addInvoiceHandler} />
    </main>
  );
}
