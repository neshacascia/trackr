import { useContext } from 'react';
import { Context } from '@/components/context/StateContext';
import Header from '@/components/Header';
import PaymentsList from '@/components/PaymentsList';

const expenses = [
  {
    id: 'abcd7aj924',
    expenseName: 'Gas',
    amount: 100.0,
    expenseDue: '2021-08-19',
  },
];

export default function Expenses() {
  const { isDarkMode } = useContext(Context);

  return (
    <main
      className={`${
        isDarkMode ? 'text-white bg-darkPurple' : 'text-lightText bg-lightBg'
      } font-spartan h-screen w-full flex flex-col items-center gap-8 pt-8`}
    >
      <Header title="Expenses" payments={expenses} />
      <PaymentsList type="expenses" expenses={expenses} />
    </main>
  );
}
