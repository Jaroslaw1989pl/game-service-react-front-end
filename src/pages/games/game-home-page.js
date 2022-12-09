// 3rd party components
import { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
// custom layouts components
import GameLayout from '../../components/layout/game-layout';
// custom context components
import ServerContext from '../../store/server-context';
import UserContext from '../../store/user-context';
import FlashMessageContext from '../../store/flash-message-context';
// custom components
import GameHomeLayout from '../../components/games/game-home-layout';
// custom style components
import './game-home-page.css';


const GameHomePage = () => {

  const { game } = useParams();

  const serverContext = useContext(ServerContext);
  const userContext = useContext(UserContext);
  const flash = useContext(FlashMessageContext);


  return (<GameLayout game={game}>
    <GameHomeLayout authentication={userContext.id.length > 0} game={game} />
  </GameLayout>);
};

export default GameHomePage;