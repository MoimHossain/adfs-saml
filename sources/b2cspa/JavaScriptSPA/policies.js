// Enter here the user flows and custom policies for your B2C application
// To learn more about user flows, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/user-flow-overview
// To learn more about custom policies, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-overview

const b2cPolicies = {
    names: {
        signUpSignIn: "B2C_1A_signup_signinADFS",
        forgotPassword: "B2C_1A_PasswordReset",
        editProfile: "B2C_1A_ProfileEdit"
    },
    authorities: {
        signUpSignIn: {
            authority: "https://woodbineb2c.b2clogin.com/woodbineb2c.onmicrosoft.com/B2C_1A_signup_signinADFS",
        },
        forgotPassword: {
            authority: "https://woodbineb2c.b2clogin.com/woodbineb2c.onmicrosoft.com/B2C_1A_PasswordReset",
        },
        editProfile: {
            authority: "https://woodbineb2c.b2clogin.com/woodbineb2c.onmicrosoft.com/B2C_1A_ProfileEdit"
        }
    },
}