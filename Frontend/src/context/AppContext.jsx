import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(null); // holds user object or null
  const [loading, setLoading] = useState(true);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchUser = async () => {
    try {
      console.log("Backend URL:", backendUrl);
      const res = await axios.get(`${backendUrl}/api/user/profile`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setUser(res.data.user); // store full user data
      } else {
        setUser(null);
      } 
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const value = {
    user,
    setUser,
    backendUrl,
    loading,
    setLoading,
    fetchUser,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
