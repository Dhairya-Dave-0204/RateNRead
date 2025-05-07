import React, { useContext } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import { Home, Contact, About, FAQ, Books, SignIn, SignUp } from "./pages/page_index";
import { Footer, Navbar, Sidebar } from "./components/component_index";

function App() {
  const {user} = useContext(AppContext)

  return (
    <>
        <ToastContainer position="bottom-right" autoClose={3000} />
        {!user ? (
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/books" element={<Books />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FAQ />} />
            </Routes>
            <Footer />
          </>
        ) : (
          <>
            <div className="flex min-h-screen">
              <Sidebar />
              <div className="flex-1 p-5">
                
              </div>
            </div>
          </>
        )}
    </>
  );
}

export default App;
