import { initializeApp } from "firebase/app";
import { collection, doc, getFirestore } from "firebase/firestore";
import { useEffect } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
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

function SyncFromExt(props) {
  const { currentHostId } = props;
  const [, setPlayingTrack] = store.useState("playingTrack");
  const [, setIsPlaying] = store.useState("isPlaying");

  const docRef = doc(collection(db, "u"), currentHostId);
  const [docData] = useDocumentData(docRef);

  useEffect(() => {
    if (docData && docData.syncData) {
      setPlayingTrack(docData.syncData.playingTrack);
      setIsPlaying(docData.syncData.isPlaying);
    }
  }, [docData, setIsPlaying, setPlayingTrack]);

  return <></>;
}

export default SyncFromExt;
