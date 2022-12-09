// 3rd party components
import { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
// custom layouts components
import GameLayout from '../../components/layout/game-layout';
import GameLobbyLayout from '../../components/games/game-lobby-layout';
// custom context components
import ServerContext from '../../store/server-context';
import UserContext from '../../store/user-context';
import FlashMessageContext from '../../store/flash-message-context';
// custom style components
import './game-lobby.css';


const GameLobbyPage = () => {

  const navigate = useNavigate();

  const { game } = useParams();

  const serverContext = useContext(ServerContext);
  const userContext = useContext(UserContext);
  const flash = useContext(FlashMessageContext);

  const [gameData, setGameData] = useState({});


  useEffect(() => {

    const xhr = new XMLHttpRequest();      
        
    xhr.onerror = () => console.log(`GameLobbyPage: GET: ${serverContext.gamesFind}?name=${game} not responding.`);
    xhr.onload = () => {
      if (xhr.status === 200) setGameData(JSON.parse(xhr.responseText).response);
      else if (xhr.status === 404) navigate('/');
    }
    xhr.open('GET', serverContext.domain + serverContext.gamesFind + '?name=' + game);
    xhr.send();
  }, []);

  return (<GameLayout game={game}>
      <GameLobbyLayout authentication={userContext.id.length > 0} user={userContext} game={gameData} />
    </GameLayout>
  );
};

export default GameLobbyPage;