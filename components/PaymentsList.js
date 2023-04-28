import { useContext } from 'react';
import { Context } from './context/StateContext';
import Payment from './Payment';

export default function PaymentsList({ invoices }) {
  const { filterInvoices, isDarkMode } = useContext(Context);

  const filteredInvoices = invoices.filter(invoice =>
    filterInvoices.includes(invoice.status)
  );

  const invoicesList =
    filteredInvoices.length === 0
      ? invoices.map(
          ({ id, clientName, invoiceDate, paymentTerms, items, status }) => (
            <Payment
              key={id}
              id={id}
              clientName={clientName}
              invoiceDate={invoiceDate}
              paymentTerms={paymentTerms}
              items={items}
              status={status}
            />
          )
        )
      : filteredInvoices.map(
          ({ id, clientName, invoiceDate, paymentTerms, items, status }) => (
            <Payment
              key={id}
              id={id}
              clientName={clientName}
              invoiceDate={invoiceDate}
              paymentTerms={paymentTerms}
              items={items}
              status={status}
            />
          )
        );

  return (
    <main
      className={`${
        isDarkMode ? 'bg-darkPurple' : 'bg-lightBg'
      } w-screen h-full flex flex-col gap-4 px-6 pb-[105px]`}
    >
      {!invoices.length && (
        <section className="h-auto flex flex-col items-center my-auto">
          <img src="/assets/illustration-empty.svg" className="mb-10" />
          <h2
            className={`${
              isDarkMode ? 'text-white' : 'text-lightText'
            } text-2xl font-medium mb-6`}
          >
            There is nothing here
          </h2>
          <p
            className={`${
              isDarkMode ? 'lilacPurple' : 'grayPurple'
            } font-light`}
          >
            Create an invoice by clicking the{' '}
            <span className="font-medium">New</span> button and get started
          </p>
        </section>
      )}
      {invoices.length > 0 && invoicesList}
    </main>
  );
}
