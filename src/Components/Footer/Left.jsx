import { Avatar } from "antd";
import Meta from "antd/lib/card/Meta";
import "./index.css";

import store from "../../store";

function Left() {
  const [track] = store.useState("playingTrack");

  return (
    <div className='left-component'>
      {track && (
        <>
          <Meta
            style={{
              width: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              margin: 0,
            }}
            avatar={
              <Avatar
                src={
                  track.coverArt
                    ? track.coverArt
                    : "https://via.placeholder.com/150"
                }
                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                shape='square'
              />
            }
            title={
              <div
                style={{
                  maxWidth: "80%",
                }}
              >
                {track.name}
              </div>
            }
            description={
              <>
                {track.artists &&
                  track.artists.map((artist, index) => (
                    <>
                      {index !== 0 && ", "}
                      {artist.name}
                    </>
                  ))}
              </>
            }
          />
        </>
      )}
      {!track && (
        <Meta
          avatar={
            <Avatar
              src={"https://via.placeholder.com/150"}
              size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
              shape='square'
            />
          }
        />
      )}
    </div>
  );
}

export default Left;
