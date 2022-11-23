// 3rd party modules
import { createContext } from "react";


const ServerContext = createContext();

export const ServerContextProvider = (props) => {

  const server = {
    // domain: 'http://playfab-game-php-server',
    domain: 'http://192.168.100.39',
    authenticationFindUser: '/api/authentication/find-user',
    authenticationRegisterUser: '/api/authentication/register-user',
    authenticationLoginUser: '/api/authentication/login-user',
    authenticationLogout: '/api/logout',
    authenticationPassReset: '/api/authentication/pass-reset',
    authenticationEmailCode: '/api/authentication/email-code',
    authenticationConfirmCode: '/api/authentication/confirm-code',

    userGet: '/api/user/get-user',
    userSetPassword: '/api/user/set-password',
    userUpdatePassword: '/api/user/update-password',
    userSetAvatar: '/api/user/set-avatar',
    userSetUsername: '/api/user/set-username',
    userSetEmail: '/api/user/set-email',
    userDelete: '/api/user/delete',

    gamesList: '/api/games/get-list',
    gamesFind: '/api/games/get-game',
  };

  return <ServerContext.Provider value={server}>{props.children}</ServerContext.Provider>;
};

export default ServerContext;