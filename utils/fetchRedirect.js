import { MongoClient } from "mongodb";

export default async (slug) => { 
  const client = new MongoClient(process.env.MONGODB_URI);
  const db = client.db(process.env.MONGODB_DB);
  const coll = db.collection("redirects");

  const fetchResult = await coll.findOne({_id: slug});

  return fetchResult;
}