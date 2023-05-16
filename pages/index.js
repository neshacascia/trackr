import Head from 'next/head';
import { useContext } from 'react';
import { Context } from '@/components/context/StateContext';
import DataStats from '@/components/DataStats';

import {
  faMoneyBillTrendUp,
  faReceipt,
} from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const { isDarkMode } = useContext(Context);

  return (
    <>
      <Head>
        <title>trackr</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main
        className={`${
          isDarkMode ? 'bg-darkPurple' : 'lightBg'
        } w-screen h-screen flex px-6 md:px-12 xl:px-[252px]`}
      >
        <section className="flex gap-4 pt-[72px] mt-8 md:mt-14">
          <DataStats title="Invoices" icon={faMoneyBillTrendUp} />
          <DataStats title="Expenses" icon={faReceipt} />
        </section>
      </main>
    </>
  );
}
