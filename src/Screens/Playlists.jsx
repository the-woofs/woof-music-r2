import { Avatar, Card, PageHeader, Skeleton, Typography } from "antd";
import Meta from "antd/lib/card/Meta";
import { useNavigate } from "react-router-dom";
import "../index.css";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, doc, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { Album } from "@mui/icons-material";

const firebaseConfig = {
  apiKey: "AIzaSyCSGprUw_eQ-0sEVCLctStEmfunuP5upZU",
  authDomain: "woof-music.firebaseapp.com",
  projectId: "woof-music",
  storageBucket: "woof-music.appspot.com",
  messagingSenderId: "909712073161",
  appId: "1:909712073161:web:3a78a1f17cea24c52a8818",
};

initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

function PlaylistsVer() {
  const [data, loading] = useCollectionData(
    collection(doc(collection(db, "u"), auth.currentUser.uid), "playlists")
  );
  const navigate = useNavigate();
  return (
    <>
      {loading && (
        <>
          <Typography.Title level={3}>Your Playlists</Typography.Title>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, 226px)",
              gridGap: "1rem",
              placeItems: "center",
            }}
          >
            <Skeleton.Input
              active
              style={{
                height: "96px",
                width: "226px",
              }}
            />
            <Skeleton.Input
              active
              style={{
                height: "96px",
                width: "226px",
              }}
            />
            <Skeleton.Button
              active
              style={{
                height: "96px",
                width: "226px",
              }}
            />
          </div>
        </>
      )}
      {data && (
        <>
          <Typography.Title level={3}>Your Playlists</Typography.Title>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, 226px)",
              gridGap: "1rem",
              placeItems: "center",
            }}
          >
            {data.map((playlist) => (
              <Card
                style={{ width: 226 }}
                className='hoverable-card'
                onClick={() => {
                  navigate("/playlist/" + playlist.id);
                }}
                cover={
                  playlist &&
                  playlist.thumbnail && (
                    <img alt='cover' src={playlist.thumbnail} />
                  )
                }
              >
                <Meta
                  title={playlist.name}
                  avatar={
                    playlist.cover ? (
                      <Avatar
                        src={playlist.cover}
                        size='large'
                        shape='square'
                      />
                    ) : (
                      <Album fontSize='large' />
                    )
                  }
                  description={
                    playlist &&
                    playlist.description && <>{playlist.description} </>
                  }
                />
              </Card>
            ))}
          </div>
        </>
      )}
    </>
  );
}

function Playlists() {
  if (!auth.currentUser) {
    return (
      <div>
        <h1>You must be logged in to see your playlists.</h1>
        <a href='/login'>Login or Sign Up here.</a>
      </div>
    );
  }
  return <PlaylistsVer />;
}

function Main() {
  return (
    <>
      <PageHeader
        title='Woof Music Alpha'
        avatar={{ src: "https://github.com/the-woofs.png" }}
      />
      <div
        style={{
          marginTop: "1rem",
          overflowY: "auto",
          overflowX: "hidden",
          padding: "0 2rem",
        }}
        className='album-history'
      >
        <Playlists />
      </div>
    </>
  );
}

export { Main, Playlists };
