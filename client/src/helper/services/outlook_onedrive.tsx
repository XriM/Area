import "../../App.css";
import { MsalAuthProvider, LoginType } from 'react-aad-msal';
import { AzureAD } from 'react-aad-msal';
import { useNavigate } from "react-router";

import { logToService } from "../api";

var clientId = "dee479f7-7be3-49a8-a238-71bf50de2175 ";
var secretId = "2e88322a-c579-45ce-95b9-5788c7f7072c";
var clientSecret = "Re47Q~hMlvpAZ7BN8SnBIChQK4SMEIFvgv1XF ";

export function OutlookSignin(props : { where : string }) {
  let navigate = useNavigate();

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
    
  const options = {
    loginType: LoginType.Popup,
  }
  
  const authProvider = new MsalAuthProvider(config, authenticationParameters, options)

  return (
    <>
    <AzureAD provider={authProvider} forceLogin={true}>
      {
        async ({login, logout, authenticationState, error, accountInfo} : any) => {
          const token = accountInfo.jwtIdToken;
          const response = await logToService(token, '7');
          if (response === "Service token successfully loaded") {
            navigate(props.where);
            window.location.reload();
          }
          return <></>
        }
      }
    </AzureAD>
    </>
  );
}
