import { MongoClient, ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const paymentId = req.body;
  const client = await MongoClient.connect(process.env.NEXT_PUBLIC_API_TOKEN);

  const db = client.db();
  const invoicesCollections = db.collection('invoices');

  if (req.method === 'POST') {
    const result = await invoicesCollections.updateOne(
      {
        _id: new ObjectId(paymentId),
      },
      { $set: { status: 'Paid' } }
    );

    console.log(result);

    res.status(200).json({ message: 'Payment status updated!' });
  } else if (req.method === 'DELETE') {
    const result = await invoicesCollections.deleteOne({
      _id: new ObjectId(paymentId),
    });

    console.log(result);

    res.status(200).json({ message: 'Payment deleted!' });
  }
  client.close();
}
