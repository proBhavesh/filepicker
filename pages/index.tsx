import React from "react";
import { useState } from "react";
import Dropbox from "../components/Dropbox.tsx";
import Gdrive from "../components/Gdrive.tsx";
import Notion from "../components/Notion.tsx";

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
