import React from "react";
import { useEffect, useState } from "react";
import useDrivePicker from "react-google-drive-picker";
const axios = require("axios");

const Gdrive = () => {
	const [selectedFile, setSelectedFile] = useState({});
	const [openPicker, authResponse] = useDrivePicker();

	async function downloadPDF(url) {}

	// const customViewsArray = [new google.picker.DocsView()]; // custom view
	const handleOpenPicker = async () => {
		openPicker({
			clientId:
				"928744329239-3vqekea7g0pt94varbkqqpufcqnmaf0t.apps.googleusercontent.com",
			developerKey: "AIzaSyAKJFEd61mxUV9-a9INy3Ndp_bv109hpU0",
			viewId: "DOCS",
			// token: token, // pass oauth token in case you already have one
			showUploadView: true,
			showUploadFolders: true,
			supportDrives: true,
			multiselect: true,
			// customViews: customViewsArray, // custom view
			callbackFunction: async (data) => {
				if (data.action === "cancel") {
					console.log("User clicked cancel/close button");
				}
				if (data.action == "picked") {
					setSelectedFile(data);
					// const response = await fetch("/api/notion");
					// const data = response.json();
					// downloadFile(data.docs[0].embedUrl, data.docs[0].name);
					// downloadPDF(data.docs[0].embedUrl);
				}
				console.log(await data);
			},
		});
	};

	const handleFileSelection = async () => {
		handleOpenPicker();
		// .then(() => {
		// 	downloadFile(
		// 		selectedFile.docs[0].embedUrl,
		// 		selectedFile.docs[0].name
		// 	);
		// });
		console.log(await selectedFile);

		console.log(await "files downloaded successfully");
	};

	return (
		<div>
			<div className="flex flex-col items-center justify-center h-auto">
				<button
					className="mb-4 p-4 border border-dashed border-gray-400 rounded-lg cursor-pointer"
					onClick={handleFileSelection}
				>
					Select a file from Google Drive
				</button>
			</div>
		</div>
	);
};

export default Gdrive;
