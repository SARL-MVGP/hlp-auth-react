import React, { Fragment, useEffect, useState } from 'react';
import { getSessionToken, setSessionToken, useAuth } from './useAuth';
import { getAccreditations, getTokenFromUri, getUserInfos } from './actions';


export const HlpAuth = ({ UrlBackend, OnConnected, onFinished, autoLogin, children }) => {
  const [login] = useAuth(UrlBackend);

  const [done, setDone] = useState(false);

  const tryToConnectUserWithToken = async () => {
    let token = getTokenFromUri(); // Si on a un token dans la query
    if (!token) {
      token = getSessionToken(); // Si on a un token dans le localStorage
    } else {
      window.history.pushState({}, document.title, window.location.pathname);
    }
    if (token) {
      // On vérifie que l'utilisateur est (encore) valide...
      const _userInfos = await getUserInfos(token, UrlBackend);
      try {
        if (_userInfos) {
          // On récupère les accréditations
          const accreditations = await getAccreditations(token, UrlBackend);

          // On stocke le token dans le localStorage
          setSessionToken(token);

          // On remonte au parent les infos utilisateur connecté
          OnConnected({
            id: _userInfos.id,
            type: "E",
            email: _userInfos.email,
            nom: _userInfos.nom,
            prenom: _userInfos.prenom,
            token,
            accreditations:
              accreditations && accreditations.data && accreditations.data.data ? accreditations.data.data : []
          });
          window.history.pushState({}, document.title, window.location.pathname);
          return true;
        } else {
          return false;
        }
      }
      finally {
        onFinished();
        setDone(true);
      }
    }

    // Si pas d'info user / token valide => alors on propose de connecter l'utilisateur
    if (autoLogin) {
      login();
    }
    else {
      onFinished();
      setDone(true);
    }
  };

  useEffect(() => {
    // Au premiere lancement, on vérifie l'état de la connexion
    tryToConnectUserWithToken();
  }, []);

  // Affichage des enfants du composant
  return done ? (<Fragment>{children}</Fragment>) : <div/>;
};

