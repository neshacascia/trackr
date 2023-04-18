import { MongoClient, ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const client = await MongoClient.connect(process.env.NEXT_PUBLIC_API_TOKEN);

  const db = client.db();
  const invoicesCollections = db.collection('invoices');

  if (req.method === 'POST') {
    const data = req.body;

    const result = await invoicesCollections.insertOne(data);
    console.log(result);

    res.status(201).json({ message: 'Invoice inserted!' });
  } else if (req.method === 'PUT') {
    const id = req.body;

    const result = await invoicesCollections.updateOne(
      {
        _id: new ObjectId(id),
      },
      { $set: { status: 'Pending' } }
    );

    console.log(result);

    res.status(200).json({ message: 'Payment status updated!' });
  }

  client.close();
}
