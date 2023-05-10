import { MongoClient } from 'mongodb';
import { useContext, useState } from 'react';
import { Context } from '@/components/context/StateContext';
import Header from '@/components/Header';
import PaymentsList from '@/components/PaymentsList';

export default function Expenses(props) {
  const { isDarkMode } = useContext(Context);

  const [showModal, setShowModal] = useState(false);

  return (
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
    </main>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(process.env.NEXT_PUBLIC_API_TOKEN);

  const db = client.db();
  const expensesCollections = db.collection('expenses');

  const expenses = await expensesCollections.find().toArray();

  client.close();

  return {
    props: {
      expenses: expenses.map(expense => ({
        id: expense._id.toString(),
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
    revalidate: 30,
  };
}
