// 3rd party modules
import { createContext } from "react";


const ServerContext = createContext();

export const ServerContextProvider = (props) => {

  const server = {
    domain: 'http://playfab-php-server',
    authenticationFindUser: '/authentication/find-user',
    authenticationRegisterUser: '/authentication/register-user',
    authenticationLoginUser: '/authentication/login-user',
    authenticationLogout: '/logout',
    authenticationPassReset: '/authentication/pass-reset',
    authenticationEmailCode: '/authentication/email-code',
    authenticationConfirmCode: '/authentication/confirm-code',

    userGet: '/user/get-user',
    userSetPassword: '/user/set-password',
    userUpdatePassword: '/user/update-password',
    userSetAvatar: '/user/set-avatar',
    userSetUsername: '/user/set-username',
    userSetEmail: '/user/set-email',
    userDelete: '/user/delete'
  };

  return <ServerContext.Provider value={server}>{props.children}</ServerContext.Provider>;
};

export default ServerContext;