import { useContext } from 'react';
import { Context } from '@/components/context/StateContext';
import { useRouter } from 'next/router';
import PaymentDetail from '../../components/PaymentDetail';

export default function PaymentDetails() {
  const { invoices } = useContext(Context);

  const router = useRouter();
  const paymentId = router.query.paymentId;

  const invoice = invoices.filter(
    invoice => invoice._id.toString() === paymentId
  );

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

    if (window.innerWidth >= 768) {
      router.push(`/invoices/${invoiceData.id}`);
    } else {
      router.back();
    }
  }

  return (
    <PaymentDetail
      type="invoices"
      data={invoice[0]}
      updateInvoice={updateInvoiceHandler}
    />
  );
}
