import "../../App.css";
import { logToService } from "../api";
import GoogleLogin from 'react-google-login';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

var clientId = "-.apps.googleusercontent.com";
var secret = "";
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
