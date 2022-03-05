import "../../App.css";
import { MsalAuthProvider, LoginType } from 'react-aad-msal';
import { AzureAD } from 'react-aad-msal';
import axios from "axios";
import { useNavigate } from "react-router";

var clientId = "dee479f7-7be3-49a8-a238-71bf50de2175 ";
var secretId = "2e88322a-c579-45ce-95b9-5788c7f7072c";
var clientSecret = "Re47Q~hMlvpAZ7BN8SnBIChQK4SMEIFvgv1XF ";

export function OutlookSignin() {
  let navigate = useNavigate();
  let usernameLogged = window.sessionStorage.getItem("username");
  let accessToken = window.sessionStorage.getItem("token");

  const config = {
    auth: {
      authority: 'https://login.microsoftonline.com/901cb4ca-b862-4029-9306-e5cd0f6d9f86',
      clientId: clientId,
      redirectUri: 'http://localhost:3000/profile',
      navigateToLoginRequestUrl: true
    },
    cache: {
      cacheLocation: "localStorage" as "localStorage",
      storeAuthStateInCookie: true
    }
  };

  // Authentication Parameters
  const authenticationParameters = {
    scopes: [
      'user.read',
      'email',
      'openid',
      'profile',
      'IMAP.AccessAsUser.All',
      'Mail.Read',
      'Mail.ReadBasic',
      'Mail.ReadWrite',
      'Mail.Send',
      'Files.ReadWrite.All'
    ]
  }

  // Options
  const options = {
    loginType: LoginType.Popup,
  }

  const authProvider = new MsalAuthProvider(config, authenticationParameters, options)
  return (
    <>
    <AzureAD provider={authProvider} forceLogin={true}>
      {
        ({login, logout, authenticationState, error, accountInfo} : any) => {
          let token = accountInfo.jwtIdToken;
          const params = {
            token: accountInfo.jwtIdToken,
          };
          if (token !== '') {
            axios
            .post("http://localhost:8000/users/" + usernameLogged + "/services/7", params, {
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
            return;
          }
          return <></>
        }
      }
    </AzureAD>
    </>
  );
}