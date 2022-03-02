import "../../App.css";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { logToService } from "../api";

var success : boolean = false;

export function RedditSignin() {
    let navigate = useNavigate();
    var code : any = "";
  
    useEffect(() => {
      async function getCode() {
        if (window.location.href.includes("code=") === true) {
          const url = new URL(window.location.href);
          code = url.searchParams.get("code");
          console.log(code);
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
  
    if (response === true) {
      success = true;
      return;
    }
    return;
  }