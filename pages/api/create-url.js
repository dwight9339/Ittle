import { MongoClient, MongoServerError } from "mongodb";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import generateSlug from "utils/generateSlug";

const createUrl = withApiAuthRequired(async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send();
  }

  const { user } = getSession(req, res);

  const client = new MongoClient(process.env.MONGODB_URI);
  const redirectData = { ...req.body };

  redirectData._id = generateSlug();
  redirectData.user_id = user.sub;
  redirectData.click_count = 0;
  
  try {
    const db = client.db(process.env.MONGODB_DB);
    const redirects = db.collection("redirects");
    await redirects.insertOne(redirectData);
    
    res.status(200).send();
  } catch(err) {
    if (err instanceof MongoServerError && err.code === 11000) { 
      // Key collision error, reissue request
      console.error("Key collision, retrying request");
      res.redirect(307, "/api/create-url");
    } else {
      console.error(err.code);
      res.status(500).send("Unable to complete transaction");
    }
  } finally {
    await client.close();
  }
});

export default createUrl;
