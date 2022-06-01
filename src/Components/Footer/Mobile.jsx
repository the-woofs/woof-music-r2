import { Avatar, Button, Space } from "antd";
import Meta from "antd/lib/card/Meta";
import "./index.css";

import { PauseOutlined } from "@ant-design/icons";
import { Launch, PlayArrow } from "@mui/icons-material";

import store from "../../store";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Mobile() {
  const [track] = store.useState("playingTrack");
  const [isPlaying, setIsPlaying] = store.useState("isPlaying");
  const [footerRef] = store.useState("footerRef");

  const navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    if (footerRef.current && location.pathname === "/status") {
      console.log(footerRef.current);
      footerRef.current.className = "footer-status";
    } else if (footerRef.current) {
      console.log(footerRef.current);
      footerRef.current.className = "ant-layout-footer";
    }
  }, [footerRef, location.pathname]);

  return (
    <div
      className='mobile'
      style={location.pathname === "/status" ? { display: "none" } : {}}
    >
      {track && (
        <>
          <Meta
            style={{
              width: "50vw",
              overflow: "hidden",
              padding: "0px 14px",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              margin: 0,
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
