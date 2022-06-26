import { Card, Divider, PageHeader, Typography } from "antd";
import Meta from "antd/lib/card/Meta";
import { useNavigate } from "react-router-dom";
import { Playlists } from "./Playlists";
import store from "../store";
import "../index.css";

function Main() {
  const [data] = store.useState("albumHistory");
  const navigate = useNavigate();
  return (
    <>
      <PageHeader
        title="Woof Music Alpha"
        avatar={{ src: "https://github.com/the-woofs.png" }}
      />
      <div
        style={{
          marginTop: "1rem",
          overflowY: "auto",
          overflowX: "hidden",
          padding: "0 2rem",
        }}
        className="album-history"
      >
        <Playlists />
        <Divider />

        {data && (
          <>
            <Typography.Title level={3}>Albums You've Visited</Typography.Title>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, 226px)",
                gridGap: "1rem",
                placeItems: "center",
              }}
            >
              {data.map((album) => (
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
                      album && album.artists && album.artists.length > 0
                        ? album.artists.map((artist) => artist.name).join(", ")
                        : "<Unknown Artist>"
                    }
                  />
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Main;
