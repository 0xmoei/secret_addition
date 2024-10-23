"use client";

import { type FC, useState } from "react";
import {
  NadaValue,
  NadaValues,
  NamedValue,
  PartyName,
  ProgramBindings,
  ProgramId,
} from "@nillion/client-core";
import { useNilCompute, useNillion } from "@nillion/client-react-hooks";

export const Compute: FC = () => {
  const { client } = useNillion();
  const nilCompute = useNilCompute();
  const [programId, setProgramId] = useState<ProgramId | string>("");
  const [copiedComputeOutputID, setCopiedComputeOutputID] = useState(false);

  const handleClick = () => {
    if (!programId) throw new Error("compute: program id required");

    const bindings = ProgramBindings.create(programId)
      .addInputParty(PartyName.parse("Party1"), client.partyId)
      .addOutputParty(PartyName.parse("Party1"), client.partyId);

    // Note: This is hardcoded for demo purposes.
    // Feel free to change the NamedValue to your required program values.
    const values = NadaValues.create()
      .insert(NamedValue.parse("my_int1"), NadaValue.createSecretInteger(2))
      .insert(NamedValue.parse("my_int2"), NadaValue.createSecretInteger(4));

    nilCompute.execute({ bindings, values });
  };

  return (
    <div className="border border-gray-400 rounded-lg p-4 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">Compute</h2>
      <input
        className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
        placeholder="Program id"
        value={programId}
        onChange={(e) => setProgramId(e.target.value)}
      />
      <button
        className={`flex items-center justify-center px-4 py-2 border rounded text-black mb-4 ${
          nilCompute.isLoading || !programId
            ? "opacity-50 cursor-not-allowed bg-gray-200"
            : "bg-white hover:bg-gray-100"
        }`}
        onClick={handleClick}
        disabled={nilCompute.isLoading || !programId}
      >
        {nilCompute.isLoading ? (
          <div className="w-5 h-5 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
        ) : (
          "Compute"
        )}
      </button>
      <p className="my-2 italic text-sm mt-2">
        Current values are 4 & 2. Refer to ComputeOutput.tsx
      </p>
      <ul className="list-disc pl-5 mt-4">
        <li className="mt-2">Status: {nilCompute.status}</li>
        <li className="mt-2">
          Compute output id:
          {nilCompute.isSuccess ? (
            <>
              {`${nilCompute.data?.substring(0, 4)}...${nilCompute.data?.substring(nilCompute.data.length - 4)}`}
              <button
                onClick={() => {
                  setCopiedComputeOutputID(true);
                  navigator.clipboard.writeText(nilCompute.data);
                  setTimeout(() => setCopiedComputeOutputID(false), 2000);
                }}
              >
                {!copiedComputeOutputID ? " 📋" : " ✅"}
              </button>
            </>
          ) : (
            "idle"
          )}
        </li>
      </ul>
    </div>
  );
};
