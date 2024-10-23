"use client";

import { type FC, useState } from "react";
import { useNilComputeOutput } from "@nillion/client-react-hooks";
import { ComputeOutputId } from "@nillion/client-core";

export const ComputeOutput: FC = () => {
  const nilComputeOutput = useNilComputeOutput();
  const [computeId, setComputeId] = useState<ComputeOutputId | string>("");

  const handleClick = () => {
    if (!computeId) throw new Error("compute-output: Compute id is required");
    nilComputeOutput.execute({ id: computeId });
  };

  let computeOutput = "idle";
  if (nilComputeOutput.isSuccess) {
    computeOutput = JSON.stringify(nilComputeOutput.data, (key, value) => {
      if (typeof value === "bigint") {
        return value.toString();
      }
      return value;
    });
  }

  return (
    <div className="border border-gray-400 rounded-lg p-4 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">Compute Output</h2>
      <input
        className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
        placeholder="Compute output id"
        value={computeId}
        onChange={(e) => setComputeId(e.target.value)}
      />
      <button
        className={`flex items-center justify-center px-4 py-2 border rounded text-black  ${
          !computeId || nilComputeOutput.isLoading
            ? "opacity-50 cursor-not-allowed bg-gray-200"
            : "bg-white hover:bg-gray-100"
        }`}
        onClick={handleClick}
        disabled={!computeId || nilComputeOutput.isLoading}
      >
        {nilComputeOutput.isLoading ? (
          <div className="w-5 h-5 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
        ) : (
          "Fetch"
        )}
      </button>
      <ul className="list-disc pl-5 mt-4">
        <li className="mt-2">Status: {nilComputeOutput.status}</li>
        <li className="mt-2">Output: {computeOutput}</li>
      </ul>
    </div>
  );
};
