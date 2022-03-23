import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const token_key = 'sessionToken';
const setSessionToken = token => {
  localStorage.setItem(token_key, token);
};
const deleteSessionToken = () => {
  localStorage.removeItem(token_key);
};
const getSessionToken = () => {
  return localStorage.getItem(token_key);
};
const doLogin = (backUrl, path) => {
  window.location.href = backUrl + '/_auth/login?redirect=' + encodeURI(path);
};
const doLogout = (backUrl, path) => {
  deleteSessionToken();
  window.location.href = backUrl + '/_auth/disconnect?redirect=' + encodeURI(path);
};
function useAuth(backendUrl) {
  const logout = () => {
    doLogout(backendUrl, location.pathname);
  };

  const login = () => {
    doLogin(backendUrl, location.pathname);
  };

  return [login, logout];
}

const getTokenFromUri = () => {
  return getQueryVar('token');
};
const getQueryVar = varName => {
  var queryStr = unescape(window.location.search) + '&';
  var regex = new RegExp('.*?[&\\?]' + varName + '=(.*?)&.*');
  var val = queryStr.replace(regex, '$1');
  return val == queryStr ? false : val;
};
const getUserInfos = async (token, backendUrl) => {
  var myHeaders = new Headers({
    Authorization: 'Bearer ' + token
  });
  var myInit = {
    method: 'GET',
    headers: myHeaders
  };
  const res = await fetch(`${backendUrl}/_auth/userinfos`, myInit);

  if (res.status !== 200) {
    return false;
  } else {
    const jsonPayload = await res.json();
    return jsonPayload.data;
  }
};
const getAccreditations = async (token, backendUrl) => {
  var myHeaders = new Headers({
    Authorization: 'Bearer ' + token
  });
  var myInit = {
    method: 'GET',
    headers: myHeaders
  };
  const res = await fetch(`${backendUrl}/_auth/useraccreditations`, myInit);

  if (res.status !== 200) {
    return false;
  } else {
    const jsonPayload = await res.json();
    return jsonPayload;
  }
};

const HlpAuth = ({
  UrlBackend,
  OnConnected,
  onFinished,
  autoLogin,
  children
}) => {
  const [login] = useAuth(UrlBackend);
  const location = useLocation();
  const navigate = useNavigate();
  const [done, setDone] = useState(false);

  const tryToConnectUserWithToken = async () => {
    let token = getTokenFromUri();

    if (!token) {
      token = getSessionToken();
    } else {
      navigate(location.pathname, {
        replace: true
      });
    }

    if (token) {
      const _userInfos = await getUserInfos(token, UrlBackend);

      try {
        if (_userInfos) {
          const accreditations = await getAccreditations(token, UrlBackend);
          setSessionToken(token);
          OnConnected({
            id: _userInfos.id,
            type: "E",
            email: _userInfos.email,
            nom: _userInfos.nom,
            prenom: _userInfos.prenom,
            token,
            accreditations: accreditations && accreditations.data && accreditations.data.data ? accreditations.data.data : []
          });
          navigate(location.pathname, {
            replace: true
          });
          return true;
        } else {
          return false;
        }
      } finally {
        onFinished();
        setDone(true);
      }
    }

    if (autoLogin) {
      login();
    } else {
      onFinished();
      setDone(true);
    }
  };

  useEffect(() => {
    tryToConnectUserWithToken();
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, done ? children : /*#__PURE__*/React.createElement("div", null));
};

const useAuth$1 = useAuth;
const HlpAuth$1 = HlpAuth;

export { HlpAuth$1 as HlpAuth, useAuth$1 as useAuth };
//# sourceMappingURL=index.modern.js.map
