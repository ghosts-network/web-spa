export const environment = {
  production: true,
  basePath: 'http://boberneprotiv.com:5000',
  auth: {
    authority: 'http://boberneprotiv.com:6030',
    client_id: 'angular_spa_prod',
    redirect_uri: 'http://boberneprotiv.com/auth-callback',
    post_logout_redirect_uri: 'http://boberneprotiv.com/',
    response_type: "id_token token",
    scope: "openid profile",
    filterProtocolClaims: true,
    loadUserInfo: true
  }
};
