// 3rd party components
import { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
// custom components
// custom context components
import ServerContext from '../../store/server-context';
import UserContext from '../../store/user-context';
import SocketioContext from '../../store/socketio-context';
import FlashMessageContext from '../../store/flash-message-context';
// custom style components
import './game-lobby-layout.css';


const GameLobbyLayout = (props) => {

  const navigate = useNavigate();

  const serverContext = useContext(ServerContext);
  const userContext = useContext(UserContext);
  const socketioContext = useContext(SocketioContext);
  const flash = useContext(FlashMessageContext);

  const [activeUsersList, setActiveUsersList] = useState();
  
  const usersListContainerRef = useRef();

  // const [prompt, setIsDitrty, setPristine] = BrowserCloseEvent();

  
  // const player = {
  //   socketId: '',
  //   userId: '',
  //   userName: ''
  // };
  // let activePlayersList = [];

  // useEffect(() => {
    console.log(socketioContext);
    if (socketioContext.client) {
      // socketioContext.client.on('connect', () => {
      //   player.socketId = socketioContext.client.id;
      //   player.userId = props.user.id;
      //   player.userName = props.user.name;
    
      //   socketioContext.client.emit('player-add', player);
      // });
    
      socketioContext.client.on('player-list', response => {
        // setActiveUsersList(response)
        let usersListContainer = document.getElementById('active-users-list');
        if (usersListContainer) {
          usersListContainer.innerHTML = '';
          response.forEach((player, index) => {
            let paragraph = document.createElement('p');
            paragraph.textContent = player.userName;
            usersListContainer.appendChild(paragraph);
          });
        }
      });
    }
  // }, []);



  /* 
    Possible ways to leave lobby:
    1. change page url/back button
    2. close browser/tab
  */

  // window.onbeforeunload = event => {
  //   console.log(event);
  //   event.preventDefault();
  //   return event.returnValue = "Are you sure you want to exit?";
  //   // let text = "Press a button!\nEither OK or Cancel.";
  //   // if (confirm(text) == true) {
  //   //   console.log('quit');
  //   // }else {
  //   //   console.log('stay');
  //   // }
  // };

  return (
    <>
      <div className="game-lobby">
        {/* {prompt} */}
        <h1>{props.game && props.game.title + ' lobby'}</h1>
        <div className="lobby-rooms">
          <h3>Rooms</h3>
          <Link to={props.game && '/games/' + String(props.game.title).toLowerCase() + '/room/1'}>
            <button id="create-room">Create room</button>
          </Link>
          <div className="lobby-rooms-list"></div>
        </div>
        <div className="lobby-active-users">
          <h3>Active users</h3>
          <div id="active-users-list" className="active-users-list" ref={usersListContainerRef}>
            {/* {activeUsersList && activeUsersList.map((value, index) => <p key={index}>{(index + 1) + ' ' + value}</p>)} */}
          </div>
        </div>
        <div style={{clear: 'both'}}></div>
      </div>
    </>
  );
};

export default GameLobbyLayout;