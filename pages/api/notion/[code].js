import axios from "axios";
import cors from "cors";
import fs from "fs";
import path from "path";

// The OAuth client ID from the integration page!
const notionClientId = process.env.NEXT_PUBLIC_NOTION_OAUTH_CLIENT_ID;

// The OAuth client secret from the integration page!
const notionClientSecret = process.env.NEXT_PUBLIC_NOTION_OAUTH_CLIENT_SECRET;

export default async function handler(req, res) {
  cors()(req, res, async () => {
    if (req.method === "GET") {
      const { code } = req.query;

      // Generate an access token with the code we got earlier and the client_id and client_secret we retrieved earlier
      const resp = await axios({
        method: "POST",
        url: "https://api.notion.com/v1/oauth/token",
        auth: { username: notionClientId, password: notionClientSecret },
        headers: { "Content-Type": "application/json" },
        data: { code, grant_type: "authorization_code" },
      });

      const writeCodeToFile = async () => {
        const filePath = path.join(process.cwd(), "data", "code.txt");
        // Convert the data to JSON format
        const jsonData = await resp.data.access_token;

        // Write the JSON data to the file
        await fs.writeFile(filePath, jsonData, "utf8", (err) => {
          if (err) {
            console.error(err);
          }
        });
      };

      await writeCodeToFile();

      // const userPages = async () => {
      const { data } = await axios({
        method: "POST",
        url: "https://api.notion.com/v1/search",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resp.data.access_token}`,
          "Notion-Version": "2022-06-28",
        },
        data: { filter: { property: "object", value: "page" } },
      });

      const title = await data.results[0].properties.title.title.plain_text;
      const content = await data.results[0];

      // Use the access token we just got to search the user's workspace for databases

      res.json(data?.results);
    } else {
      res.status(405).end();
    }
  });
}
