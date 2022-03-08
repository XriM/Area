import "../../App.css";
import { MsalAuthProvider, LoginType } from 'react-aad-msal';
import { AzureAD } from 'react-aad-msal';
import axios from "axios";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

var clientId = "";
var clientSecret = "";
var tenantId = "";

export function OutlookSignin() {
  let navigate = useNavigate();
  let usernameLogged = window.sessionStorage.getItem("username");
  let accessToken = window.sessionStorage.getItem("token");

  useEffect(() => {
    async function getCodeGithub() {
      if (window.location.href.includes("code=") === true && window.sessionStorage.getItem("oauth") === "outlook") {
        const url = new URL(window.location.href);
        let code = url.searchParams.get("code");
        const params = {
          token: code,
        };

        await axios
          .post("http://localhost:8080/users/" + usernameLogged + "/services/7", params, {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          })
          .then((res) => {
            console.log(res);
            navigate("/profile");
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
        window.sessionStorage.setItem("oauth", "outlook");
        await GithubOauth();
      }}/></Button>
    </>
  );
}

async function GithubOauth() {
  await window.location.replace("https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id="+clientId+"&response_type=code&redirect_uri=http://localhost:8081/profile&response_mode=query&scope=email openid profile https://graph.microsoft.com/IMAP.AccessAsUser.All https://graph.microsoft.com/Mail.Read https://graph.microsoft.com/Mail.ReadBasic https://graph.microsoft.com/Mail.ReadWrite https://graph.microsoft.com/Mail.Send https://graph.microsoft.com/Files.ReadWrite.All&state=12345");
}
