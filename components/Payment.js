import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

export default function Payment({
  id,
  clientName,
  invoiceDate,
  paymentTerms,
  items,
  status,
}) {
  const date = new Date(invoiceDate);

  let paymentPeriod;

  if (paymentTerms === 'Net 1 Day') {
    paymentPeriod = 1;
  } else if (paymentTerms === 'Net 7 Days') {
    paymentPeriod = 7;
  } else if (paymentTerms === 'Net 14 Days') {
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

  const formattedDate = paymentDueDate.toLocaleDateString('en-US', options);

  const totals = Array.from(items).reduce((acc, curr) => {
    return acc + Number(curr.total);
  }, 0);

  const currentStatus = status[0].toLowerCase() + status.slice(1);
  const statusColours = {
    paid: 'bg-bgPaid text-paid',
    pending: 'bg-bgPending text-pending',
    draft: 'bg-bgDraft text-draft',
  };

  return (
    <div className="bg-mainPurple flex flex-col gap-6 rounded-lg px-6 py-6 hover:border-[1px] hover:border-brightPurple">
      <Link href={`/${id}`}>
        <div className="flex justify-between">
          <span className="font-medium">
            <span className="text-lightPurple">#</span>
            {id.slice(-6).toUpperCase()}
          </span>
          <p className="font-light">{clientName}</p>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="font-light">Due {formattedDate}</p>
            <span className="text-lg font-medium">${totals.toFixed(2)}</span>
          </div>

          <div
            className={`${statusColours[currentStatus]} flex items-center gap-2 rounded-md py-2.5 px-7`}
          >
            <FontAwesomeIcon
              icon={faCircle}
              className="text-[10px]"
            ></FontAwesomeIcon>
            <p className="font-medium pt-[1.5px]">{status}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
