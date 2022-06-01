import { Form, Input, Button, notification } from "antd";

import { initializeApp } from "firebase/app";
import { setDoc, doc, getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

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

function SignUpForm() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const openNotificationError = (message) => {
    notification["error"]({
      message: "Error",
      description: message,
    });
  };

  const checkPasswords = (pass1, pass2) => {
    if (pass1 !== pass2) {
      return false;
    }
    return true;
  };

  const onFinish = (values) => {
    if (checkPasswords(values.password, values.confirm)) {
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          const user = userCredential.user;
          setDoc(
            doc(db, "u", user.uid),
            {
              name: values.username,
            },
            { merge: true }
          );
          navigate("/");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(`Error: ${errorCode} - ${errorMessage}`);
          openNotificationError(errorMessage);
          // ..
        });
    } else {
      form.setFieldsValue({
        password: "",
        confirm: "",
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      form={form}
      name='basic'
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
    >
      <Form.Item
        label='Username'
        name='username'
        rules={[
          {
            required: true,
            message: "Please provide a username.",
            whitespace: true,
          },
        ]}
      >
        <Input placeholder='Username' maxLength={16} />
      </Form.Item>
      <Form.Item
        label='Emails'
        name='email'
        rules={[
          { required: true, message: "Please provide your email address." },
        ]}
      >
        <Input placeholder='Email' />
      </Form.Item>

      <Form.Item
        label='Password'
        name='password'
        rules={[{ required: true, message: "Please provide a password." }]}
      >
        <Input.Password placeholder='Password' />
      </Form.Item>

      <Form.Item
        label='Confirm'
        name='confirm'
        rules={[{ required: true, message: "Please repeat your password." }]}
      >
        <Input.Password placeholder='Confirm Password' />
      </Form.Item>

      <br />
      <Form.Item wrapperCol={{ offset: 0, span: 32 }}>
        <Button type='primary' htmlType='submit'>
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  );
}

export default SignUpForm;
