import {
  Avatar,
  Typography,
  List,
  Dropdown,
  Menu,
  Button,
  Divider,
} from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  CaretRightOutlined,
  PlayCircleFilled,
  PlusOutlined,
} from "@ant-design/icons";
import { PlayArrowSharp } from "@mui/icons-material";
import "../index.css";
import store from "../store";

function copy(mainObj) {
  let objCopy = {}; // objCopy will store a copy of the mainObj
  let key;

  for (key in mainObj) {
    objCopy[key] = mainObj[key]; // copies each property to the objCopy object
  }
  return objCopy;
}

function Album() {
  const { id } = useParams();

  const [data, setData] = useState([]);
  const [avatars, setAvatars] = useState([]);
  const [, setPlayingTrack] = store.useState("playingTrack");
  const [, setIsPlaying] = store.useState("isPlaying");
  const [, setTrackId] = store.useState("trackId");
  const [queue, setQueue] = store.useState("queue");
  const [history, setHistory] = store.useState("albumHistory");

  const getData = async () => {
    const res = await fetch(
      `https://yt-dlapi.acutewoof.repl.co/api/get/album/${id}`,
      {
        method: "GET",
      }
    );
    const data = await res.json();
    setData(data);
    if (!history) {
      setHistory([data]);
    } else {
      for (let item of history) {
        if (item.albumId === data.albumId) {
          return data;
        }
      }
      const historyArray = [...history, data];
      setHistory(historyArray);
    }
    console.log(history);
    console.log(data);
    return data;
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getChannelInfo = async (id) => {
    const res = await fetch(
      `https://yt-dlapi.acutewoof.repl.co/api/get/album/${id}`,
      {
        method: "GET",
        headers: {
          Mode: "no-cors",
          "X-Goog-Visitor-Id": "",
        },
      }
    );
    const data = await res.json();
    const existingAvatars = avatars;
    existingAvatars.push(data.thumbnails[data.thumbnails.length - 1].url);
    setAvatars(existingAvatars);
  };

  useEffect(() => {
    setAvatars([]);
    if (data.artists) {
      data.artists.forEach((artist) => {
        getChannelInfo(artist.artistId);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.artists]);

  useEffect(() => {
    console.log(avatars);
  }, [avatars]);

  const playFromAlbum = (tracks, _track, index) => {
    setTrackId(0);
    setQueue([]);
    setPlayingTrack({});
    setIsPlaying(false);

    let newTracks = [];
    for (let x of tracks) {
      let newTrack = copy(x);
      newTrack.url = "https://youtube.com/watch?v=" + x.videoId;
      newTrack.coverArt = data.thumbnails[3].url;
      newTracks.push(newTrack);
    }

    console.log(newTracks);

    setTrackId(index);
    setQueue(newTracks);
    setPlayingTrack(newTracks[index]);
    setIsPlaying(true);

    console.log(queue);
  };

  const queueFromAlbum = (tracks, _track) => {
    setIsPlaying(false);

    let newTracks = [];
    for (let x of tracks) {
      let newTrack = copy(x);
      newTrack.url = "https://youtube.com/watch?v=" + x.videoId;
      newTrack.coverArt = data.thumbnails[3].url;
      newTracks.push(newTrack);
    }

    console.log(newTracks);

    setQueue([...queue, newTracks]);
    setIsPlaying(true);

    console.log(queue);
  };

  return (
    <div style={{ overflow: "auto" }} className="album-list">
      <div className="album-head">
        {data && data.thumbnails && (
          <img
            className="album-cover"
            alt="cover"
            src={data.thumbnails[3].url}
          />
        )}
        <>
          <div className="album-info">
            <Typography.Title className="title" level={1}>
              {data && data.name}
            </Typography.Title>
            <div className="album-sub">
              {data && data.artists && (
                <Avatar.Group maxCount={2} size="medium">
                  {avatars.map((avatar) => (
                    <Avatar src={avatar} alt="artist" />
                  ))}
                </Avatar.Group>
              )}

              <Typography.Text
                style={{
                  margin: 0,
                }}
                className="artists-name-album"
              >
                {data.artists &&
                  data.artists.map((artist) => artist.name).join(", ")}
                {data && data.year && ` - ${data.year}`}
              </Typography.Text>

              {data && data.songs && (
                <div style={{ margin: "0 14px" }}>
                  <Button
                    onClick={() => {
                      playFromAlbum(data.songs, data.songs[0], 0);
                    }}
                    type="primary"
                    shape="circle"
                    icon={<CaretRightOutlined />}
                  ></Button>
                </div>
              )}
            </div>
          </div>
        </>
      </div>

      {data.songs && (
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
            dataSource={data.songs}
            itemLayout="horizontal"
            renderItem={(item, index) => (
              <Dropdown
                trigger={["contextMenu"]}
                overlay={
                  <Menu>
                    <Menu.Item
                      icon={
                        <PlayCircleFilled
                          onClick={() => {
                            playFromAlbum(data.songs, item, index);
                          }}
                        />
                      }
                    >
                      Play
                    </Menu.Item>
                    <Menu.Item
                      onClick={() => {
                        queueFromAlbum(data.songs, item);
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
                    playFromAlbum(data.songs, item, index);
                  }}
                  actions={[
                    <Button
                      shape="circle"
                      icon={<PlayArrowSharp />}
                      type="text"
                      onClick={() => {
                        playFromAlbum(data.songs, item, index);
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
        </div>
      )}
    </div>
  );
}

export default Album;
