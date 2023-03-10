import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import NewInvoiceForm from '@/components/NewInvoiceForm';

export default function NewPayment() {
  const router = useRouter();

  return (
    <main className="bg-darkPurple h-full flex flex-col gap-6 px-6">
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

      <h2 className="text-white text-3xl">New Invoice</h2>

      <NewInvoiceForm />
    </main>
  );
}
