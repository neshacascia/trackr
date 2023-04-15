import { MongoClient, ObjectId } from 'mongodb';
import PaymentDetail from '../components/PaymentDetail';

export default function PaymentDetails(props) {
  const data = props.paymentData;
  return <PaymentDetail data={data} />;
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
      params: { paymentId: invoice._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const paymentId = context.params.paymentId;

  const client = await MongoClient.connect(process.env.NEXT_PUBLIC_API_TOKEN);

  const db = client.db();
  const invoicesCollections = db.collection('invoices');

  const selectedPayment = await invoicesCollections.findOne({
    _id: new ObjectId(paymentId),
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
  };
}
