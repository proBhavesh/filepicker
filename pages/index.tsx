import React from "react";
import { useState } from "react";
import Dropbox from "../components/Dropbox.js";
import Gdrive from "../components/Gdrive.js";
import Notion from "../components/Notion.js";

const MyComponent: React.FC = () => {
  const handleClick = () => {
    console.log("Button clicked");
    // Your function logic goes here
  };

  return (
    <div>
      <Dropbox />
      <Gdrive />
      <Notion />
    </div>
  );
};

export default MyComponent;