// Persistance du token
const token_key = 'sessionToken';

export const setSessionToken = (token) => {
  localStorage.setItem(token_key, token);
};

export const deleteSessionToken = () => {
  localStorage.removeItem(token_key);
};

export const getSessionToken = () => {
  return localStorage.getItem(token_key);
};

export const doLogin = (backUrl, path) => {
  window.location.href = backUrl + '/_auth/login?redirect=' + encodeURI(path);
};
export const doLogout = (backUrl, path) => {
  deleteSessionToken();
  window.location.href = backUrl + '/_auth/disconnect?redirect=' + encodeURI(path);
};

export function useAuth(backendUrl) {
  const logout = () => {
    doLogout(backendUrl, location.pathname);
  };

  const login = () => {
    doLogin(backendUrl, location.pathname);
  };

  return [login, logout];
}
