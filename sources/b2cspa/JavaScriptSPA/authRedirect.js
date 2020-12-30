// Create the main myMSALObj instance
// configuration parameters are located at authConfig.js
const myMSALObj = new Msal.UserAgentApplication(msalConfig);

let accessToken;

// Register Callbacks for Redirect flow
myMSALObj.handleRedirectCallback(authRedirectCallBack);

function authRedirectCallBack(error, response) {
  if (error) {
    console.log(error);
    if (error.errorMessage.indexOf("AADB2C90118") > -1) {
      try {
        myMSALObj.loginRedirect(b2cPolicies.authorities.forgotPassword);
      } catch(err) {
        console.log(err);
      }
    }
  } else {
    const lcAcr = response.idToken.claims['acr'].toLowerCase();
    if (response.tokenType === "id_token" && lcAcr === b2cPolicies.names.forgotPassword.toLowerCase()) {
      myMSALObj.logout();
      window.alert("Password has been reset successfully. \nPlease sign-in with your new password.");

    } else if (response.tokenType === "id_token" && lcAcr === b2cPolicies.names.editProfile.toLowerCase()) {
      window.alert("Profile has been updated successfully.");

      if (myMSALObj.getAccount()) {
        updateUI();
      }

    } else if (response.tokenType === "id_token" && lcAcr === b2cPolicies.names.signUpSignIn.toLowerCase()) {
      console.log("id_token acquired at: " + new Date().toString());

      if (myMSALObj.getAccount()) {
        updateUI();
      }

    } else if (response.tokenType === "access_token") {
        console.log("access_token acquired at: " + new Date().toString());
        accessToken = response.accessToken;
        logMessage("Request made to Web API:");
        if (accessToken) {
          try {
            callApiWithAccessToken(apiConfig.webApi, accessToken);
          } catch (err) {
            console.log(err);
          }
        }
    } else {
        console.log("Token type is: " + response.tokenType, response);
    }
  }
}

function signIn() {
  myMSALObj.loginRedirect(loginRequest);
}  

// sign-out the user
function logout() {
  // Removes all sessions, need to call AAD endpoint to do full logout
  myMSALObj.logout();
}

// main method to get token with redirect flow
function getTokenRedirect(request) {
return myMSALObj.acquireTokenSilent(request)
  .then((response) => {
    if (response.accessToken) {
      accessToken = response.accessToken;
      logMessage("Request made to Web API:");

      if (accessToken) {
        try {
          callApiWithAccessToken(apiConfig.webApi, accessToken);
        } catch (err) {
          console.log(err);
        }
      }
    }
  }).catch(error => {
    console.log("Silent token acquisition fails. Acquiring token using redirect");
    console.log(error);
    // fallback to interaction when silent call fails
    return myMSALObj.acquireTokenRedirect(request);
  });
}


// calls the resource API with the token
function passTokenToApi() {
  if (!accessToken) {
    getTokenRedirect(tokenRequest);
  } else {
      logMessage("Request made to Web API:");
      try {
        callApiWithAccessToken(apiConfig.webApi, accessToken);
      } catch (err) {
        console.log(err);
      }
  }
}

function editProfile() {
  myMSALObj.loginRedirect(b2cPolicies.authorities.editProfile);
}
