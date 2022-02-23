import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { useContext } from "react";
import { BsSun } from 'react-icons/bs'
import { BsMoonFill } from 'react-icons/bs'
import Navbar from "./Components/NavBar/Navbar";
import Error from "./Components/Error/404";
import Signup from './Components/Auth/Signup'
import Login from './Components/Auth/Login'
import Footer from './Components/Footer/Footer'
import Feed from "./Components/Feed/Feed";
import Profile from "./Components/profile/Profile";
import Darkmode from "./Components/DarkMode/Darkmode";
import ContextProvider from './Components/context/ContextProvider'
function App() {
  const { darkMode, changeMode } = useContext(ContextProvider);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/*" element={<Error />} />
        </Routes>
        {/* <ToastContainer theme="dark" /> */}

        <Footer />
        <Darkmode />
      </BrowserRouter>
    </>
  );
}

export default App;
