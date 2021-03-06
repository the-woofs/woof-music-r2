import { PlayCircleFilled, PlusOutlined } from "@ant-design/icons";
import { PlayArrowSharp } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  Dropdown,
  Input,
  List,
  Menu,
  Select,
} from "antd";
import Meta from "antd/lib/card/Meta";
import { Option } from "antd/lib/mentions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import store from "../store";
import "../index.css";

function SearchPage() {
  const [data, setData] = useState([]);
  const [, setPlayingTrack] = store.useState("playingTrack");
  const [, setTrackId] = store.useState("trackId");
  const [queue, setQueue] = store.useState("queue");
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
      `https://youtube-scrape.acutewoof.repl.co/api/search?q=${
        track.name
      }%20${track.artists.map((artist) => artist.name).join(", ")}
      `,
      {
        method: "GET",
      }
    );
    const data = await res.json();
    data.results[0].video.coverArt = track.thumbnails[1].url;
    data.results[0].video.album = track.album;
    data.results[0].video.artists = track.artists;
    data.results[0].video.name = track.name;
    setTrackId(0);
    setPlayingTrack(data.results[0].video);
    setQueue([data.results[0].video]);
  };

  const queueYoutube = async function (track) {
    const res = await fetch(
      `https://youtube-scrape.acutewoof.repl.co/api/search?q=${
        track.name
      }%20${track.artists.map((artist) => artist.name).join(", ")}
      `,
      {
        method: "GET",
      }
    );
    const data = await res.json();
    data.results[0].video.coverArt = track.thumbnails[1].url;
    data.results[0].video.album = track.album;
    data.results[0].video.artists = track.artists;
    data.results[0].video.name = track.name;
    setQueue([...queue, data.results[0].video]);
    console.log(queue);
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
                        queueYoutube(item);
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

export default SearchPage;
