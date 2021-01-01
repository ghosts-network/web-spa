export const environment = {
  production: true,
  basePath: 'https://api.gn.boberneprotiv.com',
  auth: {
    authority: 'https://account.gn.boberneprotiv.com',
    client_id: 'angular_spa_prod',
    redirect_uri: 'https://gn.boberneprotiv.com/auth-callback',
    post_logout_redirect_uri: 'https://gn.boberneprotiv.com/',
    response_type: "id_token token",
    scope: "openid profile api",
    filterProtocolClaims: true,
    loadUserInfo: true
  }
};
