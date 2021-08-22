import { useEffect, useState } from "react";
import useLocalStorage from "./use-local-storage";

function useAuthentication() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useLocalStorage<undefined | string>(
    "session_key",
    undefined
  );

  const logout = () => setToken(undefined);
  const login = (token: string) => setToken(token);

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [token]);

  return { isAuthenticated, logout, login, token };
}

export default useAuthentication;
