import store from "../store";
import { List, Dropdown, Menu, Button, Avatar } from "antd";
import { PlayArrowSharp } from "@mui/icons-material";
import { MinusOutlined, PlayCircleFilled } from "@ant-design/icons";

function copy(mainObj) {
  let objCopy = {}; // objCopy will store a copy of the mainObj
  let key;

  for (key in mainObj) {
    objCopy[key] = mainObj[key]; // copies each property to the objCopy object
  }
  return objCopy;
}

function Queue() {
  const [queue, setQueue] = store.useState("queue");
  const [, setTrackId] = store.useState("trackId");
  const [, setPlayingTrack] = store.useState("playingTrack");
  const [, setIsPlaying] = store.useState("isPlaying");

  const playFromQueue = (tracks, _track, index) => {
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

  const removeFromQueue = (tracks, _track, index) => {
    let newTracks = [];
    for (let i = 0; i < tracks.length; i++) {
      if (i !== index) {
        newTracks.push(tracks[i]);
      }
    }
    setQueue(newTracks);
  };

  return (
    <div
      style={{
        overflow: "auto",
      }}
    >
      <List
        className="album-list"
        style={{
          marginTop: "1rem",
          overflow: "auto",
          padding: "0 16px",
        }}
        dataSource={queue}
        locale={{ emptyText: "Nothing in Queue" }}
        itemLayout="horizontal"
        renderItem={(item, index) => (
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item
                  icon={
                    <PlayCircleFilled
                      onClick={() => {
                        playFromQueue(queue, item, index);
                      }}
                    />
                  }
                >
                  Play
                </Menu.Item>
                <Menu.Item
                  onClick={() => {
                    removeFromQueue(queue, item, index);
                  }}
                  icon={<MinusOutlined />}
                >
                  Remove From Queue
                </Menu.Item>
              </Menu>
            }
            trigger={["contextMenu"]}
          >
            <List.Item
              className="search-item"
              onClick={() => {
                playFromQueue(queue, item, index);
              }}
              actions={[
                <Button
                  shape="circle"
                  icon={<PlayArrowSharp />}
                  type="text"
                  onClick={() => {
                    playFromQueue(queue, item, index);
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
  );
}

export default Queue;
