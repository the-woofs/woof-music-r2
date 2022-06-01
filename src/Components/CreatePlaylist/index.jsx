import { Modal } from "antd";
import store from "../../store";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";

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

const auth = getAuth();

function CreatePlaylist(props) {
  const { visible } = props;
  const [, setIsCreatingPlaylist] = store.useState("isCreatingPlaylist");
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (visible && !user && !loading) {
      Modal.error({
        title: "You must be logged in to create a playlist",
        content: <a href='/login'>Login or Sign Up here.</a>,
      });
      setIsCreatingPlaylist(false);
    }
  }, [setIsCreatingPlaylist, visible, user, loading]);

  return (
    <>
      {user && (
        <Modal
          onCancel={() => {
            setIsCreatingPlaylist(false);
          }}
          onOk={() => {
            setIsCreatingPlaylist(false);
          }}
          d
          visible={visible}
          centered
          title='Create Playlist'
        ></Modal>
      )}
    </>
  );
}

export default CreatePlaylist;
