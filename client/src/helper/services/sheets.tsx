import "../../App.css";
import { signup, signin, logToService } from "../api";
import GoogleLogin from 'react-google-login';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

var clientId = "364030105707-i3koe2sbo4ecf7km0ijenpstlav1khi5.apps.googleusercontent.com";
var secret = "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";
var redirectUri = "http://localhost:3000";

export function SheetsSignin() {
  const onSuccess = async (res : any) => {
    console.log("Success " + res.accessToken);
    await logToService(res.accessToken, '3');
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
      render={renderProps => (
        <Button className="principal__btn__color" onClick={renderProps.onClick} ><FontAwesomeIcon icon={faLink} style={{color: 'white'}}/></Button>
      )}
    />
    </>
  );
}
