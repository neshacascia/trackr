import { MongoClient, ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const client = await MongoClient.connect(process.env.NEXT_PUBLIC_API_TOKEN);

  const db = client.db();
  const expensesCollections = db.collection('expenses');

  if (req.method === 'POST') {
    const data = req.body;

    const result = await expensesCollections.insertOne(data);
    console.log(result);

    res.status(201).json({ message: 'Expense inserted!' });
  }
}
