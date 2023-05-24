import React from "react";
const { Client } = require("@notionhq/client");

const FilePicker = () => {
  // Initializing a client

  const handleFileSelection = async () => {
    try {
      const response = await fetch("/api/notion");
      const data = response.json();
    } catch (error) {
      console.error("Error retrieving files:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-auto">
        <button
          className="mb-4 p-4 border border-dashed border-gray-400 rounded-lg cursor-pointer"
          onClick={handleFileSelection}
        >
          Select a file from Notion
        </button>
      </div>
    </div>
  );
};

export default FilePicker;
