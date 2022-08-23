import { CheckCircleFilled, CloseCircleOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, doc, getFirestore, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import store from "../store";

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

function Sync(props) {
  const { hidden } = props;
  const [user] = useAuthState(auth);
  const [syncing, setSyncing] = useState(false);
  const [syncError, setSyncError] = useState(null);
  const [synced, setSynced] = useState(false);

  const [playingTrack] = store.useState("playingTrack");

  useEffect(() => {
    if (user && auth.currentUser) {
      setSynced(false);
      setSyncing(true);
      setSyncError(false);
      const userRef = doc(collection(db, "u"), auth.currentUser.uid);
      updateDoc(userRef, {
        syncData: {
          playingTrack: playingTrack,
        },
      })
        .then(() => {
          console.log("User data updated successfully!");
          setSynced(true);
          setSyncing(false);
          setSyncError(false);
        })
        .catch((error) => {
          console.log("Error updating user data!");
          setSynced(false);
          setSyncing(false);
          setSyncError(true);
        });
    } else {
      setSynced(false);
      setSyncing(false);
      setSyncError(true);
    }
    // eslint-disable-next-line
  }, [playingTrack]);

  return (
    <>
      {!hidden && (
        <>
          {synced && <CheckCircleFilled />} {syncing && <Spin size="small" />}
          {syncError && <CloseCircleOutlined />}
        </>
      )}
    </>
  );
}

export default Sync;
