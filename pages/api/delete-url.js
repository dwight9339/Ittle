import { MongoClient } from "mongodb";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

const deleteUrl = withApiAuthRequired(async (req, res) => {
  if (req.method !== "POST") {
    return res.status(401).send();
  }
  const { slug } = req.body;
  const client = new MongoClient(process.env.MONGODB_URI);
  const session = client.startSession();
  
  try {
    await session.withTransaction(async () => {
      const db = client.db(process.env.MONGODB_DB);
      const redirectsColl = db.collection("redirects");
      const availableSlugsColl = db.collection("available_slugs");

      const deleteResults = await redirectsColl.deleteOne({_id: slug}, {session});
      const insertOne = await availableSlugsColl.insertOne({_id: slug}, {session});
    });
    res.status(200).send();
  } catch(err) {
    console.error(err);
    res.status(500).send();
  } finally {
    await session.endSession();
    await client.close();
  }
});

export default deleteUrl;