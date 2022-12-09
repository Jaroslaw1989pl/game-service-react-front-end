// 3rd party components
import { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
// custom layouts components
import GameLayout from '../../components/layout/game-layout';
import GameRoomLayout from '../../components/games/game-room-layout';
// custom context components
import ServerContext from '../../store/server-context';
import FlashMessageContext from '../../store/flash-message-context';
// custom style components
import './game-room.css';


const GameRoomPage = () => {

  const navigate = useNavigate();

  const { game } = useParams();

  const server = useContext(ServerContext);
  const flash = useContext(FlashMessageContext);

  const [isUserAuthenticated, setUserAuthenticationStatus] = useState(false);
  const [user, setUser] = useState({});
  const [gameData, setGameData] = useState({});


  // return (<GameLayout authentication={isUserAuthenticated} user={user}>
  //     <GameRoomLayout />
  //   </GameLayout>
  // );

  return (<GameLayout game={game}>
      <GameRoomLayout />
    </GameLayout>
  );
};

export default GameRoomPage;