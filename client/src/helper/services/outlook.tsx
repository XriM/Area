import "../../App.css";
import { MsalAuthProvider, LoginType } from 'react-aad-msal';
import { AzureAD } from 'react-aad-msal';

var clientId = "dee479f7-7be3-49a8-a238-71bf50de2175 ";
var secretId = "2e88322a-c579-45ce-95b9-5788c7f7072c";
var clientSecret = "Re47Q~hMlvpAZ7BN8SnBIChQK4SMEIFvgv1XF ";

export function OutlookOauth() {
  const config = {
    auth: {
      authority: 'https://login.microsoftonline.com/901cb4ca-b862-4029-9306-e5cd0f6d9f86',
      clientId: clientId,
      redirectUri: 'https://localhost/callback', // faut que ca match le reply url de briann
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
          console.log(accountInfo);
          return <></>
        }
      }
    </AzureAD>
    </>
  );
}
