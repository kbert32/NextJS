import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://kbert32:ledzep@cluster0.ow2ya0v.mongodb.net/events?retryWrites=true&w=majority"
  );

  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);
  return result;
}

export async function getDocuments(client, collection, sort, filter = {}) {
  const db = client.db();

  const result = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray(); //'toArray()' gives us all of the comments as an array; by default we would get a cursor and have to navigate documents manually; 'toArray()' simplifies this for us
  return result;
}
