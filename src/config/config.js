const config = {
  basePath: 'https://api.ghost-network.boberneprotiv.com',
  linkInspector: {
    basePath: 'https://link-inspector.boberneprotiv.com'
  },
  auth: {
    authority: 'https://accounts.ghost-network.boberneprotiv.com',
    client_id: 'angular_spa_prod',
    redirect_uri: 'https://ghost-network.boberneprotiv.com/auth-callback',
    post_logout_redirect_uri: 'https://ghost-network.boberneprotiv.com/',
    response_type: 'id_token token',
    scope: 'openid profile api',
    filterProtocolClaims: true,
    loadUserInfo: true
  },
  time_limit_to_update: {
    publications: 900,
    comments: 900
  }
};
