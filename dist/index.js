function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

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

/**
 * Actions represent the type of change to a location value.
 *
 * @see https://github.com/remix-run/history/tree/main/docs/api-reference.md#action
 */
var Action;

(function (Action) {
  /**
   * A POP indicates a change to an arbitrary index in the history stack, such
   * as a back or forward navigation. It does not describe the direction of the
   * navigation, only that the current index changed.
   *
   * Note: This is the default action for newly created history objects.
   */
  Action["Pop"] = "POP";
  /**
   * A PUSH indicates a new entry being added to the history stack, such as when
   * a link is clicked and a new page loads. When this happens, all subsequent
   * entries in the stack are lost.
   */

  Action["Push"] = "PUSH";
  /**
   * A REPLACE indicates the entry at the current index in the history stack
   * being replaced by a new one.
   */

  Action["Replace"] = "REPLACE";
})(Action || (Action = {}));

var readOnly = process.env.NODE_ENV !== "production" ? function (obj) {
  return Object.freeze(obj);
} : function (obj) {
  return obj;
};
/**
 * Parses a string URL path into its separate pathname, search, and hash components.
 *
 * @see https://github.com/remix-run/history/tree/main/docs/api-reference.md#parsepath
 */

function parsePath(path) {
  var parsedPath = {};

  if (path) {
    var hashIndex = path.indexOf('#');

    if (hashIndex >= 0) {
      parsedPath.hash = path.substr(hashIndex);
      path = path.substr(0, hashIndex);
    }

    var searchIndex = path.indexOf('?');

    if (searchIndex >= 0) {
      parsedPath.search = path.substr(searchIndex);
      path = path.substr(0, searchIndex);
    }

    if (path) {
      parsedPath.pathname = path;
    }
  }

  return parsedPath;
}

/**
 * React Router v6.2.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */

function invariant(cond, message) {
  if (!cond) throw new Error(message);
}

function warning(cond, message) {
  if (!cond) {
    // eslint-disable-next-line no-console
    if (typeof console !== "undefined") console.warn(message);

    try {
      // Welcome to debugging React Router!
      //
      // This error is thrown as a convenience so you can more easily
      // find the source for a warning that appears in the console by
      // enabling "pause on exceptions" in your JavaScript debugger.
      throw new Error(message); // eslint-disable-next-line no-empty
    } catch (e) {}
  }
}
// CONTEXT
///////////////////////////////////////////////////////////////////////////////

/**
 * A Navigator is a "location changer"; it's how you get to different locations.
 *
 * Every history instance conforms to the Navigator interface, but the
 * distinction is useful primarily when it comes to the low-level <Router> API
 * where both the location and a navigator must be provided separately in order
 * to avoid "tearing" that may occur in a suspense-enabled app if the action
 * and/or location were to be read directly from the history instance.
 */


const NavigationContext = /*#__PURE__*/React.createContext(null);

if (process.env.NODE_ENV !== "production") {
  NavigationContext.displayName = "Navigation";
}

const LocationContext = /*#__PURE__*/React.createContext(null);

if (process.env.NODE_ENV !== "production") {
  LocationContext.displayName = "Location";
}

const RouteContext = /*#__PURE__*/React.createContext({
  outlet: null,
  matches: []
});

if (process.env.NODE_ENV !== "production") {
  RouteContext.displayName = "Route";
} ///////////////////////////////////////////////////////////////////////////////
/**
 * Returns true if this component is a descendant of a <Router>.
 *
 * @see https://reactrouter.com/docs/en/v6/api#useinroutercontext
 */

function useInRouterContext() {
  return React.useContext(LocationContext) != null;
}
/**
 * Returns the current location object, which represents the current URL in web
 * browsers.
 *
 * Note: If you're using this it may mean you're doing some of your own
 * "routing" in your app, and we'd like to know what your use case is. We may
 * be able to provide something higher-level to better suit your needs.
 *
 * @see https://reactrouter.com/docs/en/v6/api#uselocation
 */

function useLocation() {
  !useInRouterContext() ? process.env.NODE_ENV !== "production" ? invariant(false, // TODO: This error is probably because they somehow have 2 versions of the
  // router loaded. We can help them understand how to avoid that.
  "useLocation() may be used only in the context of a <Router> component.") : invariant(false) : void 0;
  return React.useContext(LocationContext).location;
}
/**
 * The interface for the navigate() function returned from useNavigate().
 */

/**
 * Returns an imperative method for changing the location. Used by <Link>s, but
 * may also be used by other elements to change the location.
 *
 * @see https://reactrouter.com/docs/en/v6/api#usenavigate
 */
function useNavigate() {
  !useInRouterContext() ? process.env.NODE_ENV !== "production" ? invariant(false, // TODO: This error is probably because they somehow have 2 versions of the
  // router loaded. We can help them understand how to avoid that.
  "useNavigate() may be used only in the context of a <Router> component.") : invariant(false) : void 0;
  let {
    basename,
    navigator
  } = React.useContext(NavigationContext);
  let {
    matches
  } = React.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let routePathnamesJson = JSON.stringify(matches.map(match => match.pathnameBase));
  let activeRef = React.useRef(false);
  React.useEffect(() => {
    activeRef.current = true;
  });
  let navigate = React.useCallback(function (to, options) {
    if (options === void 0) {
      options = {};
    }

    process.env.NODE_ENV !== "production" ? warning(activeRef.current, "You should call navigate() in a React.useEffect(), not when " + "your component is first rendered.") : void 0;
    if (!activeRef.current) return;

    if (typeof to === "number") {
      navigator.go(to);
      return;
    }

    let path = resolveTo(to, JSON.parse(routePathnamesJson), locationPathname);

    if (basename !== "/") {
      path.pathname = joinPaths([basename, path.pathname]);
    }

    (!!options.replace ? navigator.replace : navigator.push)(path, options.state);
  }, [basename, navigator, routePathnamesJson, locationPathname]);
  return navigate;
}
/**
 * Returns a resolved path object relative to the given pathname.
 *
 * @see https://reactrouter.com/docs/en/v6/api#resolvepath
 */


function resolvePath(to, fromPathname) {
  if (fromPathname === void 0) {
    fromPathname = "/";
  }

  let {
    pathname: toPathname,
    search = "",
    hash = ""
  } = typeof to === "string" ? parsePath(to) : to;
  let pathname = toPathname ? toPathname.startsWith("/") ? toPathname : resolvePathname(toPathname, fromPathname) : fromPathname;
  return {
    pathname,
    search: normalizeSearch(search),
    hash: normalizeHash(hash)
  };
}

function resolvePathname(relativePath, fromPathname) {
  let segments = fromPathname.replace(/\/+$/, "").split("/");
  let relativeSegments = relativePath.split("/");
  relativeSegments.forEach(segment => {
    if (segment === "..") {
      // Keep the root "" segment so the pathname starts at /
      if (segments.length > 1) segments.pop();
    } else if (segment !== ".") {
      segments.push(segment);
    }
  });
  return segments.length > 1 ? segments.join("/") : "/";
}

function resolveTo(toArg, routePathnames, locationPathname) {
  let to = typeof toArg === "string" ? parsePath(toArg) : toArg;
  let toPathname = toArg === "" || to.pathname === "" ? "/" : to.pathname; // If a pathname is explicitly provided in `to`, it should be relative to the
  // route context. This is explained in `Note on `<Link to>` values` in our
  // migration guide from v5 as a means of disambiguation between `to` values
  // that begin with `/` and those that do not. However, this is problematic for
  // `to` values that do not provide a pathname. `to` can simply be a search or
  // hash string, in which case we should assume that the navigation is relative
  // to the current location's pathname and *not* the route pathname.

  let from;

  if (toPathname == null) {
    from = locationPathname;
  } else {
    let routePathnameIndex = routePathnames.length - 1;

    if (toPathname.startsWith("..")) {
      let toSegments = toPathname.split("/"); // Each leading .. segment means "go up one route" instead of "go up one
      // URL segment".  This is a key difference from how <a href> works and a
      // major reason we call this a "to" value instead of a "href".

      while (toSegments[0] === "..") {
        toSegments.shift();
        routePathnameIndex -= 1;
      }

      to.pathname = toSegments.join("/");
    } // If there are more ".." segments than parent routes, resolve relative to
    // the root / URL.


    from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
  }

  let path = resolvePath(to, from); // Ensure the pathname has a trailing slash if the original to value had one.

  if (toPathname && toPathname !== "/" && toPathname.endsWith("/") && !path.pathname.endsWith("/")) {
    path.pathname += "/";
  }

  return path;
}

const joinPaths = paths => paths.join("/").replace(/\/\/+/g, "/");

const normalizeSearch = search => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;

const normalizeHash = hash => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash; ///////////////////////////////////////////////////////////////////////////////

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

  var navigate = useNavigate();
  var location = useLocation();

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
  return /*#__PURE__*/React__default.createElement(React.Fragment, null, done ? {
    children: children
  } : /*#__PURE__*/React__default.createElement("div", null));
};

var useAuth$1 = useAuth;
var HlpAuth$1 = HlpAuth;

exports.HlpAuth = HlpAuth$1;
exports.useAuth = useAuth$1;
//# sourceMappingURL=index.js.map
