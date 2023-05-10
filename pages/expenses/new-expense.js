import { useRouter } from 'next/router';
import { useContext } from 'react';
import { Context } from '@/components/context/StateContext';
import NewExpenseForm from '@/components/NewExpenseForm';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

export default function NewExpense() {
  const router = useRouter();

  const { isDarkMode } = useContext(Context);

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
    <main
      className={`${
        isDarkMode ? 'bg-darkPurple' : 'bg-lightBg'
      } h-full flex flex-col gap-6 px-6 pt-[72px]`}
    >
      <button
        onClick={() => router.push('/expenses')}
        className="flex items-center gap-6 pt-8"
      >
        <FontAwesomeIcon
          icon={faAngleLeft}
          className="text-brightPurple text-lg"
        ></FontAwesomeIcon>{' '}
        <p
          className={`${
            isDarkMode ? 'text-white' : 'text-lightText'
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
        New Expense
      </h2>

      <NewExpenseForm addExpense={addExpenseHandler} />
    </main>
  );
}
