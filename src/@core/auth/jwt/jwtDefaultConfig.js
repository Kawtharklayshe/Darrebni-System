export default {
  // Endpoints
  loginEndpoint: 'login',
  registerEndpoint: '/jwt/register',
  refreshEndpoint: '/jwt/refresh-token',
  logoutEndpoint: '/jwt/logout',
  resetEmailEndpoint:'send-password-reset-token',
  checkCodeEndpoint:'check-reset-token',
  resetPasswordEndpoint:'reset-password',
  // This will be prefixed in authorization header with token
  // e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken',
}
