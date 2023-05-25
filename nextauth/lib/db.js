import { MongoClient } from "mongodb";

const password = "gtdBuxgFMgDOeDuP";
const mongoUser = "nextauthuser";
const database = "auth-demo";

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    `mongodb+srv://${mongoUser}:${password}@cluster0.ow2ya0v.mongodb.net/${database}?retryWrites=true&w=majority`
  );

  return client;
}
