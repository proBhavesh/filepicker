import axios from "axios";
import cors from "cors";

// The OAuth client ID from the integration page!
const notionClientId = process.env.NEXT_PUBLIC_NOTION_OAUTH_CLIENT_ID;

// The OAuth client secret from the integration page!
const notionClientSecret = process.env.NEXT_PUBLIC_NOTION_OAUTH_CLIENT_SECRET;

export default async function handler(req, res) {
  cors()(req, res, async () => {
    if (req.method === "GET") {
      // const { code } = req.query;
      const { Client } = require("@notionhq/client");

      const notion = new Client({ auth: "secret_x8HI3hRJByN6cL35lpbrcrbirNC51L7QHx2rYRMoYrX" });

      (async () => {
        const response = await notion.users.list();
        console.log(response);
      })();
      // Generate an access token with the code we got earlier and the client_id and client_secret we retrieved earlier
      // const resp = await axios({
      //   method: "POST",
      //   url: "https://api.notion.com/v1/oauth/token",
      //   auth: { username: notionClientId, password: notionClientSecret },
      //   headers: { "Content-Type": "application/json" },
      //   data: { code, grant_type: "authorization_code" },
      // });

      // // You want to save resp.data.workspace_id and resp.data.access_token if you want to make requests later with this Notion account (otherwise they'll need to reauthenticate)

      // // Use the access token we just got to search the user's workspace for databases
      // const { data } = await axios({
      //   method: "POST",
      //   url: "https://api.notion.com/v1/pages",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${resp.data.access_token}`,
      //     "Notion-Version": "2022-02-22",
      //   },
      //   // data: { filter: { property: "object", value: "database" } },
      // });
      // console.log(await data);
      // res.json(data?.results);
      res.send("Working")
    } else {
      res.status(405).end();
    }
  });
}
