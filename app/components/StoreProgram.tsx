"use client";

import { type FC, useState, useRef } from "react";
import { useNilStoreProgram } from "@nillion/client-react-hooks";

export const StoreProgram: FC = () => {
  const nilStoreProgram = useNilStoreProgram();
  const [name, setName] = useState<string>("");
  const [program, setProgram] = useState<Uint8Array | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [copiedProgramID, setProgramIDCopied] = useState(false);

  const handleSave = () => {
    if (!name || !program)
      throw new Error("store-program: Name and program data required");
    nilStoreProgram.execute({ name, program });
  };

  const handleOpen = () => {
    console.log("Open file");
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result;
        if (content) {
          setProgram(new Uint8Array(content as ArrayBuffer));
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div className="border border-gray-400 rounded-lg p-4 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">Store Program</h2>
      <input
        className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
        placeholder="Program name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 border rounded text-black ${
            nilStoreProgram.isLoading
              ? "opacity-50 bg-gray-200 cursor-not-allowed"
              : "bg-white hover:bg-gray-100"
          }`}
          onClick={handleOpen}
          disabled={nilStoreProgram.isLoading}
        >
          Open File
        </button>
        <button
          className={`px-4 py-2 border rounded text-black ${
            !name || !program || nilStoreProgram.isLoading
              ? "opacity-50 bg-gray-200 cursor-not-allowed"
              : "bg-white hover:bg-gray-100"
          }`}
          onClick={handleSave}
          disabled={!name || !program || nilStoreProgram.isLoading}
        >
          {nilStoreProgram.isLoading ? (
            <div className="w-5 h-5 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
          ) : (
            "Store"
          )}
        </button>
      </div>
      <p className="my-2 italic">Upload the .bin file from target directory</p>
      <ul className="list-disc pl-5">
        <li className="mt-2">Status: {nilStoreProgram.status}</li>
        <li className="mt-2">File name: {fileName || "unset"}</li>
        <li className="mt-2">
          Program id:
          {nilStoreProgram.isSuccess ? (
            <>
              {`${nilStoreProgram.data?.substring(0, 4)}...${nilStoreProgram.data?.substring(nilStoreProgram.data.length - 4)}`}
              <button
                onClick={() => {
                  setProgramIDCopied(true);
                  navigator.clipboard.writeText(nilStoreProgram.data);
                  setTimeout(() => setProgramIDCopied(false), 2000);
                }}
              >
                {!copiedProgramID ? " 📋" : " ✅"}
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
