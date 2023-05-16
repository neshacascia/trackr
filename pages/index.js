import { MongoClient } from 'mongodb';
import Head from 'next/head';
import { useContext } from 'react';
import { Context } from '@/components/context/StateContext';
import DataStats from '@/components/DataStats';

import {
  faEnvelope,
  faMoneyBillTrendUp,
  faReceipt,
} from '@fortawesome/free-solid-svg-icons';

export default function Home(props) {
  const { isDarkMode } = useContext(Context);

  let invoicesTotal = 0;

  props.invoicesStats.forEach(obj => {
    const values = Object.values(obj)[0];
    values.forEach(value => {
      invoicesTotal += value;
    });
  });

  const expensesTotal = props.expensesStats.reduce(
    (a, b) => Number(a.amount) + Number(b.amount)
  );

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
        <section className="w-full h-[40%] flex flex-col items-center gap-4 pt-[72px] mt-8 md:flex-row md:justify-between md:mt-14">
          <DataStats
            title="Invoices"
            icon={faMoneyBillTrendUp}
            total={invoicesTotal}
          />
          <DataStats title="Expenses" icon={faReceipt} total={expensesTotal} />
          <DataStats
            title="Emails"
            icon={faEnvelope}
            emails={props.invoicesStats.length}
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
