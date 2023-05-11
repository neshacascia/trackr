import { MongoClient, ObjectId } from 'mongodb';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { Context } from '@/components/context/StateContext';
import EditExpenseForm from '@/components/EditExpenseForm';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

export default function EditExpense(props) {
  const router = useRouter();

  const { isDarkMode } = useContext(Context);

  async function updateExpenseHandler(expenseData) {
    const res = await fetch('/api/update-expense', {
      method: 'PUT',
      body: JSON.stringify(expenseData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    console.log(data);

    router.back();
  }

  return (
    <main
      className={`${
        isDarkMode ? 'bg-darkPurple' : 'bg-lightBg'
      } h-full flex flex-col gap-6 px-6 pt-[72px]`}
    >
      <button
        onClick={() => router.back()}
        className="flex items-center gap-6 pt-8"
      >
        <FontAwesomeIcon
          icon={faAngleLeft}
          className="text-brightPurple text-lg"
        ></FontAwesomeIcon>{' '}
        <p
          className={`${
            isDarkMode
              ? 'text-white hover:text-grayPurple'
              : 'lightText hover:text-detailPurple'
          } font-medium pt-[2px] hover:text-grayPurple`}
        >
          Go back
        </p>
      </button>

      <h2
        className={`${
          isDarkMode ? 'text-white' : 'text-lightText'
        } text-3xl font-medium`}
      >
        Edit{' '}
        <span
          className={`${
            isDarkMode ? 'text-boldGrayPurple' : 'text-grayPurple'
          }`}
        >
          #
        </span>
        {props.expenseData.referenceNo ||
          props.expenseData.id.slice(-6).toUpperCase()}
      </h2>

      <EditExpenseForm
        updateExpense={updateExpenseHandler}
        data={props.expenseData}
        isDarkMode={isDarkMode}
      />
    </main>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(process.env.NEXT_PUBLIC_API_TOKEN);

  const db = client.db();
  const expensesCollections = db.collection('expenses');

  const expenses = await expensesCollections.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: expenses.map(expense => ({
      params: { editExpenseId: expense._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const { editExpenseId } = context.params;

  const client = await MongoClient.connect(process.env.NEXT_PUBLIC_API_TOKEN);

  const db = client.db();
  const expensesCollections = db.collection('expenses');

  const selectedExpense = await expensesCollections.findOne({
    _id: new ObjectId(editExpenseId),
  });

  client.close();

  return {
    props: {
      expenseData: {
        id: selectedExpense._id.toString(),
        merchant: selectedExpense.merchant,
        referenceNo: selectedExpense.referenceNo,
        accountNo: selectedExpense.accountNo,
        accountType: selectedExpense.accountType,
        expenseAmount: selectedExpense.expenseAmount,
        expenseDueDate: selectedExpense.expenseDueDate,
        expenseCategory: selectedExpense.expenseCategory,
        notes: selectedExpense.notes,
        status: selectedExpense.status,
      },
    },
    revalidate: 30,
  };
}
