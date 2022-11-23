// 3rd party components
import { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
// custom layouts components
import GameLayout from '../../components/layout/game-layout';
// custom context components
import ServerContext from '../../store/server-context';
import FlashMessageContext from '../../store/flash-message-context';
import GameLobbyLayout from '../../components/games/game-lobby-layout';
// custom style components
import './game-lobby.css';


const GameLobbyPage = () => {

  const navigate = useNavigate();

  const { game } = useParams();

  const server = useContext(ServerContext);
  const flash = useContext(FlashMessageContext);

  const [isUserAuthenticated, setUserAuthenticationStatus] = useState(false);
  const [user, setUser] = useState({});
  // const [player, setPlayer] = useState({});

  // const player = {
  //   socketId: '',
  //   userId: '',
  //   userName: ''
  // };


  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('session'));
    const token = session ? session.token : '';
    const xhr = new XMLHttpRequest();

    xhr.onerror = () => console.log('GameLobbyPage: POST Server not responding.');
    xhr.onload = () => {
      if (xhr.status === 200) {
        setUserAuthenticationStatus(true);
        setUser(JSON.parse(xhr.responseText));
      } else {
        setUserAuthenticationStatus(false);
        localStorage.removeItem('session');
        // flash.add('error', 'Your session expired');
        navigate('/');
      }
    }
    xhr.open('POST', server.domain + server.userGet);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    xhr.send();
  }, []);

  return (<GameLayout authentication={isUserAuthenticated} user={user}>
      <GameLobbyLayout authentication={isUserAuthenticated} user={user} game={game} />
    </GameLayout>
  );
};

export default GameLobbyPage;