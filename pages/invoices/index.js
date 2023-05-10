import { MongoClient } from 'mongodb';
import { useContext } from 'react';
import { Context } from '@/components/context/StateContext';
import Header from '@/components/Header';
import PaymentsList from '@/components/PaymentsList';

export default function Invoices(props) {
  const { isDarkMode } = useContext(Context);

  return (
    <main
      className={`${
        isDarkMode ? 'text-white bg-darkPurple' : 'text-lightText bg-lightBg'
      } font-spartan h-screen w-full flex flex-col items-center gap-8 pt-[72px]`}
    >
      <Header title="Invoices" payments={props.invoices} />
      <PaymentsList type="invoices" invoices={props.invoices} />
    </main>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(process.env.NEXT_PUBLIC_API_TOKEN);

  const db = client.db();
  const invoicesCollections = db.collection('invoices');

  const invoices = await invoicesCollections.find().toArray();

  client.close();

  return {
    props: {
      invoices: invoices.map(invoice => ({
        id: invoice._id.toString(),
        street: invoice.street,
        city: invoice.city,
        postal: invoice.postal,
        country: invoice.country,
        clientName: invoice.clientName,
        clientEmail: invoice.clientEmail,
        clientStreet: invoice.clientStreet,
        clientCity: invoice.clientCity,
        clientPostal: invoice.clientPostal,
        clientCountry: invoice.clientCountry,
        invoiceDate: invoice.invoiceDate,
        paymentTerms: invoice.paymentTerms,
        description: invoice.description,
        status: invoice.status,
        items: invoice.items,
      })),
    },
    revalidate: 30,
  };
}
