import { MongoClient, MongoServerError } from "mongodb";
import { randomBytes } from "crypto";

export const createOneRedirect = async () => {
  const client = new MongoClient(process.env.MONGODB_URI);
  const slug = randomBytes(4)
    .toString('base64')
    .replace(/\//g,'_')
    .replace(/\+/g,'-')
    .replace(/\=/g,'');
  
  try {
    const db = client.db(process.env.MONGODB_DB);
    const coll = db.collection(process.env.MONGODB_COLL_NAME_REDIRECTS);
    await coll.insertOne({
      name: "Test URL",
      _id: slug,
      start_date: new Date().toString(),
      end_date: (new Date() + 7).toString()
    });
  } catch(err) {
    console.error(err);
  } finally {
    client.close();
  }
}

export const createMultipleRedirects = async (numUrls) => {
  const client = new MongoClient(process.env.MONGODB_URI);
  const baseSlug = randomBytes(4)
    .toString('base64')
    .replace(/\//g,'_')
    .replace(/\+/g,'-')
    .replace(/\=/g,'');
  let recs = [];

  for (let i = 0; i < numUrls; i++) {
    recs.push({
      _id: baseSlug + `${i}`,
      name: `Test URL ${i + 1}`,
      redirect_url: "https://google.com",
      start_date: new Date().toDateString(),
      end_date: (new Date() + 7).toDateString()
    });
  }
  
  try {
    const db = client.db(process.env.MONGODB_DB);
    const coll = db.collection(process.env.MONGODB_COLL_NAME_REDIRECTS);
    await coll.insertMany(recs);
    return baseSlug;
  } catch(err) {
    console.error(err);
  } finally {
    client.close();
  }
}

export const getRedirect = async (slug) => {
  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    const db = client.db(process.env.MONGODB_DB);
    const coll = db.collection(process.env.MONGODB_COLL_NAME_REDIRECTS);
    const rec = await coll.findOne({_id: slug});
    console.log(`Rec: ${JSON.stringify(rec)}`);
    return rec;
  } catch(err) {
    console.error(err);
  } finally {
    client.close();
  }
} 

export const clearAllRedirects = async () => {
  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    const db = client.db(process.env.MONGODB_DB);
    const coll = db.collection(process.env.MONGODB_COLL_NAME_REDIRECTS);
    await coll.deleteMany({});
  } catch(err) {
    console.error(err);
  } finally {
    client.close();
  }
}