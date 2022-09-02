import { CheckCircleFilled, CloseCircleOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, doc, getFirestore, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import store from "../store";
import SyncFromExt from "./SyncFromExt";

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

function Gaurd() {
  const [user] = useAuthState(auth);
  return <>{user && <Sync />}</>;
}

function Sync(props) {
  const { hidden } = props;
  const [user] = useAuthState(auth);
  const [syncing, setSyncing] = useState(false);
  const [syncError, setSyncError] = useState(null);
  const [synced, setSynced] = useState(false);

  const [playingTrack] = store.useState("playingTrack");
  const [isPlaying] = store.useState("isPlaying");
  const [isListeningAlong] = store.useState("isListeningAlong");
  const [currentHost] = store.useState("currentHost");
  const [progress] = store.useState("progress");

  const requestDocRef = doc(
    collection(db, "u", auth.currentUser.uid, "requests"),
    "progressData"
  );
  const [requestDoc] = useDocumentData(requestDocRef);

  const sendProgressData = async () => {
    const docRef = doc(
      collection(db, "u", auth.currentUser.uid, "responses"),
      "progressData"
    );
    console.log(progress);
    await updateDoc(docRef, {
      progress: progress,
    });
  };

  useEffect(() => {
    if (user && requestDoc && requestDoc.needed) {
      sendProgressData();
    }
    // eslint-disable-next-line
  }, [user, requestDoc]);

  useEffect(() => {
    if (user && auth.currentUser && playingTrack) {
      setSynced(false);
      setSyncing(true);
      setSyncError(false);
      const userRef = doc(collection(db, "u"), auth.currentUser.uid);
      const docRef = doc(
        collection(db, "u", auth.currentUser.uid, "responses"),
        "isPlaying"
      );
      updateDoc(userRef, {
        syncData: {
          playingTrack: playingTrack,
          isPlaying: isPlaying,
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
      updateDoc(docRef, {
        isPlaying: isPlaying,
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
      {isListeningAlong && <SyncFromExt currentHostId={currentHost} />}
      {!hidden && (
        <>
          {synced && <CheckCircleFilled />} {syncing && <Spin size="small" />}
          {syncError && <CloseCircleOutlined />}
        </>
      )}
    </>
  );
}

export default Gaurd;
