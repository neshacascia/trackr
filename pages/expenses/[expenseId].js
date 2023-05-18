import { MongoClient, ObjectId } from 'mongodb';
import PaymentDetail from '@/components/PaymentDetail';

export default function ExpenseDetails(props) {
  return <PaymentDetail type="expenses" expenseData={props.expenseData} />;
}

export async function getServerSideProps(context) {
  const expenseId = context.params.expenseId;

  const client = await MongoClient.connect(process.env.NEXT_PUBLIC_API_TOKEN);

  const db = client.db();
  const expensesCollections = db.collection('expenses');

  const selectedExpense = await expensesCollections.findOne({
    _id: new ObjectId(expenseId),
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
  };
}

// export async function getStaticPaths() {
//   const client = await MongoClient.connect(process.env.NEXT_PUBLIC_API_TOKEN);

//   const db = client.db();
//   const expensesCollections = db.collection('expenses');

//   const expenses = await expensesCollections.find({}, { _id: 1 }).toArray();

//   client.close();

//   return {
//     fallback: 'blocking',
//     paths: expenses.map(expense => ({
//       params: { expenseId: expense._id.toString() },
//     })),
//   };
// }

// export async function getStaticProps(context) {
//   const expenseId = context.params.expenseId;

//   const client = await MongoClient.connect(process.env.NEXT_PUBLIC_API_TOKEN);

//   const db = client.db();
//   const expensesCollections = db.collection('expenses');

//   const selectedExpense = await expensesCollections.findOne({
//     _id: new ObjectId(expenseId),
//   });

//   client.close();

//   return {
//     props: {
//       expenseData: {
//         id: selectedExpense._id.toString(),
//         merchant: selectedExpense.merchant,
//         referenceNo: selectedExpense.referenceNo,
//         accountNo: selectedExpense.accountNo,
//         accountType: selectedExpense.accountType,
//         expenseAmount: selectedExpense.expenseAmount,
//         expenseDueDate: selectedExpense.expenseDueDate,
//         expenseCategory: selectedExpense.expenseCategory,
//         notes: selectedExpense.notes,
//         status: selectedExpense.status,
//       },
//     },
//     revalidate: 10,
//   };
// }
