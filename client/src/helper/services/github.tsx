import "../../App.css";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import axios from "axios";

import { logToService } from "../api";

var clientId = "d05e9c2d8d588d4cb47c";
var secret = "8313b9cbdea767e6e0a6227333cd525845c9c5e8";
var scopes = "repo,notifications,gist,user";
var redirectUri = "http://localhost:3000/profile";

var success : boolean = false;

export function GithubSignin(props : { where : string }) {
  let navigate = useNavigate();
  var code : any = "";
  let usernameLogged = window.sessionStorage.getItem("username");
  let accessToken = window.sessionStorage.getItem("token");

  useEffect(() => {
    async function getCodeGithub() {
      if (window.location.href.includes("code=") === true && window.sessionStorage.getItem("oauth") === "github") {
        const url = new URL(window.location.href);
        code = url.searchParams.get("code");
        const params = {
          token: code,
        };

        await axios
          .post("http://localhost:8000/users/" + usernameLogged + "/services/6", params, {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          })
          .then((res) => {
            console.log(res);
            navigate(props.where);
          })
          .catch((error) => {
            console.log(error);
          })
      }
    }
    getCodeGithub();
  }, [])

  return (
    <>
    <Button className="principal__btn__color"><FontAwesomeIcon icon={faLink} style={{color: 'white'}}
      onClick={ async () => {
        window.sessionStorage.setItem("oauth", "github");
        await GithubOauth();
      }}/></Button>
    
    </>
  );
}

async function GithubOauth() {
  await window.location.replace("https://github.com/login/oauth/authorize?client_id=" + clientId + "&redirect_uri=" + redirectUri + "&scope=" + scopes);
}

async function sendCode(code : string) {
  const response = await logToService(code, '6');

  if (response === "Service token successfully loaded") {
    success = true;
    return;
  }
  return;
}