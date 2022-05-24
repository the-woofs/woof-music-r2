import store from "./store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "antd/dist/antd.dark.min.css";

import Main from "./Screens/Main";
import Playlist from "./Screens/Playlist";
import Search from "./Screens/Search";

store.setState("isPlayerBusy", 0);
store.setState("track", {});
store.setState("trackId", 0);
store.setState("activePlaylistId", null);
store.setState("queue", []);

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/playlist/' element={<Playlist listEm />} />
          <Route path='/playlist/:id' element={<Playlist />} />
          <Route path='/search' element={<Search noIn />} />
          <Route path='/search/:query' element={<Search />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
