"use client";

import React, { useState } from "react";
import { useNilFetchValue } from "@nillion/client-react-hooks";

export default function FetchValue() {
  const nilFetch = useNilFetchValue({
    type: "SecretInteger",
    staleAfter: 10000,
  });
  const [id, setId] = useState<string>("");

  const handleClick = () => {
    if (!id) throw new Error("fetch-value: Id is required");
    nilFetch.execute({ id, name: "data" });
  };

  return (
    <div className="border border-gray-400 rounded-lg p-4 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-2">Fetch Value</h2>
      <input
        type="text"
        className="w-full p-2 mb-2 border border-gray-300 rounded text-black"
        placeholder="Store id"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <button
        className={`flex items-center justify-center w-40 px-4 py-2 mt-4 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 ${
          !id || nilFetch.isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleClick}
        disabled={!id || nilFetch.isLoading}
      >
        {nilFetch.isLoading ? (
          <div className="w-5 h-5 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
        ) : (
          <>Fetch</>
        )}
      </button>
      <ul className="mt-4">
        <li className="mt-2">Status: {nilFetch.status}</li>
        <li className="mt-2">
          Secret: {nilFetch.isSuccess ? nilFetch.data : "idle"}
        </li>
      </ul>
    </div>
  );
}
