import { MongoClient } from 'mongodb';
import Head from 'next/head';
import { useContext } from 'react';
import { Context } from '@/components/context/StateContext';
import DataStats from '@/components/DataStats';

import {
  faMoneyBillTrendUp,
  faReceipt,
} from '@fortawesome/free-solid-svg-icons';

export default function Home(props) {
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
          <DataStats
            title="Invoices"
            icon={faMoneyBillTrendUp}
            total={props.invoicesStats}
          />
          <DataStats
            title="Expenses"
            icon={faReceipt}
            total={props.expensesStats}
          />
        </section>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(process.env.NEXT_PUBLIC_API_TOKEN);

  const db = client.db();

  const invoicesCollections = db.collection('invoices');
  const invoices = await invoicesCollections.find().toArray();

  const expensesCollections = db.collection('expenses');
  const expenses = await expensesCollections.find().toArray();

  client.close();

  return {
    props: {
      invoicesStats: invoices.map(invoice => ({
        total: invoice.items.map(item => item.total),
      })),
      expensesStats: expenses.map(expense => ({
        amount: expense.expenseAmount,
      })),
    },
    revalidate: 5,
  };
}
