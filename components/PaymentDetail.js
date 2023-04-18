import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faCircle } from '@fortawesome/free-solid-svg-icons';

export default function PaymentDetail({ data }) {
  const router = useRouter();

  const currentStatus = data.status[0].toLowerCase() + data.status.slice(1);
  const statusColours = {
    paid: 'bg-bgPaid text-paid',
    pending: 'bg-bgPending text-pending',
    draft: 'bg-bgDraft text-draft',
  };

  const date = new Date(data.invoiceDate);

  let paymentPeriod;

  if (data.paymentTerms === 'Net 1 Day') {
    paymentPeriod = 1;
  } else if (data.paymentTerms === 'Net 7 Days') {
    paymentPeriod = 7;
  } else if (data.paymentTerms === 'Net 14 Days') {
    paymentPeriod = 14;
  } else {
    paymentPeriod = 30;
  }

  const paymentDueDate = new Date(
    date.getTime() + paymentPeriod * 25 * 60 * 60 * 1000
  );

  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };

  const invoiceDate = date.toLocaleDateString('en-US', options);
  const formattedDate = paymentDueDate.toLocaleDateString('en-US', options);

  const totals = Array.from(data.items).reduce((acc, curr) => {
    return acc + Number(curr.total);
  }, 0);

  function editInvoiceHandler() {
    router.push(`/edit/${data.id}`);
  }

  async function deleteInvoiceHandler() {
    const res = await fetch('/api/update-invoice', {
      method: 'DELETE',
      body: JSON.stringify(data.id),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseData = await res.json();
    console.log(responseData);

    router.push('/invoices');
  }

  async function markAsPaidHandler() {
    const res = await fetch('/api/update-invoice', {
      method: 'POST',
      body: JSON.stringify(data.id),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseData = await res.json();
    console.log(responseData);

    router.push('/invoices');
  }

  return (
    <>
      <main className="bg-darkPurple h-full flex flex-col gap-6 px-6 pb-14">
        <button
          onClick={() => router.push('/invoices')}
          className="flex items-center gap-6 pt-8"
        >
          <FontAwesomeIcon
            icon={faAngleLeft}
            className="text-brightPurple text-lg"
          ></FontAwesomeIcon>{' '}
          <p className="text-white font-medium pt-[2px]">Go back</p>
        </button>

        <section className="bg-mainPurple h-[91px] flex items-center justify-between rounded-lg px-6">
          <span className="text-white font-light py-10">Status</span>
          <div
            className={`${statusColours[currentStatus]} flex items-center gap-2 rounded-md py-2.5 px-7`}
          >
            <FontAwesomeIcon
              icon={faCircle}
              className="text-[10px]"
            ></FontAwesomeIcon>
            <p className="font-medium pt-[1.5px]">{data.status}</p>
          </div>
        </section>

        <section className="text-white bg-mainPurple flex flex-col gap-[30px] rounded-lg p-6">
          <div className="flex flex-col">
            <span>
              <span className="text-detailPurple font-medium">#</span>
              {data.id.slice(-6).toUpperCase()}
            </span>
            <span className="font-light">{data.description}</span>
          </div>

          <div className="font-light flex flex-col">
            <span>{data.street}</span>
            <span>{data.city}</span>
            <span>{data.postal}</span>
            <span>{data.country}</span>
          </div>

          <div className="flex gap-10">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col">
                <span className="font-light mb-3">Invoice Date</span>
                <span className="text-[19px] font-medium">{invoiceDate}</span>
              </div>

              <div className="flex flex-col">
                <span className="font-light mb-3">Payment Due</span>
                <span className="text-[19px] font-medium">{formattedDate}</span>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="font-light mb-3">Bill To</span>
              <span className="text-[19px] font-medium mb-2">
                {data.clientName}
              </span>
              <span className="font-light">{data.clientStreet}</span>
              <span className="font-light">{data.clientCity}</span>
              <span className="font-light">{data.clientPostal}</span>
              <span className="font-light">{data.clientCountry}</span>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="font-light mb-3">Sent to</span>
            <span className="text-[19px] font-medium">{data.clientEmail}</span>
          </div>

          <section>
            <div className="bg-borderPurple flex flex-col gap-6 rounded-t-lg p-6">
              {data.items.map((item, ind) => (
                <div key={ind} className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span>{item.itemName}</span>
                    <span className="text-grayPurple">{`${
                      item.quantity
                    } x $${item.price.toFixed(2)}`}</span>
                  </div>
                  <span>${item.total.toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="bg-black flex justify-between items-center rounded-b-lg px-6 py-[30px]">
              <span className="font-light">Amount Due</span>
              <span className="text-2xl font-medium">${totals.toFixed(2)}</span>
            </div>
          </section>
        </section>
      </main>

      <footer className="bg-mainPurple h-[91px] flex items-center gap-2 px-6">
        <button
          type="button"
          onClick={editInvoiceHandler}
          className="text-white bg-borderPurple font-medium w-full rounded-3xl py-4 px-[18px]"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={deleteInvoiceHandler}
          className="text-white bg-deleteBtn font-medium w-full rounded-3xl py-4 px-[18px]"
        >
          Delete
        </button>
        {data.status !== 'Paid' && (
          <button
            onClick={markAsPaidHandler}
            className="text-white bg-brightPurple font-medium w-full rounded-3xl py-4 px-[18px]"
          >
            Mark as Paid
          </button>
        )}
      </footer>
    </>
  );
}
