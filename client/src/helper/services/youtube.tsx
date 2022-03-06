import "../../App.css";
import { logToService } from "../api";
import GoogleLogin from 'react-google-login';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

var clientId = "364030105707-i3koe2sbo4ecf7km0ijenpstlav1khi5.apps.googleusercontent.com";
var secret = "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";
var redirectUri = "http://localhost:8081/profile";

export function YoutubeSignin(props : { where : string }) {
  const onSuccess = async (res : any) => {
    console.log("Success " + res.accessToken);
    await logToService(res.accessToken, '9');
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
      redirectUri={props.where}
      cookiePolicy={'single_host_origin'}
      scope={'https://www.googleapis.com/auth/youtube.force-ssl'}
      render={renderProps => (
        <Button className="principal__btn__color" onClick={renderProps.onClick} ><FontAwesomeIcon icon={faLink} style={{color: 'white'}}/></Button>
      )}
    />
    </>
  );
}
