import { MongoClient } from "mongodb";

export default async (req, res) => {
  if (req.method !== "POST") {
    return res.status(401).send();
  }

  const client = new MongoClient(process.env.MONGODB_URI);
  const { redirectData } = req.body;

  try {
    const db = client.db(process.env.MONGODB_DB);
    const redirects = db.collection("redirects");

    const result = await redirects.insertOne(recData);

    res.status(200).send();
  } catch(err) {
    res.status(500).send();
  }
}
