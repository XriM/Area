import "../../App.css";
import { signup, signin } from "../api";
import GoogleLogin from 'react-google-login';
import axios from "axios";

var clientId = "364030105707-i3koe2sbo4ecf7km0ijenpstlav1khi5.apps.googleusercontent.com";
var secret = "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";
var redirectUri = "http://localhost:3000";

export function GoogleSignin() {
  const onSuccess = async (res : any) => {
    console.log("Success " + res.id_token);
    // await signin(res.profileObj.email, res.accessToken);
    const param = {
      id_token: res.id_token
    }
    await axios
    .post("http://localhost:8000/users/google_login", param)
    .then((res) => {
      console.log(res);
      alert(
        res.data.message
      );
    })
    .catch((error) => {
      console.log(error);
    })
  }

  const onFailure = (res : any) => {
    console.log("Failure " + res);
  }

  return (
    <>
    <GoogleLogin
      clientId={clientId}
      buttonText="Signin"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
    />
    </>
  );
}
