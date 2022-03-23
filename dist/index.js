function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var reactRouterDom = require('react-router-dom');

var token_key = 'sessionToken';
var setSessionToken = function setSessionToken(token) {
  localStorage.setItem(token_key, token);
};
var deleteSessionToken = function deleteSessionToken() {
  localStorage.removeItem(token_key);
};
var getSessionToken = function getSessionToken() {
  return localStorage.getItem(token_key);
};
var doLogin = function doLogin(backUrl, path) {
  window.location.href = backUrl + '/_auth/login?redirect=' + encodeURI(path);
};
var doLogout = function doLogout(backUrl, path) {
  deleteSessionToken();
  window.location.href = backUrl + '/_auth/disconnect?redirect=' + encodeURI(path);
};
function useAuth(backendUrl) {
  var logout = function logout() {
    doLogout(backendUrl, location.pathname);
  };

  var login = function login() {
    doLogin(backendUrl, location.pathname);
  };

  return [login, logout];
}

// A type of promise-like that resolves synchronously and supports only one observer

const _iteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))) : "@@iterator";

const _asyncIteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"))) : "@@asyncIterator";

// Asynchronously await a promise and pass the result to a finally continuation
function _finallyRethrows(body, finalizer) {
	try {
		var result = body();
	} catch (e) {
		return finalizer(true, e);
	}
	if (result && result.then) {
		return result.then(finalizer.bind(null, false), finalizer.bind(null, true));
	}
	return finalizer(false, result);
}

var getTokenFromUri = function getTokenFromUri() {
  return getQueryVar('token');
};
var getQueryVar = function getQueryVar(varName) {
  var queryStr = unescape(window.location.search) + '&';
  var regex = new RegExp('.*?[&\\?]' + varName + '=(.*?)&.*');
  var val = queryStr.replace(regex, '$1');
  return val == queryStr ? false : val;
};
var getUserInfos = function getUserInfos(token, backendUrl) {
  try {
    var myHeaders = new Headers({
      Authorization: 'Bearer ' + token
    });
    var myInit = {
      method: 'GET',
      headers: myHeaders
    };
    return Promise.resolve(fetch(backendUrl + "/_auth/userinfos", myInit)).then(function (res) {
      if (res.status !== 200) {
        return false;
      } else {
        return Promise.resolve(res.json()).then(function (jsonPayload) {
          return jsonPayload.data;
        });
      }
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
var getAccreditations = function getAccreditations(token, backendUrl) {
  try {
    var myHeaders = new Headers({
      Authorization: 'Bearer ' + token
    });
    var myInit = {
      method: 'GET',
      headers: myHeaders
    };
    return Promise.resolve(fetch(backendUrl + "/_auth/useraccreditations", myInit)).then(function (res) {
      if (res.status !== 200) {
        return false;
      } else {
        return Promise.resolve(res.json());
      }
    });
  } catch (e) {
    return Promise.reject(e);
  }
};

var HlpAuth = function HlpAuth(_ref) {
  var UrlBackend = _ref.UrlBackend,
      OnConnected = _ref.OnConnected,
      onFinished = _ref.onFinished,
      autoLogin = _ref.autoLogin,
      children = _ref.children;

  var _useAuth = useAuth(UrlBackend),
      login = _useAuth[0];

  var location = reactRouterDom.useLocation();
  var navigate = reactRouterDom.useNavigate();

  var _useState = React.useState(false),
      done = _useState[0],
      setDone = _useState[1];

  var tryToConnectUserWithToken = function tryToConnectUserWithToken() {
    try {
      var _temp3 = function _temp3(_result) {
        if (_exit2) return _result;

        if (autoLogin) {
          login();
        } else {
          onFinished();
          setDone(true);
        }
      };

      var _exit2 = false;
      var token = getTokenFromUri();

      if (!token) {
        token = getSessionToken();
      } else {
        navigate(location.pathname, {
          replace: true
        });
      }

      var _temp4 = function () {
        if (token) {
          return Promise.resolve(getUserInfos(token, UrlBackend)).then(function (_userInfos) {
            return _finallyRethrows(function () {
              if (_userInfos) {
                return Promise.resolve(getAccreditations(token, UrlBackend)).then(function (accreditations) {
                  setSessionToken(token);
                  OnConnected({
                    id: _userInfos.id,
                    type: "E",
                    email: _userInfos.email,
                    nom: _userInfos.nom,
                    prenom: _userInfos.prenom,
                    token: token,
                    accreditations: accreditations && accreditations.data && accreditations.data.data ? accreditations.data.data : []
                  });
                  navigate(location.pathname, {
                    replace: true
                  });
                  _exit2 = true;
                  return true;
                });
              } else {
                _exit2 = true;
                return false;
              }
            }, function (_wasThrown, _result2) {
              onFinished();
              setDone(true);
              if (_wasThrown) throw _result2;
              return _result2;
            });
          });
        }
      }();

      return Promise.resolve(_temp4 && _temp4.then ? _temp4.then(_temp3) : _temp3(_temp4));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  React.useEffect(function () {
    tryToConnectUserWithToken();
  }, []);
  return done ? {
    children: children
  } : /*#__PURE__*/React__default.createElement("div", null);
};

var useAuth$1 = useAuth;
var HlpAuth$1 = HlpAuth;

exports.HlpAuth = HlpAuth$1;
exports.useAuth = useAuth$1;
//# sourceMappingURL=index.js.map
