import { MongoClient } from 'mongodb';
import { getAuth } from '@clerk/nextjs/server';
import Head from 'next/head';
import { useContext } from 'react';
import { Context } from '@/components/context/StateContext';
import DataStats from '@/components/DataStats';
import PaymentsChart from '@/components/chart/PaymentsChart';

import {
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
    (acc, curr) => acc + Number(curr.amount),
    0
  );

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main
        className={`${
          isDarkMode ? 'bg-darkPurple' : 'bg-lightBg'
        } w-screen h-full flex flex-col gap-6 px-6 pb-8 md:h-screen md:justify-center md:gap-0 md:px-12 md:pb-0 xl:px-[252px]`}
      >
        <section className="w-full flex flex-col items-center gap-4 md:gap-10">
          <section className="w-full h-[40%] flex flex-col items-center gap-4 pt-[72px] mt-8 md:w-full md:flex-row md:justify-between md:pt-0 md:mt-2">
            <DataStats
              title="Invoices"
              icon={faMoneyBillTrendUp}
              total={invoicesTotal}
            />
            <DataStats
              title="Expenses"
              icon={faReceipt}
              total={expensesTotal}
            />
          </section>

          <PaymentsChart
            invoices={props.invoicesStats}
            expenses={props.expensesStats}
            isDarkMode={isDarkMode}
          />
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { userId } = getAuth(ctx.req);

  const client = await MongoClient.connect(process.env.NEXT_PUBLIC_API_TOKEN);

  const db = client.db();

  const invoicesCollections = db.collection('invoices');
  const invoices = await invoicesCollections.find({ userId: userId }).toArray();

  const expensesCollections = db.collection('expenses');
  const expenses = await expensesCollections.find({ userId: userId }).toArray();

  client.close();

  return {
    props: {
      invoicesStats: invoices.map(invoice => ({
        total: invoice.items.map(item => item.total),
        date: invoice.invoiceDate,
      })),
      expensesStats: expenses.map(expense => ({
        amount: expense.expenseAmount,
        category: expense.expenseCategory,
        date: expense.expenseDueDate,
      })),
    },
  };
}
