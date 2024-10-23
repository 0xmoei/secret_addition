"use client";

import { createSignerFromKey } from "@nillion/client-payments";
import { useNillionAuth, UserCredentials } from "@nillion/client-react-hooks";
import { useEffect, useState } from "react";

export const Login = () => {
  const { authenticated, login, logout } = useNillionAuth();
  // Feel free to set this to other values + useSetState
  const SEED = "example-secret-seed";
  const SECRET_KEY =
    "9a975f567428d054f2bf3092812e6c42f901ce07d9711bc77ee2cd81101f42c5";

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("authenticated", authenticated);
  }, [authenticated]);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const credentials: UserCredentials = {
        userSeed: SEED,
        signer: () => createSignerFromKey(SECRET_KEY),
      };
      await login(credentials);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await logout();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-row flex my-6">
      {authenticated ? (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleLogout}
          disabled={isLoading}
        >
          {isLoading ? "Logging out..." : "Logout"}
        </button>
      ) : (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      )}
    </div>
  );
};
