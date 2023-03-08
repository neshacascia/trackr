import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

export default function Payment({ id, clientName, createdAt, total, status }) {
  const currentStatus = status[0].toUpperCase() + status.slice(1);

  const date = new Date(createdAt);
  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };

  const formattedDate = date.toLocaleDateString('en-US', options);

  const statusColours = {
    paid: 'bg-bgPaid text-paid',
    pending: 'bg-bgPending text-pending',
    draft: 'bg-bgDraft text-draft',
  };

  return (
    <div className="bg-mainPurple flex flex-col gap-6 rounded-lg px-6 py-6">
      <div className="flex justify-between">
        <span className="font-medium">
          <span className="text-lightPurple">#</span>
          {id}
        </span>
        <p className="font-light">{clientName}</p>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <p className="font-light">Due {formattedDate}</p>
          <span className="text-lg font-medium">${total}</span>
        </div>

        <div
          className={`${statusColours[status]} flex items-center gap-2 rounded-md py-2.5 px-7`}
        >
          <FontAwesomeIcon
            icon={faCircle}
            className="text-[10px]"
          ></FontAwesomeIcon>
          <p className="font-medium pt-[1.5px]">{currentStatus}</p>
        </div>
      </div>
    </div>
  );
}
