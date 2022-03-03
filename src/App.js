import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/NavBar/Navbar";
import Error from "./Components/Error/404";
import Signup from './Components/Auth/Signup'
import Login from './Components/Auth/Login'; 
import PrivateComp from "./Components/Auth/PrivateComp";
import Footer from './Components/Footer/Footer'
import Feed from "./Components/Feed/Feed";
import Profile from "./Components/profile/Profile";
import { ContextProvider } from './Components/context/ContextProvider'
import EditProfile from "./Components/profile/EditProfile";
import Messages from "./Components/Messages/Messages";
import Chat from "./Components/Messages/Chat";
function App() {
  return (
    <>
      <BrowserRouter>
        <ContextProvider>

          <Navbar />
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/*" element={<Error />} />
            <Route element={<PrivateComp/>}>
            <Route path="/" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/chat/:user" element={<Chat />} />
            <Route path="/editProfile" element={<EditProfile />} />
            </Route>
          </Routes>
          {/* <ToastContainer theme="dark" /> */}
          <Footer />
        </ContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
