import { MongoClient, ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const expenseId = req.body;
  const client = await MongoClient.connect(process.env.NEXT_PUBLIC_API_TOKEN);

  const db = client.db();
  const expensesCollections = db.collection('expenses');

  if (req.method === 'POST') {
    const result = await expensesCollections.updateOne(
      {
        _id: new ObjectId(expenseId),
      },
      { $set: { status: 'Paid' } }
    );

    console.log(result);

    res.status(200).json({ message: 'Expense status updated!' });
  }
}
