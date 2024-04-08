import Image from 'next/image';
import { useContext } from 'react';
import { Context } from './context/StateContext';
import Payment from './Payment';
import GetStarted from './GetStarted';

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
      } w-screen h-full flex flex-col gap-4 px-6 pb-[105px] md:px-12 md:pt-6 xl:px-[252px]`}
    >
      {type === 'invoices' && !invoices?.length && (
        <GetStarted type={type} isDarkMode={isDarkMode} />
      )}
      {type === 'expenses' && !expenses?.length && (
        <GetStarted type={type} isDarkMode={isDarkMode} />
      )}
      {type === 'invoices'
        ? invoices.length > 0 && invoicesList
        : expenses.length > 0 && expensesList}
    </main>
  );
}
