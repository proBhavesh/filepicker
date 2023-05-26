// form-tool/src/App.js

import { useEffect, useState } from "react";

// The OAuth client ID from the integration page!
const oauth_client_id = process.env.NEXT_PUBLIC_NOTION_OAUTH_CLIENT_ID;

function App() {
  const [dbs, setdbs] = useState([]);

  // When you open the app, this doesn't do anything, but after you sign into Notion, you'll be redirected back with a code at which point we call our backend.
  useEffect(() => {
    const params = new URL(window.document.location).searchParams;
    const code = params.get("code");
    if (!code) return;
    // fetch(`http://localhost:5000/api/notion/${code}`).then(async (resp) => {
    // setdbs(await resp.json());
    // });
    console.log(code);
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-auto">
        <a
          href={`https://api.notion.com/v1/oauth/authorize?client_id=${oauth_client_id}&response_type=code&owner=user`}
          key={1}
        >
          <button className="mb-4 p-4 border border-dashed border-gray-400 rounded-lg cursor-pointer">
            Connect to Notion
          </button>
        </a>
      </div>
      {/* {dbs.map((db) => (
        <div
          style={{
            display: "inline-flex",
            whiteSpace: "pre",
            border: "1px solid black",
            marginBottom: 10,
          }}
        >
          {JSON.stringify(db, null, 2)}
        </div>
      ))}*/}
    </div>
  );
}

export default App;
