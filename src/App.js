import "./App.css";
import Navbar from "./Components/Navbar";
import PostCard from "./Components/PostCard";
import NewPost from "./Components/NewPost";
import LeftAboutCard from "./Components/LeftAboutCard";
import GroupsClub from "./Components/GroupsClub";
import PeersNews from "./Components/PeersNews";
import Opportunities from "./Components/Opportunities";
function App() {
  return (
    <div className="">
      <Navbar />
      <div className="flex">
        <div>
          <div className="hidden md:inline">
            <LeftAboutCard />
            <GroupsClub />
          </div>
        </div>
        <div className="">
          <NewPost />
          <PostCard />
        </div>
        <div className="hidden md:inline">
          <PeersNews />
          <Opportunities />
        </div>
      </div>
    </div>
  );
}

export default App;
