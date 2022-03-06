import "../../App.css";
import { signup, signin, google_signin } from "../api";
import GoogleLogin from 'react-google-login';
import axios from "axios";
import { useNavigate } from "react-router";

var clientId = "364030105707-i3koe2sbo4ecf7km0ijenpstlav1khi5.apps.googleusercontent.com";
var secret = "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";
var redirectUri = "http://localhost:3000";

export function GoogleSignin() {
  let navigate = useNavigate();

  const onSuccess = async (res : any) => {
    console.log("Success " + res.tokenId);
    const result = await google_signin(res.tokenId);
    if (result === true) {
      navigate("/profile");
    }
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
