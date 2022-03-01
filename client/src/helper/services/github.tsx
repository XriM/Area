import "../../App.css";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { logToService } from "../api";
import { useNavigate } from "react-router";
import { useEffect } from "react";

var clientId = "d05e9c2d8d588d4cb47c";
var secret = "8313b9cbdea767e6e0a6227333cd525845c9c5e8";
var scopes = "repo,notifications,gist,user";
var redirectUri = "http://localhost:3000/profile";

var success : boolean = false;

export function GithubSignin() {
  let navigate = useNavigate();
  var code : any = "";

  useEffect(() => {
    async function getCode() {
      if (window.location.href.includes("code=") === true) {
        const url = new URL(window.location.href);
        code = url.searchParams.get("code");

        await sendCode(code);
        if (success === true) {
          navigate("/profile");
        }
      }
    }
    getCode();
  })

  return (
    <>
    <Button className="principal__btn__color"><FontAwesomeIcon icon={faLink} style={{color: 'white'}}
      onClick={ async () => {
        await GithubOauth();
      }}/></Button>
    
    </>
  );
}

async function GithubOauth() {
  await window.location.replace("https://github.com/login/oauth/authorize?client_id=" + clientId + "&redirect_uri=" + redirectUri + "&scope=" + scopes);
}

async function sendCode(code : string) {
  const response = await logToService(code, '2');

  if (response === true) {
    success = true;
    return;
  }
  return;
}