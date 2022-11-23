// 3rd party components
import { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { io } from 'socket.io-client';
// custom layouts components
// import GameLayout from '../../components/layout/game-layout';
// custom context components
import ServerContext from '../../store/server-context';
import FlashMessageContext from '../../store/flash-message-context';
// custom style components
import './game-lobby-layout.css';


const GameLobbyLayout = (props) => {

  const navigate = useNavigate();
  
  const { game } = useParams();

  const server = useContext(ServerContext);
  const flash = useContext(FlashMessageContext);

  // const [isUserAuthenticated, setUserAuthenticationStatus] = useState(false);
  // const [isLobby, setIsLobby] = useState(false);
  const [activeUsersList, setActiveUsersList] = useState([]);
  const [gameData, setGameData] = useState();
  
  const usersListContainer = useRef();
  
  // const player = {
  //   socketId: '',
  //   userId: '',
  //   userName: ''
  // };

  const socket = io('http://192.168.100.39:5000');

  socket.on('connect', () => {
    player.socketId = socket.id;
    player.userId = props.user.id;
    player.userName = props.user.name;

    socket.emit('player-add', player);
  });

  socket.on('player-list', response => {
    console.log(response);
    // setActiveUsersList(response);
    // usersListContainer.current.innerHTML = '';
    // response.forEach((id, index) => {
    //   let paragraph = document.createElement('p');
    //   paragraph.textContent = id;
    //   usersListContainer.current.appendChild(paragraph);
    // });
  });

  // request for game data
  useEffect(() => {
    console.log('render mesage');
    const xhr = new XMLHttpRequest();      
        
    xhr.onerror = () => console.log('GameLobbyPage: GET Server not responding.');
    xhr.onload = () => {
      if (xhr.status === 200) setGameData(JSON.parse(xhr.responseText).response);
      else if (xhr.status === 404) navigate('/');
    }
    xhr.open('GET', server.domain + server.gamesFind + '?name=' + props.game);
    xhr.send();
  }, []);

  const clearUsersList = () => {
    // socket.emit('clear-list');
    console.log(player);
  };

  return (
    <>
      <div className="game-lobby">
        <h1>{gameData && gameData.title + ' lobby'}</h1>
        <div className="lobby-rooms">
          <h3>Rooms</h3>
        </div>
        <div className="lobby-active-users">
          <h3>Active users</h3>
          <button className="clear-users-list" onClick={clearUsersList}>Clear list</button>
          <div className="active-users-list" ref={usersListContainer}>
            {activeUsersList.map((value, index) => <p key={index}>{(index + 1) + ' ' + value}</p>)}
          </div>
        </div>
        <div style={{clear: 'both'}}></div>
      </div>
    </>
  );
};

export default GameLobbyLayout;