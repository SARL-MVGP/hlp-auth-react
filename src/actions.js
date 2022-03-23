// Helper permettant de récupérer la valeur du paramètre "token" dans la query
export const getTokenFromUri = () => {
  return getQueryVar('token');
};

// Helper permettant de récupérer un paramètre dans la query
export const getQueryVar = (varName) => {
  var queryStr = unescape(window.location.search) + '&';
  var regex = new RegExp('.*?[&\\?]' + varName + '=(.*?)&.*');
  var val = queryStr.replace(regex, '$1');
  return val == queryStr ? false : val;
};

// Helper permettant d'effectuer une request backend pour obtenir les infos du lieu
export const getLieuInfos = async (token, backendUrl) => {
  var myHeaders = new Headers({
    Authorization: 'Bearer ' + token
  });
  var myInit = {
    method: 'GET',
    headers: myHeaders
  };

  const res = await fetch(`${backendUrl}/_auth/lieuinfos`, myInit);
  if (res.status !== 200) {
    return false;
  } else {
    const jsonPayload = await res.json();
    return jsonPayload.data;
  }
};

// Helper permettant d'effectuer une request backend pour obtenir les infos utilisateur
export const getUserInfos = async (token, backendUrl) => {
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

// Helper permettant d'effectuer une request backend pour obtenir les accreditations utilisateur
export const getAccreditations = async (token, backendUrl) => {
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