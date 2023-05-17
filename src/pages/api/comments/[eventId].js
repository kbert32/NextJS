import {
  connectDatabase,
  insertDocument,
  getDocuments,
} from "@/helpers/db-utils";

export default async function commentsHandler(req, res) {
  const eventId = req.query.eventId;

  let client;

  try {
    client = await connectDatabase();
  } catch (err) {
    res.status(500).json({ message: "Connecting to the database failed." });
    return;
  }

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !email.includes("@") ||
      !name ||
      name.trim === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      client.close();
      return;
    }

    const newComment = {
      email: email,
      name: name,
      text: text,
      eventId: eventId,
    };

    let result;
    try {
      result = await insertDocument(client, "comments", newComment);
      newComment._id = result.insertedId;

      res.status(201).json({ message: "Comment added.", body: newComment });
    } catch (err) {
      res.status(500).json({ message: "Inserting comment failed!" });
    }
  } else {
    if (req.method === "GET") {
      try {
        const documents = await getDocuments(
          client,
          "comments",
          { _id: -1 },
          { eventId: eventId }
        );
        res.status(200).json({ comments: documents });
      } catch (err) {
        res.status(500).json({ message: "Getting comments failed." });
      }
    }
  }
  client.close();
}
