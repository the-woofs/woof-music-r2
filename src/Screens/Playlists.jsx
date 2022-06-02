import { Card, PageHeader, Typography } from "antd";
import Meta from "antd/lib/card/Meta";
import { useNavigate } from "react-router-dom";
import "../index.css";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, doc, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

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

function Playlists() {
  const [data] = useCollectionData(
    collection(doc(collection(db, "u"), auth.currentUser.uid), "playlists")
  );
  const navigate = useNavigate();
  return (
    <>
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
