// form-tool/src/App.js

import { useEffect, useState, useRef } from "react";

// The OAuth client ID from the integration page!
const oauth_client_id = process.env.NEXT_PUBLIC_NOTION_OAUTH_CLIENT_ID;

function App() {
  const [dbs, setdbs] = useState();
  const [pageID, setPageID] = useState([]);
  const elementRef = useRef(null);

  let code;
  // When you open the app, this doesn't do anything, but after you sign into Notion, you'll be redirected back with a code at which point we call our backend.
  useEffect(() => {
    const params = new URL(window.document.location).searchParams;
    code = params.get("code");
    if (!code) return;
    fetch(`https://filepicker-sigma.vercel.app/api/notion/${code}`).then(
      async (resp) => {
        setdbs(await resp.json());
      }
    );
    // console.log(code);
  }, []);

  const disPlayPages = async (e) => {
    if (!e) {
      console.error("Event object is undefined.");
      return;
    }

    e.preventDefault();
    const { value: pageId } = e.target.dataset;
    console.log("Page ID:", pageId.replace(/"/g, ""));

    try {
      const response = await fetch("/api/notion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pageId }),
      });

      if (response.ok) {
        // Handle success
        console.log("Request successful");
      } else {
        // Handle error
        console.error("Request failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-auto mt-6">
        <a
          href={`https://api.notion.com/v1/oauth/authorize?client_id=${oauth_client_id}&response_type=code&owner=user`}
          key={1}
        >
          <button className="mb-4 p-4 border border-dashed border-gray-400 rounded-lg cursor-pointer">
            Connect to Notion
          </button>
        </a>
      </div>
      {dbs && dbs.length > 0 && (
        <div className="mb-4 p-4 border border-dashed border-gray-400 rounded-lg text-center">
          Select from the Pages
        </div>
      )}

      <div className="flex flex-wrap">
        {dbs && dbs.length > 0 ? (
          dbs.map((db) => {
            if (!db.properties.hasOwnProperty("title")) {
              {
                /*console.log("found undefined object", db);*/
              }
              return null;
            } else {
              return (
                <div
                  key={db.id}
                  className="inline-flex whitespace-pre border border-black mb-10 rounded-lg shadow-lg p-4 m-3 block"
                >
                  <div
                    className="font-bold text-xl"
                    data-value={JSON.stringify(db.id)}
                    onClick={disPlayPages}
                  >
                    {JSON.stringify(
                      db.properties.title.title[0].plain_text
                    ).replace(/"/g, "")}
                  </div>
                  {/*<div  className="text-gray-600"></div>*/}
                  {/*{console.log("from inner function", db.id)}*/}
                  {/*<br className="mb-3" />*/}
                </div>
              );
            }
          })
        ) : (
          <div className="text-center"></div>
        )}
      </div>
    </div>
  );
}

export default App;
