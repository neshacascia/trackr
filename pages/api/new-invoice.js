import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    const client = await MongoClient.connect(
      `${process.env.NEXT_PUBLIC_API_TOKEN}@invoices.hhtffnc.mongodb.net/?retryWrites=true&w=majority`
    );

    const db = client.db();
    const invoicesCollections = db.collection('invoices');

    const result = await invoicesCollections.insertOne(data);
    console.log(result);

    client.close();

    res.status(201).json({ message: 'Invoice inserted!' });
  }
}
