import React from "react";
import DropboxChooser from "react-dropbox-chooser";

const Dropbox = () => {
	const handleFileSelection = async () => {
		try {
			console.log("Working");
			// const response = await fetch("/api/notion");
			// const data = response.json();
		} catch (error) {
			console.error("Error retrieving files:", error);
		}
	};
	return (
		<div className="flex flex-col items-center justify-center h-auto">
			<DropboxChooser
				appKey={process.env.NEXT_PUBLIC_DROPBOX_API_KEY}
				success={(files) => console.log("chose:", files)}
				cancel={() => console.log("closed")}
				multiselect={true}
			>
				<button
					className="dropbox-button mb-4 p-4 border border-dashed border-gray-400 rounded-lg cursor-pointer"
					onClick={handleFileSelection}
				>
					Select a file from Dropbox
				</button>
			</DropboxChooser>
		</div>
	);
};

export default Dropbox;
