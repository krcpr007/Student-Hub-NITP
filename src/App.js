import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/NavBar/Navbar";
import Error from "./Components/Error/404";
import Signup from './Components/Auth/Signup'
import Login from './Components/Auth/Login'
import Footer from './Components/Footer/Footer'
import Feed from "./Components/Feed/Feed";
function App() {
  return (
    <>
     <BrowserRouter>
          <Navbar />
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Feed />} />
            <Route path="/*" element={<Error />} />
          </Routes>
          {/* <ToastContainer theme="dark" /> */}
          <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
