import Payment from './Payment';

export default function PaymentsList({ invoices }) {
  const invoicesList = invoices.map(
    ({ id, clientName, createdAt, total, status }) => (
      <Payment
        id={id}
        clientName={clientName}
        createdAt={createdAt}
        total={total}
        status={status}
      />
    )
  );

  return (
    <main className="bg-darkPurple w-screen h-auto flex flex-col gap-4 px-6 pb-[105px]">
      {invoicesList}
    </main>
  );
}
