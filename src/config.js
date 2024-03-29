export default {
  oidc: {
    clientId: '0oa1c61c7tWrnzg0H357',
    issuer: 'https://dev-359998.okta.com/oauth2/default',
    redirectUri: 'https://ks.nopain.codes/implicit/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    testing: {
      disableHttpsCheck: false
    }
  },
  resourceServer: 'https://safe-mesa-21671.herokuapp.com',
  logger: {
    isEnabled: true,
    logLevel: 'debug',
    stringifyArguments: false,
    showLogLevel: true,
    showMethodName: true,
    separator: '|',
    showConsoleColors: true
  }
}
