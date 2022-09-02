import { Typography, Spin } from "antd";
import { initializeApp } from "firebase/app";
import { collection, doc, getFirestore, updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import store from "../store";
import { useAuthState } from "react-firebase-hooks/auth";

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

function JoinRoom() {
  const { id } = useParams();
  const [, setPlayingTrack] = store.useState("playingTrack");
  const [, setIsListeningAlong] = store.useState("isListeningAlong");
  const [, setIsPlaying] = store.useState("isPlaying");
  const [, setQueue] = store.useState("queue");
  store.setState("currentHost", id);
  const [playerRef] = store.useState("playerRef");
  const [user] = useAuthState(auth);

  const progressDocRef = doc(
    collection(db, "u", id, "responses"),
    "progressData"
  );
  const [progressDocData] = useDocumentData(progressDocRef);

  const isPlayingDocRef = doc(
    collection(db, "u", id, "responses"),
    "isPlaying"
  );
  const [isPlayingDoc] = useDocumentData(isPlayingDocRef);

  const docRef = doc(collection(db, "u"), id);
  const [docData] = useDocumentData(docRef);

  const requestProgressData = async () => {
    const docRef = doc(collection(db, "u", id, "requests"), "progressData");
    await updateDoc(docRef, {
      needed: true,
    });
    if (docData) {
      console.log(docData);
      setPlayingTrack({});
      setPlayingTrack(docData.syncData.playingTrack);
      setIsListeningAlong(docData.syncData.isListeningAlong);
      console.log(docData.syncData.isPlaying);
      setIsPlaying(docData.syncData.isPlaying);
      setQueue([docData.syncData.playingTrack]);
    }
    if (
      playerRef &&
      playerRef.current &&
      progressDocData &&
      playerRef.current.getDuration() > 0
    ) {
      console.log("progress update");
      playerRef.current.seekTo(progressDocData.progress, "fraction");
      await updateDoc(docRef, {
        needed: false,
      });
    }
  };

  const updateProgress = async () => {
    const docRef = doc(collection(db, "u", id, "requests"), "progressData");
    if (
      playerRef &&
      playerRef.current &&
      progressDocData &&
      playerRef.current.getDuration() > 0
    ) {
      playerRef.current.seekTo(progressDocData.progress, "fraction");
      await updateDoc(docRef, {
        needed: false,
      });
    }
  };

  useEffect(() => {
    if (user && playerRef) {
      requestProgressData();
    }

    // eslint-disable-next-line
  }, [user, docData, playerRef]);

  useEffect(() => {
    updateProgress();

    // eslint-disable-next-line
  }, [progressDocData]);

  useEffect(() => {
    if (isPlayingDoc) {
      setIsPlaying(isPlayingDoc.isPlaying);
    }
    // eslint-disable-next-line
  }, [isPlayingDoc]);

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
      }}
    >
      <Spin size="large" />
      <Typography.Text>Joining Room {id}...</Typography.Text>
    </div>
  );
}

export default JoinRoom;
