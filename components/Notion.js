import { useRouter } from "next/router";

const NextButton = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/notion");
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-auto">
        <button
          className="mb-4 p-4 border border-dashed border-gray-400 rounded-lg cursor-pointer"
          onClick={handleRedirect}
        >
          Select a file from Notion
        </button>
      </div>
    </div>
  );
};

export default NextButton;
