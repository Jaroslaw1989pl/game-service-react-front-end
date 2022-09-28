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
    userGet: '/user/get-user',
    userSetPassword: '/user/set-password',
    userSetAvatar: '/user/set-avatar'
  };

  return <ServerContext.Provider value={server}>{props.children}</ServerContext.Provider>;
};

export default ServerContext;