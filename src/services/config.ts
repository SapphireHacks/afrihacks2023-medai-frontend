export const configOptions = () => {
  if (typeof window === 'undefined') return true;

  let accessToken = window.sessionStorage.getItem('user');
  if (!accessToken) {
    accessToken = window.localStorage.getItem('user');
  }
  if (accessToken && accessToken !== "undefined") {
    return JSON.parse(accessToken);
  }
  return false;
};
