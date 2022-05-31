import { Avatar, Button } from "antd";
import Meta from "antd/lib/card/Meta";
import "./index.css";

import store from "../../store";
import { useNavigate } from "react-router-dom";

function Left() {
  const [track] = store.useState("playingTrack");

  const navigate = useNavigate();

  return (
    <div className='left-component'>
      {track && (
        <Meta
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
          title={track.name}
          description={
            <>
              {track.artists &&
                track.artists.map((artist, index) => (
                  <>
                    {index !== 0 && ", "}
                    <Button
                      type='link'
                      onClick={() => {
                        navigate("artist/" + artist.artistId);
                      }}
                      style={{
                        padding: 0,
                        margin: 0,
                      }}
                    >
                      {artist.name}
                    </Button>
                  </>
                ))}
            </>
          }
        />
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
