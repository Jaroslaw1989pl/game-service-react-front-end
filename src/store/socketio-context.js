// 3rd party modules
import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
// custom context components
import ServerContext from './server-context';
import UserContext from './user-context';


const SocketioContext = createContext({
  client: null,
  connect: (serverName, user) => {}
});

export const SocketioContextProvider = (props) => {

  const serverContext = useContext(ServerContext);
  const userContext = useContext(UserContext);

  const [clientState, setClientState] = useState(null);

  
  const player = {
    socketId: '',
    userId: '',
    userName: ''
  };
  // let activePlayersList = [];
  const connect = (serverName, user) => {
    useEffect(() => {
      console.log(user);
      const startGameServer = () => {
        return new Promise((resolve, reject) => {        
          const xhr = new XMLHttpRequest();
          
          xhr.onerror = () => reject('SocketioContextProvider: POST: ' + serverContext.gamesStartServer + ' not responding.');
          xhr.onload = () => resolve(JSON.parse(xhr.responseText));
          xhr.open('POST', serverContext.domain + serverContext.gamesStartServer);
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          xhr.send('name=' + serverName);
        })
      };
      
      // only authenticated user can star server
      if (clientState === null) {
        console.error('!!! [SocketioContextProvider] Wymaga poprawy: funkcja connect nie może za tworzyć nowego połączenia przy zmianie stron.');
        // startGameServer()
        // .then(result => {
        //   console.log(result);
          const socket = io(serverContext.domain + ':5000/' + serverName);
          setClientState(socket);
        // })
        // .catch(error => console.error(error));

        socket.on('connect', () => {
          player.socketId = socket.id;
          player.userId = user.id;
          player.userName = user.name;
      
          socket.emit('player-add', player);
        });
      }
    }, []);
  };

  const socketObject = {
    client: clientState,
    connect: connect
  };

  return <SocketioContext.Provider value={socketObject}>{props.children}</SocketioContext.Provider>
};

export default SocketioContext;