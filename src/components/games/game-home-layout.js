// 3rd party components
import { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// custom layouts components
// custom context components
import ServerContext from '../../store/server-context';
import FlashMessageContext from '../../store/flash-message-context';
// custom style components
import './game-home-layout.css';


const GameHomeLayout = (props) => {

  const navigate = useNavigate();

  const server = useContext(ServerContext);
  const flash = useContext(FlashMessageContext);

  // const [activeUsersList, setActiveUsersList] = useState([]);
  const [gameData, setGameData] = useState();

  useEffect(() => {
    const xhr = new XMLHttpRequest();      
        
    xhr.onerror = () => console.log('GameLobbyPage: GET Server not responding.');
    xhr.onload = () => {
      if (xhr.status === 200) setGameData(JSON.parse(xhr.responseText).response);
      else if (xhr.status === 404) navigate('/');
    }
    xhr.open('GET', server.domain + server.gamesFind + '?name=' + props.game);
    xhr.send();
  }, []);

  return (
    // <GameLayout authentication={isUserAuthenticated} user={user}>
    <div className="title-board">
      <div className="title-board-header">
        <h1 className="game-title">{gameData && gameData.title}</h1>
        <div className="join-panel">
          {props.authentication
            ? <>
                {gameData && <Link to={'/games/' + gameData.title.toLowerCase() + '/lobby'}>
                  <button id="join-as-user-btn" className="sign-btn join-game-btn">Join to lobby</button>
                </Link>}
              </>
            : <Link to="/login"><button id="sign-in-btn" className="sign-btn">Sign in</button></Link>
          }
        </div>
      </div>
    </div>
    // </GameLayout>
  );
};

export default GameHomeLayout;