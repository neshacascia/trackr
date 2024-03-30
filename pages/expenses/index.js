import { MongoClient } from 'mongodb';
import { getAuth } from '@clerk/nextjs/server';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { Context } from '@/components/context/StateContext';
import Header from '@/components/Header';
import PaymentsList from '@/components/PaymentsList';
import NewExpenseForm from '@/components/NewExpenseForm';

export default function Expenses(props) {
  const { isDarkMode } = useContext(Context);

  const router = useRouter();

  const [showModal, setShowModal] = useState(false);

  async function addExpenseHandler(enteredExpenseData) {
    const res = await fetch('/api/new-expense', {
      method: 'POST',
      body: JSON.stringify(enteredExpenseData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = res.json();
    console.log(data);

    router.push('/expenses');
  }

  return (
    <>
      <Head>
        <title>Expenses</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main
        className={`${
          isDarkMode ? 'text-white bg-darkPurple' : 'text-lightText bg-lightBg'
        } font-spartan h-screen w-full flex flex-col items-center gap-8 pt-[72px]`}
      >
        <Header
          title="Expenses"
          payments={props.expenses}
          setShowModal={setShowModal}
        />
        <PaymentsList type="expenses" expenses={props.expenses} />

        {showModal && window.innerWidth >= 768 && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
            <div
              className={`${
                isDarkMode ? 'bg-darkPurple' : 'bg-lightBg'
              } rounded-r-lg w-full max-w-xl h-full p-6 my-14 lg:max-w-[719px]`}
              style={{ maxHeight: 'calc(100vh)', overflowY: 'auto' }}
            >
              <h2
                className={`${
                  isDarkMode ? 'text-white' : 'text-lightText'
                } text-3xl font-medium px-6 my-12`}
              >
                New Expense
              </h2>
              <NewExpenseForm
                isDarkMode={isDarkMode}
                showModal={showModal}
                setShowModal={setShowModal}
                addExpense={addExpenseHandler}
              />
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { userId } = getAuth(ctx.req);

  const client = await MongoClient.connect(process.env.NEXT_PUBLIC_API_TOKEN);

  const db = client.db();
  const expensesCollections = db.collection('expenses');

  const expenses = await expensesCollections.find({ userId: userId }).toArray();

  client.close();

  return {
    props: {
      expenses: expenses.map(expense => ({
        id: expense._id.toString(),
        userId: expense.userId || '',
        merchant: expense.merchant,
        referenceNo: expense.referenceNo,
        accountNo: expense.accountNo,
        accountType: expense.accountType,
        expenseAmount: expense.expenseAmount,
        expenseDueDate: expense.expenseDueDate,
        expenseCategory: expense.expenseCategory,
        notes: expense.notes,
        status: expense.status,
      })),
    },
  };
}

// export async function getStaticProps() {
//   const client = await MongoClient.connect(process.env.NEXT_PUBLIC_API_TOKEN);

//   const db = client.db();
//   const expensesCollections = db.collection('expenses');

//   const expenses = await expensesCollections.find().toArray();

//   client.close();

//   return {
//     props: {
//       expenses: expenses.map(expense => ({
//         id: expense._id.toString(),
//         merchant: expense.merchant,
//         referenceNo: expense.referenceNo,
//         accountNo: expense.accountNo,
//         accountType: expense.accountType,
//         expenseAmount: expense.expenseAmount,
//         expenseDueDate: expense.expenseDueDate,
//         expenseCategory: expense.expenseCategory,
//         notes: expense.notes,
//         status: expense.status,
//       })),
//     },
//     revalidate: 5,
//   };
// }
