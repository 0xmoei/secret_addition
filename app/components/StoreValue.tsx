"use client";

import React, { useState } from "react";
import { useNilStoreValue } from "@nillion/client-react-hooks";

export default function StoreValue() {
  const nilStore = useNilStoreValue();
  const [secret, setSecret] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    if (!secret) throw new Error("store-value: Value required");
    nilStore.execute({ name: "data", data: secret, ttl: 1 });
  };

  return (
    <div className="border border-gray-400 rounded-lg p-4 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-2">Store Secret Integer</h2>
      <input
        type="number"
        className="w-full p-2 mb-2 border border-gray-300 rounded text-black"
        placeholder="Secret value"
        value={secret || ""}
        onChange={(e) => setSecret(Number(e.target.value))}
      />
      <button
        className={`flex items-center justify-center w-40 px-4 py-2 mt-4 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 ${
          !secret || nilStore.isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleClick}
        disabled={!secret || nilStore.isLoading}
      >
        {nilStore.isLoading ? (
          <div className="w-5 h-5 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
        ) : (
          <>Store</>
        )}
      </button>
      <ul className="mt-4">
        <li className="mt-2">Status: {nilStore.status}</li>
        <li className="mt-2">
          Id:
          {nilStore.isSuccess ? (
            <>
              {`${nilStore.data?.substring(0, 6)}...${nilStore.data?.substring(nilStore.data.length - 6)}`}
              <button
                onClick={() => {
                  setCopied(true);
                  navigator.clipboard.writeText(nilStore.data);
                  setTimeout(() => setCopied(false), 2000);
                }}
              >
                {!copied ? " 📋" : " ✅"}
              </button>
            </>
          ) : (
            "idle"
          )}
        </li>
      </ul>
    </div>
  );
}
