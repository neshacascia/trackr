import { useContext } from 'react';
import { Context } from './context/StateContext';
import Payment from './Payment';

export default function PaymentsList({ type, invoices, expenses }) {
  const { filterInvoices, filterExpenses, isDarkMode } = useContext(Context);

  const filteredPayments =
    type === 'invoices'
      ? invoices?.filter(invoice => filterInvoices.includes(invoice.status))
      : expenses?.filter(expense => filterExpenses.includes(expense.status));

  const invoicesList =
    filteredPayments?.length === 0
      ? invoices?.map(
          ({ id, clientName, invoiceDate, paymentTerms, items, status }) => (
            <Payment
              type={type}
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
      : filteredPayments?.map(
          ({ id, clientName, invoiceDate, paymentTerms, items, status }) => (
            <Payment
              type={type}
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

  const expensesList =
    filteredPayments?.length === 0
      ? expenses?.map(
          ({
            id,
            merchant,
            referenceNo,
            expenseDueDate,
            expenseAmount,
            status,
          }) => (
            <Payment
              type={type}
              key={id}
              id={id}
              merchant={merchant}
              referenceNo={referenceNo}
              expenseDueDate={expenseDueDate}
              expenseAmount={expenseAmount}
              status={status}
            />
          )
        )
      : filteredPayments?.map(
          ({
            id,
            merchant,
            referenceNo,
            expenseDueDate,
            expenseAmount,
            status,
          }) => (
            <Payment
              type={type}
              key={id}
              id={id}
              merchant={merchant}
              referenceNo={referenceNo}
              expenseDueDate={expenseDueDate}
              expenseAmount={expenseAmount}
              status={status}
            />
          )
        );

  return (
    <main
      className={`${
        isDarkMode ? 'bg-darkPurple' : 'bg-lightBg'
      } w-screen h-full flex flex-col gap-4 px-6 pb-[105px] md:px-12 md:pt-6`}
    >
      {(type === 'invoices' && !invoices?.length) ||
        (type === 'expenses' && !expenses?.length && (
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
                isDarkMode ? 'text-lilacPurple' : 'text-grayPurple'
              } font-light`}
            >
              Create an {type === 'invoices' ? 'invoice' : 'expense'} by
              clicking the <span className="font-medium">New</span> button and
              get started
            </p>
          </section>
        ))}
      {type === 'invoices'
        ? invoices.length > 0 && invoicesList
        : expenses.length > 0 && expensesList}
    </main>
  );
}
