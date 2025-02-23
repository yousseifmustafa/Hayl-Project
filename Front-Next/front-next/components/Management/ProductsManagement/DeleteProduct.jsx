"use client";
import { useState } from "react";

export default function DeleteProjectModal({ id, setView }) {
  const [input, setInput] = useState("");
  const isDisabled = input !== "delete";

  return (
    <div className="fixed inset-0 flex trans justify-center items-center">
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-[40%] text-center">
        <h2 className="text-xl font-semibold">Delete project</h2>
        <p className="mt-2">Are you sure you want to delete <strong>This Product</strong>?</p>
        <input 
          type="text" 
          placeholder='Write "delete" to proceed' 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 mt-4 rounded bg-gray-800 text-white border border-gray-600"
        />
        <button 
          onClick={() => console.log("deleted")} 
          disabled={isDisabled}
          className={`w-full p-2 mt-4 rounded ${isDisabled ? "bg-gray-700 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"}`}
        >
          Delete
        </button>
        <button 
          onClick={() => setView("discover")} 
          className="w-full p-2 mt-2 rounded bg-gray-700 hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
