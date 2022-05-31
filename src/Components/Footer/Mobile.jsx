import { Avatar, Button } from "antd";
import Meta from "antd/lib/card/Meta";
import "./index.css";

import { PauseOutlined } from "@ant-design/icons";
import { PlayArrow } from "@mui/icons-material";

import store from "../../store";

function Mobile() {
  const [track] = store.useState("playingTrack");
  const [isPlaying, setIsPlaying] = store.useState("isPlaying");

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
          <div>
            <Button
              type='primary'
              shape='circle'
              onClick={() => {
                setIsPlaying(!isPlaying);
              }}
              icon={<>{isPlaying ? <PauseOutlined /> : <PlayArrow />}</>}
            ></Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Mobile;
