import { MongoClient, ObjectId } from 'mongodb';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { Context } from '@/components/context/StateContext';
import EditInvoiceForm from '@/components/EditInvoiceForm';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

export default function EditInvoice(props) {
  const router = useRouter();

  const { isDarkMode } = useContext(Context);

  async function updateInvoiceHandler(invoiceData) {
    const res = await fetch('/api/update-invoice', {
      method: 'PUT',
      body: JSON.stringify(invoiceData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    console.log(data);

    router.back();
  }

  return (
    <main
      className={`${
        isDarkMode ? 'bg-darkPurple' : 'bg-lightBg'
      } h-full flex flex-col gap-6 px-6 pt-[72px]`}
    >
      <button
        onClick={() => router.back()}
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
        Edit{' '}
        <span
          className={`${
            isDarkMode ? 'text-boldGrayPurple' : 'text-grayPurple'
          }`}
        >
          #
        </span>
        {props.paymentData.id.slice(-6).toUpperCase()}
      </h2>

      <EditInvoiceForm
        updateInvoice={updateInvoiceHandler}
        invoiceData={props.paymentData}
        isDarkMode={isDarkMode}
      />
    </main>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(process.env.NEXT_PUBLIC_API_TOKEN);

  const db = client.db();
  const invoicesCollections = db.collection('invoices');

  const invoices = await invoicesCollections.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: invoices.map(invoice => ({
      params: { editInvoiceId: invoice._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const { editInvoiceId } = context.params;

  const client = await MongoClient.connect(process.env.NEXT_PUBLIC_API_TOKEN);

  const db = client.db();
  const invoicesCollections = db.collection('invoices');

  const selectedPayment = await invoicesCollections.findOne({
    _id: new ObjectId(editInvoiceId),
  });

  client.close();

  return {
    props: {
      paymentData: {
        id: selectedPayment._id.toString(),
        street: selectedPayment.street,
        city: selectedPayment.city,
        postal: selectedPayment.postal,
        country: selectedPayment.country,
        clientName: selectedPayment.clientName,
        clientEmail: selectedPayment.clientEmail,
        clientStreet: selectedPayment.clientStreet,
        clientCity: selectedPayment.clientCity,
        clientPostal: selectedPayment.clientPostal,
        clientCountry: selectedPayment.clientCountry,
        invoiceDate: selectedPayment.invoiceDate,
        paymentTerms: selectedPayment.paymentTerms,
        description: selectedPayment.description,
        status: selectedPayment.status,
        items: selectedPayment.items,
      },
    },
    revalidate: 30,
  };
}
