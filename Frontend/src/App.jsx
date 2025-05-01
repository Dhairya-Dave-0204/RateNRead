import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import AppContextProvider from "./context/AppContext";
import { Home } from "./pages/page_index";
import { Footer, Navbar } from "./components/component_index";

function App() {
  return (
    <>
      <AppContextProvider>
        <ToastContainer position="bottom-right" autoClose={3000} />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </AppContextProvider>
    </>
  );
}

export default App;
