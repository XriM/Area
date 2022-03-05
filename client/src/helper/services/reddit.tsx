import "../../App.css";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import { logToService } from "../api";

var success : boolean = false;

export function RedditSignin(props : { where : string }) {
    let navigate = useNavigate();
    var code : any = "";
    let usernameLogged = window.sessionStorage.getItem("username");
    let accessToken = window.sessionStorage.getItem("token");

    useEffect(() => {
      async function getCode() {
        if (window.location.href.includes("code=") === true && window.sessionStorage.getItem("oauth") === "reddit") {
          const url = new URL(window.location.href);
          code = url.searchParams.get("code");
          const params = {
            token: code,
          };

          await axios
          .post("http://localhost:8000/users/" + usernameLogged + "/services/2", params, {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          })
          .then((res) => {
            console.log(res);
            navigate("/profile")
          })
          .catch((error) => {
            console.log(error);
          })
        }
       }
       getCode();
     }, [])

    return (
      <>
      <Button className="principal__btn__color"><FontAwesomeIcon icon={faLink} style={{color: 'white'}}
        onClick={ async () => {
          window.sessionStorage.setItem("oauth", "reddit");
          await RedditOauth();
        }}/></Button>
      </>
    );
  }

  async function RedditOauth() {
    await window.location.replace("https://www.reddit.com/api/v1/authorize?client_id=wYjSwi69CLvtQFZU67KTVQ&response_type=code&state=issou&redirect_uri=http://localhost:3000/profile&duration=temporary&scope=identity,edit,flair,history,modconfig,modflair,modlog,modposts,modwiki,mysubreddits,privatemessages,read,report,save,submit,subscribe,vote,wikiedit,wikiread");
  }

  async function sendCode(code : string) {
    const response = await logToService(code, '2');

    if (response === "Service token successfully loaded") {
      success = true;
      return;
    }
    return;
  }