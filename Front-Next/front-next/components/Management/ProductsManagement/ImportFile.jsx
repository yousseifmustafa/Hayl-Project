import { useState, useCallback } from "react";

export default function ImportFile({ setView }) {
  const [file, setFile] = useState(null);
  const [accepted, setAccepted] = useState(false);

  const handleFileChange = useCallback((e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
    } else {
      setFile(null);
      alert("Please select a valid CSV file.");
    }
  }, []);

  const handleUpload = () => {
    if (file && accepted) {
      console.log("Uploading:", file.name);
      // Simulate API call
      setTimeout(() => alert("File uploaded successfully!"), 1000);
    }
  };

  return (
    <div className="fixed inset-0 trans flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[40%] text-center">
        <h2 className="text-xl font-semibold">Import CSV</h2>
        <p className="mt-2 text-gray-600">You can browse your computer for a file.</p>
        <input 
          type="file" 
          accept=".csv" 
          onChange={handleFileChange} 
          className="w-full p-2 mt-4 border border-gray-300 rounded" 
        />
        <label className="flex items-center mt-4 text-gray-700">
          <input 
            type="checkbox" 
            checked={accepted} 
            onChange={() => setAccepted((prev) => !prev)}
            className="mr-2"
          />
          I accept the terms and conditions
        </label>
        <div className="flex justify-end gap-3 items-center mt-4">
          <button 
            onClick={() => setView("discover")} 
            className="px-8 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 hover:cursor-pointer"
          >
            Close
          </button>
          <button 
            onClick={handleUpload} 
            disabled={!file || !accepted}
            className={`px-8 py-2 rounded ${!file || !accepted ? "bg-gray-300 cursor-not-allowed" : "bg-custom-yellow-4 hover:bg-yellow-600 transition-colors hover:cursor-pointer text-white"}`}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
