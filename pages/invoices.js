import { useState } from 'react';
import Header from '@/components/Header';
import PaymentsList from '@/components/PaymentsList';

import invoiceData from '../data.json';

export default function Invoices() {
  const [invoices, setInvoices] = useState(invoiceData);

  return (
    <main className="text-white bg-darkPurple font-spartan h-screen w-full flex flex-col items-center gap-8 pt-8">
      <Header title="Invoices" invoices={invoices} />
      <PaymentsList invoices={invoices} />
    </main>
  );
}
