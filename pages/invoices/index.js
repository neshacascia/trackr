import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { Context } from '@/components/context/StateContext';
import Header from '@/components/Header';
import PaymentsList from '@/components/PaymentsList';
import NewInvoiceForm from '@/components/NewInvoiceForm';

export default function Invoices() {
  const { invoices, isDarkMode } = useContext(Context);

  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

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
    <>
      <Head>
        <title>Invoices</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main
        className={`${
          isDarkMode ? 'text-white bg-darkPurple' : 'text-lightText bg-lightBg'
        } font-spartan h-screen w-full flex flex-col items-center gap-8 pt-[72px]`}
      >
        <Header
          title="Invoices"
          payments={invoices}
          setShowModal={setShowModal}
        />
        <PaymentsList type="invoices" invoices={invoices} />

        {showModal && window.innerWidth >= 768 && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
            <div
              className={`${
                isDarkMode ? 'bg-darkPurple' : 'bg-lightBg'
              } rounded-r-lg w-full max-w-xl h-full p-6 my-14 lg:max-w-[719px]`}
              style={{ maxHeight: 'calc(100vh)', overflowY: 'auto' }}
            >
              <h2
                className={`${
                  isDarkMode ? 'text-white' : 'text-lightText'
                } text-3xl font-medium px-6 my-12`}
              >
                New Invoice
              </h2>
              <NewInvoiceForm
                isDarkMode={isDarkMode}
                showModal={showModal}
                setShowModal={setShowModal}
                addInvoice={addInvoiceHandler}
              />
            </div>
          </div>
        )}
      </main>
    </>
  );
}
