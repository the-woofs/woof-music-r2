import { Avatar, Button, Space } from "antd";
import Meta from "antd/lib/card/Meta";
import "./index.css";

import { PauseOutlined } from "@ant-design/icons";
import { Launch, PlayArrow } from "@mui/icons-material";

import store from "../../store";
import { useNavigate } from "react-router-dom";

function Mobile() {
  const [track] = store.useState("playingTrack");
  const [isPlaying, setIsPlaying] = store.useState("isPlaying");

  const navigate = useNavigate();

  return (
    <div className='mobile'>
      {track && (
        <>
          <Meta
            style={{
              padding: "0px 14px",
            }}
            avatar={
              <Avatar
                style={{
                  objectFit: "contain",
                  maxHeight: "100%",
                  maxWidth: "100%",
                }}
                shape='square'
                size='large'
                src={
                  track.coverArt
                    ? track.coverArt
                    : "https://via.placeholder.com/150"
                }
              />
            }
            title={track.name}
            description={
              <>
                {track.artists &&
                  track.artists.map((artist) => artist.name).join(", ")}
              </>
            }
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Space
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                type='text'
                shape='circle'
                onClick={() => {
                  navigate("/status");
                }}
                icon={<Launch />}
              ></Button>
              <Button
                type='primary'
                shape='circle'
                onClick={() => {
                  setIsPlaying(!isPlaying);
                }}
                icon={<>{isPlaying ? <PauseOutlined /> : <PlayArrow />}</>}
              ></Button>
            </Space>
          </div>
        </>
      )}
    </div>
  );
}

export default Mobile;
