import "../../App.css";
import { signup, signin } from "../api";
import GoogleLogin from 'react-google-login';

var clientId = "364030105707-i3koe2sbo4ecf7km0ijenpstlav1khi5.apps.googleusercontent.com";
var secret = "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";
var redirectUri = "http://localhost:3000";

export function GoogleSignin() {
  const onSuccess = async (res : any) => {
    console.log("Success " + res.accessToken);
    await signin(res.profileObj.email, res.accessToken);
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

export function GoogleSignup() {
  const onSuccess = async (res : any) => {
    console.log("Success " + res.accessToken);
    await signup(res.profileObj.email, res.accessToken, "");
  }

  const onFailure = (res : any) => {
    console.log("Failure " + res);
  }

  return (
    <>
    <GoogleLogin
      clientId={clientId}
      buttonText="Signup"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
    />
    </>
  );
}
