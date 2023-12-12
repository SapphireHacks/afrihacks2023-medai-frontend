export const configOptions = () => {
  if (typeof window === 'undefined') return true;

  let accessToken = window.sessionStorage.getItem('token');
  if (!accessToken) {
    accessToken = window.localStorage.getItem('token');
  }
  if (accessToken && accessToken !== "undefined") {
    return JSON.parse(accessToken);
  }
  return false;
};
