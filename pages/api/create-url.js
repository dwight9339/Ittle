import { MongoClient } from "mongodb";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import generateSlug from "utils/generateSlug";

export default withApiAuthRequired(async (req, res) => {
  if (req.method !== "POST") {
    return res.status(401).send();
  }
  const { user } = getSession(req, res);

  const client = new MongoClient(process.env.MONGODB_URI);
  const redirectData = { ...req.body };

  redirectData._id = generateSlug();
  redirectData.user_id = user.user_id;
  redirectData.click_count = 0;
  
  console.log(JSON.stringify(redirectData));
  try {
    const db = client.db(process.env.MONGODB_DB);
    const redirects = db.collection("redirects");

    const result = await redirects.insertOne(redirectData);
    
    res.status(200).send();
  } catch(err) {
    console.error(err);
    res.status(500).send("Unable to insert record");
  }
});
