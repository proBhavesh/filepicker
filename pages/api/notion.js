import axios from "axios";
import cors from "cors";
import { promises as fsPromises } from "fs";
const fs = require("fs");

const filePath = "./data/code.txt";
let api_key = "";
const getApiKey = async () => {
  await fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    // Print the contents of the file
    console.log(data);
    api_key = data;
    return api_key;
  });
};

console.log("This is api key", api_key);
// The OAuth client ID from the integration page!
const notionClientId = process.env.NEXT_PUBLIC_NOTION_OAUTH_CLIENT_ID;

// The OAuth client secret from the integration page!
const notionClientSecret = process.env.NEXT_PUBLIC_NOTION_OAUTH_CLIENT_SECRET;

export default async function handler(req, res) {
  cors()(req, res, async () => {
    await fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      // Print the contents of the file
      console.log(data);
      api_key = data;
      return api_key;
    });

    if (req.method === "POST") {
      const fileContent = await fsPromises.readFile("./data/code.txt", "utf8");
      console.log();
      const { pageId } = req.body;
      console.log("This is pageid: ", pageId.replaceAll('"', ""));
      const notionApiKey = await fileContent;

      fetch(`https://api.notion.com/v1/pages/${pageId.replaceAll('"', "")}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${await api_key}`,
          "Notion-Version": "2022-02-22",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response data here
          console.log(data);
        })
        .catch((error) => {
          // Handle any errors that occurred during the request
          console.error(error);
        });
    } else {
      res.status(405).end();
    }
  });
}
