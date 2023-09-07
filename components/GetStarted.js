import Image from 'next/image';

export default function GetStarted({ type, isDarkMode }) {
  return (
    <section className="h-auto flex flex-col items-center my-auto">
      <Image
        src="/assets/illustration-empty.svg"
        alt=""
        width={242}
        height={341}
        className="mb-10"
      />
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
        Create an {type === 'invoices' ? 'invoice' : 'expense'} by clicking the{' '}
        <span className="font-medium">New</span> button and get started
      </p>
    </section>
  );
}
