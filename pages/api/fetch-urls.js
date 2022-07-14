import { MongoClient } from "mongodb";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async (req, res) => {
  const { user } = getSession(req, res);
  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    const db = client.db(process.env.MONGODB_DB);
    const coll = db.collection("redirects");

    const cursor = coll.find({user_id: user.sub});
    const results = await cursor.toArray();
    res.status(200).send(results);
  } catch(err) {
    console.error(err);
    res.status(500).send();
  }
});