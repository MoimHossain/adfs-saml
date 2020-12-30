// UI elements to work with
const signInButton = document.getElementById('signIn');
const signOutButton = document.getElementById('signOut');
const callWebApiButton = document.getElementById('callApiButton');
const editProfileButton = document.getElementById('editProfileButton');
const label = document.getElementById('label');
const response = document.getElementById("response");

// updates the UI post login/token acquisition
function updateUI() {
    const account = myMSALObj.getAccount();
    if(account) {
        const userName = account.name;
    
        console.log(account)
        logMessage("Azure AD B2C Claims:");
        logMessage("email: " + account.idToken.email);
        logMessage("family_name: " + account.idToken.family_name);
        logMessage("given_name: " + account.idToken.given_name);
        logMessage("idp: " + account.idToken.idp);
    
    
        signInButton.classList.add('d-none');
        signOutButton.classList.remove('d-none');
    
        // greet the user - specifying login
        label.innerText = "Hello " + userName;
    
        // add the callWebApi button
        callWebApiButton.classList.remove('d-none');
        // add the callWebApi button
        editProfileButton.classList.remove('d-none');
    }
}

// debug helper
function logMessage(s) {
    response.appendChild(document.createTextNode('\n' + s + '\n'));
}


updateUI();