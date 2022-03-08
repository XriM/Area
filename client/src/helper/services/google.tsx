import "../../App.css";
import { signup, signin, google_signin } from "../api";
import GoogleLogin from 'react-google-login';
import axios from "axios";
import { useNavigate } from "react-router";

var clientId = "-.apps.googleusercontent.com";
var secret = "";
var redirectUri = "http://localhost:8081";

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
