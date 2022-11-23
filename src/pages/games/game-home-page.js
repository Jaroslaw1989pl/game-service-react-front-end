// 3rd party components
import { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
// custom layouts components
import GameLayout from '../../components/layout/game-layout';
// custom context components
import ServerContext from '../../store/server-context';
import FlashMessageContext from '../../store/flash-message-context';
import GameHomeLayout from '../../components/games/game-home-layout';
// custom style components
import './game-home-page.css';


const GameHomePage = () => {

  const { game } = useParams();

  const server = useContext(ServerContext);
  const flash = useContext(FlashMessageContext);

  const [isUserAuthenticated, setUserAuthenticationStatus] = useState(false);
  const [user, setUser] = useState({});

  
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
      }
    }
    xhr.open('POST', server.domain + server.userGet);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    xhr.send();
  }, []);

  return (<GameLayout authentication={isUserAuthenticated} user={user}>
    <GameHomeLayout authentication={isUserAuthenticated} game={game}/>
  </GameLayout>);
};

export default GameHomePage;