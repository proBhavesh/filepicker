import { Client } from "@notionhq/client";
import cors from "cors";

export default async function handler(req, res) {
  // Use cors middleware
  cors()(req, res, () => {
    try {
      const notion = new Client({
        auth: process.env.NEXT_PUBLIC_NOTION_SECRET_KEY,
      });
      (async () => {
        const listUsersResponse = await notion.users.list({});
        console.log("User list", await listUsersResponse);
      })();
    } catch (error) {
      console.error("Error retrieving files:", error);
    }
    console.log("Working");
    res.status(200).json({ message: "Hello from API route with CORS!" });
  });
}

// export default handler;
