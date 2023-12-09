export function isTokenExpired(token: string | null) {
  if (!token) {
    return true;
  }
  const tokenParts = token.split('.');
  const payload = JSON.parse(atob(tokenParts[1]));
  const expirationTime = payload.exp * 1000;
  return Date.now() > expirationTime;
}
