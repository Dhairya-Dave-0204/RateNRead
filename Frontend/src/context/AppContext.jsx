import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  // State that checks users presence
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const checkSession = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/auth/check`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setUser(true);
      } else {
        setUser(false);
      }
    } catch (error) {
      setUser(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const value = {
    user,
    setUser,
    backendUrl,
    loading,
    setLoading,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
