import {
  Avatar,
  Typography,
  List,
  Dropdown,
  Menu,
  Button,
  Divider,
  Input,
  Select,
  Card,
  Spin,
} from "antd";
import {
  CaretRightOutlined,
  LoadingOutlined,
  PlayCircleFilled,
  PlusOutlined,
} from "@ant-design/icons";
import { PlayArrowSharp } from "@mui/icons-material";
import "../index.css";
import store from "../store";

import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { getFirestore, collection, doc, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import Meta from "antd/lib/card/Meta";
import { Option } from "antd/lib/mentions";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const db = getFirestore();
const auth = getAuth();

function copy(mainObj) {
  let objCopy = {}; // objCopy will store a copy of the mainObj
  let key;

  for (key in mainObj) {
    objCopy[key] = mainObj[key]; // copies each property to the objCopy object
  }
  return objCopy;
}

function Gaurd() {
  if (auth.currentUser) {
    return <Playlist />;
  } else {
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin
          indicator={<LoadingOutlined style={{ fontSize: "10vh" }} spin />}
        />
      </div>
    );
  }
}

function Playlist() {
  const { id } = useParams();
  const [, setPlayingTrack] = store.useState("playingTrack");
  const [, setIsPlaying] = store.useState("isPlaying");
  const [, setTrackId] = store.useState("trackId");
  const [queue, setQueue] = store.useState("queue");
  const [isSearching, setIsSearching] = useState(false);
  const tracksRef = collection(
    doc(collection(db, "u", auth.currentUser.uid, "playlists"), id),
    "tracks"
  );
  const [data] = useDocumentData(
    doc(collection(db, "u", auth.currentUser.uid, "playlists"), id)
  );
  const [tracks] = useCollectionData(tracksRef);

  useEffect(() => {
    console.log(data, tracks);
  }, [data, tracks]);

  const playFromAlbum = (tracks, track, index) => {
    setTrackId(0);
    setQueue([]);
    setPlayingTrack({});
    setIsPlaying(false);

    let newTracks = [];
    for (let x of tracks) {
      let newTrack = copy(x);
      newTrack.url = "https://youtube.com/watch?v=" + x.videoId;
      newTrack.coverArt = x.thumbnails[x.thumbnails.length - 1].url;
      newTracks.push(newTrack);
    }

    console.log(newTracks);

    setTrackId(index);
    setQueue(newTracks);
    setPlayingTrack(newTracks[index]);
    setIsPlaying(true);

    console.log(queue);
  };

  const queueFromAlbum = (tracks, track) => {
    setIsPlaying(false);

    let newTracks = [];
    for (let x of tracks) {
      let newTrack = copy(x);
      newTrack.url = "https://youtube.com/watch?v=" + x.videoId;
      newTrack.coverArt = track.thumbnails[track.thumbnails.length - 1].url;
      newTracks.push(newTrack);
    }

    console.log(newTracks);

    setQueue([...queue, newTracks]);
    setIsPlaying(true);

    console.log(queue);
  };

  return (
    <>
      <div style={{ overflow: "auto" }} className="album-list">
        <div className="album-head">
          {data && data.cover && (
            <img className="album-cover" alt="cover" src={data.cover} />
          )}
          {data && !data.cover && (
            <img
              className="album-cover"
              alt="cover"
              src="https://source.unsplash.com/random/500x500/?music"
            />
          )}
          <>
            <div className="album-info">
              <div style={{ marginBottom: "1rem" }}>
                <Typography.Title
                  className="title"
                  level={1}
                  style={{ marginBottom: "0.5rem" }}
                >
                  {data && data.name && data.name}
                </Typography.Title>
                <div className="album-sub">
                  <Typography.Text style={{ paddingLeft: "5px" }}>
                    {data && data.description && data.description}
                  </Typography.Text>
                </div>
              </div>

              <div>
                <div className="album-sub">
                  {tracks && (
                    <Button
                      onClick={() => {
                        playFromAlbum(tracks, tracks[0], 0);
                      }}
                      type="primary"
                      shape="circle"
                      icon={<CaretRightOutlined />}
                    ></Button>
                  )}
                  <Typography.Text>
                    {tracks && tracks.length && (
                      <>
                        {tracks.length === 1 && <>1 song</>}
                        {tracks.length === 0 && <>No songs</>}
                        {tracks.length > 1 && <>{tracks.length} songs</>}
                      </>
                    )}
                  </Typography.Text>
                </div>
              </div>
            </div>
          </>
        </div>
        {tracks && (
          <div>
            <Divider
              style={{
                margin: "1% 2.5%",
              }}
            />
            <List
              style={{
                height: "fit-content",
                marginTop: "1rem",
                overflow: "none",
                padding: "1% 2.5%",
              }}
              dataSource={tracks}
              itemLayout="horizontal"
              locale={{ emptyText: "No Tracks" }}
              renderItem={(item, index) => (
                <Dropdown
                  trigger={["contextMenu"]}
                  overlay={
                    <Menu>
                      <Menu.Item
                        icon={
                          <PlayCircleFilled
                            onClick={() => {
                              playFromAlbum(tracks, item, index);
                            }}
                          />
                        }
                      >
                        Play
                      </Menu.Item>
                      <Menu.Item
                        onClick={() => {
                          queueFromAlbum(tracks, item);
                        }}
                        icon={<PlusOutlined />}
                      >
                        Add To Queue
                      </Menu.Item>
                    </Menu>
                  }
                >
                  <List.Item
                    className="search-item"
                    onClick={() => {
                      playFromAlbum(tracks, item, index);
                    }}
                    actions={[
                      <Button
                        shape="circle"
                        icon={<PlayArrowSharp />}
                        type="text"
                        onClick={() => {
                          playFromAlbum(tracks, item, index);
                        }}
                      />,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          style={{
                            height: 60,
                            width: 60,
                          }}
                          shape="square"
                          src={item.thumbnails[0].url}
                        />
                      }
                      title={item.name}
                      description={item.artists
                        .map((artist) => artist.name)
                        .join(", ")}
                    />
                  </List.Item>
                </Dropdown>
              )}
            />
            {isSearching && <SearchPage id={id} />}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "1rem",
              }}
            >
              <Button
                type="default"
                onClick={() => {
                  setIsSearching(!isSearching);
                }}
              >
                {isSearching && <>Done Searching</>}
                {!isSearching && <>Add Songs</>}
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function SearchPage(props) {
  const { id } = props;
  const [data, setData] = useState([]);
  const [, setPlayingTrack] = store.useState("playingTrack");
  const [, setTrackId] = store.useState("trackId");
  const [, setQueue] = store.useState("queue");
  const [searchMode, setSearchMode] = useState("song");

  const navigate = useNavigate();

  useEffect(() => {
    console.log(data);
  }, [data]);

  const searchYtMusic = async function (q) {
    const res = await fetch(
      `https://yt-dlapi.acutewoof.repl.co/api/${searchMode}/search?q=${q}`,
      {
        method: "GET",
        headers: {
          Mode: "no-cors",
          "X-Goog-Visitor-Id": "",
        },
      }
    );
    const data = await res.json();
    setData(data);
    return data;
  };

  const playYoutube = async function (track) {
    const res = await fetch(
      `http://152.67.77.86:8380/api/search?q=${track.name}%20${track.artists
        .map((artist) => artist.name)
        .join(", ")}
      )}`,
      {
        method: "GET",
        headers: {
          Mode: "no-cors",
        },
      }
    );
    const data = await res.json();
    data.results[0].video.thumbnails = track.thumbnails;
    data.results[0].video.album = track.album;
    data.results[0].video.coverArt = track.thumbnails[1].url;
    data.results[0].video.artists = track.artists;
    data.results[0].video.videoId = data.results[0].video.url.split("=")[1];
    data.results[0].video.name = track.name;
    setTrackId(0);
    setPlayingTrack(data.results[0].video);
    setQueue([data.results[0].video]);
  };

  const addToPlaylist = async function (track) {
    const res = await fetch(
      `https://cors-anywhere.acutewoof.repl.co/152.67.77.86:8380/api/search?q=${
        track.name
      }%20${track.artists.map((artist) => artist.name).join(", ")}
      )}`,
      {
        method: "GET",
        headers: {
          Mode: "no-cors",
        },
      }
    );
    const data = await res.json();
    data.results[0].video.coverArt = track.thumbnails[1].url;
    data.results[0].video.thumbnails = track.thumbnails;
    data.results[0].video.album = track.album;
    data.results[0].video.artists = track.artists;
    data.results[0].video.name = track.name;
    data.results[0].video.videoId = data.results[0].video.url.split("=")[1];
    const addingData = data.results[0].video;
    console.log(addingData);
    await addDoc(
      collection(
        doc(collection(db, "u", auth.currentUser.uid, "playlists"), id),
        "tracks"
      ),
      addingData
    );
  };

  return (
    <div className="search-page">
      <div
        style={{
          margin: "1.5rem 2rem",
        }}
      >
        <Input.Group compact>
          <Select
            defaultValue={searchMode}
            onChange={(value) => {
              setSearchMode(value);
            }}
            style={{ width: "90px" }}
          >
            <Option value="song">Songs</Option>
            <Option value="album">Albums</Option>
          </Select>
          <Input.Search
            style={{ width: "calc(100% - 90px)" }}
            allowClear
            onSearch={(value) => {
              console.log(value);
              searchYtMusic(value);
            }}
          />
        </Input.Group>
        {searchMode === "song" && (
          <List
            style={{
              height: "calc(75vh - 32px - 2rem)",
              marginTop: "1rem",
              overflow: "auto",
              padding: "0 16px",
            }}
            itemLayout="horizontal"
            dataSource={data}
            locale={{ emptyText: "No Results" }}
            renderItem={(item) => (
              <Dropdown
                trigger={["contextMenu"]}
                overlay={
                  <Menu>
                    <Menu.Item
                      onClick={() => {
                        playYoutube(item);
                      }}
                      icon={<PlayCircleFilled />}
                    >
                      Play
                    </Menu.Item>
                    <Menu.Item
                      onClick={() => {
                        addToPlaylist(item);
                      }}
                      icon={<PlusOutlined />}
                    >
                      Add To Playlist
                    </Menu.Item>
                  </Menu>
                }
              >
                <List.Item
                  className="search-item"
                  onClick={() => {
                    playYoutube(item);
                  }}
                  actions={[
                    <Button
                      shape="circle"
                      icon={<PlayArrowSharp />}
                      type="text"
                      onClick={() => {
                        playYoutube(item);
                      }}
                    />,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        style={{
                          height: 60,
                          width: 60,
                        }}
                        shape="square"
                        src={item.thumbnails[0].url}
                      />
                    }
                    title={item.name}
                    description={
                      <>
                        {item.artists.map((artist) => artist.name).join(", ")}

                        <em className="album-name-track-mobile">
                          {item.album.name}
                        </em>
                      </>
                    }
                  />
                  <p className="album-name-track">{item.album.name}</p>
                </List.Item>
              </Dropdown>
            )}
          />
        )}
        {searchMode === "album" && (
          <div
            style={{
              height: "calc(75vh - 32px - 2rem)",
              marginTop: "1rem",
              overflowY: "auto",
              overflowX: "hidden",
              padding: "0 16px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(226px, 1fr))",
              gridGap: "1rem",
              placeItems: "center",
            }}
          >
            {data &&
              data.map((album) => (
                <Card
                  style={{ width: 226 }}
                  className="hoverable-card"
                  onClick={() => {
                    navigate("/album/" + album.albumId);
                  }}
                  cover={
                    album &&
                    album.thumbnails &&
                    album.thumbnails[album.thumbnails.length - 1] && (
                      <img
                        alt="cover"
                        src={album.thumbnails[album.thumbnails.length - 1].url}
                      />
                    )
                  }
                >
                  <Meta
                    title={album.name}
                    description={
                      album.artists.length > 0
                        ? album.artists.map((artist) => artist.name).join(", ")
                        : "<Unknown Artist>"
                    }
                  />
                </Card>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Gaurd;
