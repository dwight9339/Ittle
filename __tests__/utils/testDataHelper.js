import { MongoClient } from "mongodb";
import { randomBytes } from "crypto";
import { getSession } from "@auth0/nextjs-auth0";

export const testUrlBaseName = "Test URL";
export const testUrlRedirectUrl = "https://google.com";
export const testUrlStartDate = new Date("0").toDateString();
export const testUrlEndDate = new Date("20").toDateString();

export const createOneRedirect = async (req, res) => {
  const client = new MongoClient(process.env.MONGODB_URI);
  const { user } = getSession(req, res);
  const slug = randomBytes(4)
    .toString('base64')
    .replace(/\//g,'_')
    .replace(/\+/g,'-')
    .replace(/\=/g,'');
  
  try {
    const db = client.db(process.env.MONGODB_DB);
    const coll = db.collection(process.env.MONGODB_COLL_NAME_REDIRECTS);
    await coll.insertOne({
      _id: slug,
      user_id: user.sub,
      name: testUrlBaseName,
      redirect_url: testUrlRedirectUrl,
      start_date: testUrlStartDate,
      end_date: testUrlEndDate
    });

    return slug;
  } catch(err) {
    console.error(err);
  } finally {
    client.close();
  }
}

export const createMultipleRedirects = async (req, res, numUrls) => {
  const client = new MongoClient(process.env.MONGODB_URI);
  const { user } = getSession(req, res);
  const baseSlug = randomBytes(4)
    .toString('base64')
    .replace(/\//g,'_')
    .replace(/\+/g,'-')
    .replace(/\=/g,'');
  let recs = [];

  for (let i = 0; i < numUrls; i++) {
    recs.push({
      _id: baseSlug + `${i}`,
      user_id: user.sub,
      name: `${testUrlBaseName} ${i + 1}`,
      redirect_url: testUrlRedirectUrl,
      start_date: testUrlStartDate,
      end_date: testUrlEndDate
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
    console.log(`Redirect Record: ${JSON.stringify(rec)}`);
    return rec;
  } catch(err) {
    console.error(err);
  } finally {
    client.close();
  }
} 

export const getAvailableSlug = async (slug) => {
  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    const db = client.db(process.env.MONGODB_DB);
    const coll = db.collection(process.env.MONGODB_COLL_NAME_AVAILABLE_SLUGS);
    const rec = await coll.findOne({_id: slug});
    console.log(`Slug Record: ${JSON.stringify(rec)}`);
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

export const clearAvailableSlugs = async () => {
  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    const db = client.db(process.env.MONGODB_DB);
    const coll = db.collection(process.env.MONGODB_COLL_NAME_AVAILABLE_SLUGS);
    await coll.deleteMany({});
  } catch(err) {
    console.error(err);
  } finally {
    client.close();
  }
}