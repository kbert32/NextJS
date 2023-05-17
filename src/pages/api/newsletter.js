import { connectDatabase, insertDocument } from "@/helpers/db-utils";

export default async function newsletterRegistration(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;

    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }

    let client;

    try {
      client = await connectDatabase();
    } catch (err) {
      res.status(500).json({ message: "Connecting to the database failed." });
      return;
    }

    try {
      await insertDocument(client, "newsletter", { email: email });
      client.close();
    } catch (err) {
      res.status(500).json({ message: "Inserting data failed!" });
      return;
    }

    res.status(201).json({ message: "Email registered.", email: email });
  }
}

//In an application where Mongodb related code will be executed frequently, we may want to utilize Mongo's 'connection pooling'
//simply remove all 'client.close()' statements, then the connection will NOT be closed and be re-used across requests.
