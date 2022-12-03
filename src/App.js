import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
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
import UsersProfile from "./Components/profile/UsersProfile";
import Messages from "./Components/Messages/Messages";
import Chat from "./Components/Messages/Chat";
import About from "./Components/About/About";
import { ToastContainer } from 'react-toastify'
import Search from "./Components/Search/Search";
import Connections from "./Components/connections/Connections";
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
            <Route path="/about" element={<About />} />
            <Route path="/*" element={<Error />} />
            <Route element={<PrivateComp />}>
              <Route path="/search" element={<Search />} />
              <Route path="/" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/chat/:uid" element={<Chat />} />
              <Route path="/editProfile" element={<EditProfile />} />
              <Route path="/user/:uid" element={<UsersProfile />} />
            </Route>
          </Routes>
          <ToastContainer
            position="top-center"
            closeOnClick pauseOnFocusLoss
            draggable
            pauseOnHover
            newestOnTop={true}
            theme='dark' />
          <Footer />
        </ContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
