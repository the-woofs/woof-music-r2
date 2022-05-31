import store from "./store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "antd/dist/antd.dark.min.css";

import Main from "./Screens/Main";
import Artist from "./Screens/Artist";
import Playlist from "./Screens/Playlist";
import Search from "./Screens/Search";
import Album from "./Screens/Album";
import Track from "./Screens/Track";
import Footer from "./Components/Footer";
import { Layout } from "antd";
import MenuItems from "./Menu";
import ReactPlayer from "react-player";
import { useEffect, useRef } from "react";
import "./index.css";

const persist = { persist: true };

store.persist({
  saveState: function (key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  loadState: function (key) {
    const value = localStorage.getItem(key);
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  },
  removeState: function (key) {
    localStorage.removeItem(key);
  },
  clear: function () {
    localStorage.clear();
  },
});

store.setState("isPlayerBusy", 0);
store.setState("playingTrack", {}, persist);
store.setState("trackId", 0, persist);
store.setState("activePlaylistId", null, persist);
store.setState("queue", [], persist);
store.setState("volume", 7, persist);
store.setState("isPlaying", false);
store.setState("isSideBarCollapsed", false);
store.setState("progress", 0);
store.setState("currentTime", 0, persist);
store.setState("albumHistory", [], persist);

function App() {
  const [isCollapsed, setIsCollapsed] = store.useState("isSideBarCollapsed");
  const [isPlaying] = store.useState("isPlaying");
  const [playingTrack] = store.useState("playingTrack");
  const [, setProgress] = store.useState("progress");
  const [, setCurrentTime] = store.useState("currentTime");
  const [volume] = store.useState("volume");
  const [queue] = store.useState("queue");
  const [trackId] = store.useState("trackId");
  const footerHeight = "18vh";

  const playerRef = useRef();
  const sider = useRef();
  store.setState("playerRef", playerRef);

  useEffect(() => {
    console.log(isCollapsed);
  }, [isCollapsed]);

  useEffect(() => {
    console.log(sider.current.style.width);
  }, [sider]);

  return (
    <>
      <Router>
        <Layout hasSider>
          <Layout>
            <Layout.Sider
              collapsible
              style={{
                height: "calc(100vh - " + footerHeight + ")",
              }}
              breakpoint='lg'
              collapsedWidth='0'
              defaultCollapsed={isCollapsed}
              onCollapse={(collapsed, type) => {
                setIsCollapsed(collapsed);
              }}
              trigger={null}
              ref={sider}
            >
              <MenuItems />
            </Layout.Sider>
            <Layout>
              <Layout.Content
                className='content'
                style={{
                  height: `calc(100vh - ${footerHeight})`,
                  position: "fixed",
                  right: 0,
                }}
              >
                <Redirects />
              </Layout.Content>
            </Layout>
          </Layout>
          <Layout.Footer
            style={{
              position: "fixed",
              right: 0,
              bottom: 0,
              width: "100%",
              height: footerHeight,
              backgroundColor: "#141414",
              borderTop: "1px solid #303030",
              paddingLeft: "14px",
              paddingRight: "14px",
            }}
          >
            {playingTrack && (
              <ReactPlayer
                style={{ display: "none" }}
                url={playingTrack.url}
                playing={isPlaying}
                ref={playerRef}
                volume={volume ? volume / 10 : 1}
                onEnded={() => {
                  store.setState("isPlaying", false);
                  store.setState("isPlayerBusy", 0);
                  store.setState("currentTime", 0);
                  store.setState("progress", 0);

                  let nextTrackId = trackId + 1;
                  if (queue.length > trackId) {
                    store.setState("trackId", nextTrackId);
                    store.setState("playingTrack", queue[nextTrackId]);
                  }
                }}
                onProgress={(e) => {
                  setProgress(e.played);
                  setCurrentTime(e.playedSeconds);
                }}
              />
            )}
            <Footer />
          </Layout.Footer>
        </Layout>
      </Router>
    </>
  );
}

function Redirects() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/playlist/' element={<Playlist listEm />} />
        <Route path='/playlist/:id' element={<Playlist />} />
        <Route path='/search' element={<Search noIn />} />
        <Route path='/search/:query' element={<Search />} />
        <Route path='/track/:id' element={<Track />} />
        <Route path='/artist/:id' element={<Artist />} />
        <Route path='/album/:id' element={<Album />} />
      </Routes>
    </>
  );
}

export default App;
