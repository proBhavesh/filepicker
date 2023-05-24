import { Client } from "@notionhq/client";
import cors from "cors";

export default async function handler(req, res) {
  // Use cors middleware
  cors()(req, res, async () => {
    fileUrl = req.fileLink;
    try {
      const downloadFile = async (fileUrl, fileName) => {
        try {
          const response = await axios.get(url);

          if (response.status === 200) {
            return response.data;
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error downloading PDF:", error.message);
          return null;
        }
      };
    } catch (error) {
      console.error("Error retrieving files:", error);
    }
    console.log("Working");
    res.status(200).json({ message: "Hello from API route with CORS!" });
  });
}

// export default handler;
