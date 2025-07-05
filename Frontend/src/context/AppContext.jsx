import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  // State that checks users presence
  const [user, setUser] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  // Function to fetch Logged-In User on App Load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/check", {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (err) {
        console.error("Not logged in or session expired. Error via AppContext");
      }
    };

    fetchUser();
  }, []);

  const value = {
    user,
    setUser,
    backendUrl,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;