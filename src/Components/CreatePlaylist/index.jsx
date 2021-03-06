import { Button, Form, Input, Modal } from "antd";
import store from "../../store";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";

import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyCSGprUw_eQ-0sEVCLctStEmfunuP5upZU",
  authDomain: "woof-music.firebaseapp.com",
  projectId: "woof-music",
  storageBucket: "woof-music.appspot.com",
  messagingSenderId: "909712073161",
  appId: "1:909712073161:web:3a78a1f17cea24c52a8818",
};

initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

// playlist should be created at /u/user/playlists/playlistId

function CreatePlaylist(props) {
  const { visible } = props;
  const [, setIsCreatingPlaylist] = store.useState("isCreatingPlaylist");
  const [user, loading] = useAuthState(auth);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const [playlistCover, setPlaylistCover] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (visible && !user && !loading) {
      Modal.error({
        title: "You must be logged in to create a playlist",
        content: (
          <Button
            type="link"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login or Sign Up here.
          </Button>
        ),
      });
      setIsCreatingPlaylist(false);
    }
  }, [setIsCreatingPlaylist, visible, user, loading, navigate]);

  return (
    <>
      {user && (
        <Modal
          onCancel={() => {
            setPlaylistDescription("");
            setPlaylistName("");
            setIsCreatingPlaylist(false);
          }}
          onOk={async () => {
            const docRef = await addDoc(
              collection(db, "u", auth.currentUser.uid, "playlists"),
              {}
            );
            await updateDoc(
              doc(
                collection(db, "u", auth.currentUser.uid, "playlists"),
                docRef.id
              ),
              {
                name: playlistName,
                description: playlistDescription,
                cover: playlistCover,
                id: docRef.id,
                owner: auth.currentUser.uid,
              }
            );
            console.log(docRef.id);
            setPlaylistDescription("");
            setPlaylistName("");
            setIsCreatingPlaylist(false);
          }}
          okText="Create"
          visible={visible}
          centered
          title="Create Playlist"
        >
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Form.Item required label="Name">
              <Input
                onChange={(e) => {
                  setPlaylistName(e.target.value);
                }}
                value={playlistName}
                placeholder="Set the playlist's name"
              />
            </Form.Item>
            <Form.Item required label="Description">
              <Input
                onChange={(e) => {
                  setPlaylistDescription(e.target.value);
                }}
                value={playlistDescription}
                placeholder="Set the playlist's description"
              />
            </Form.Item>
            <Form.Item label="Cover">
              <Input
                onChange={(e) => {
                  setPlaylistCover(e.target.value);
                }}
                value={playlistCover}
                placeholder="Set the playlist's cover art url"
              />
              <a
                target="_blank"
                rel="noreferrer"
                href="https://acutewoof.is-a.dev/random-unsplash"
              >
                Get random image from Unsplash
              </a>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
}

export default CreatePlaylist;
