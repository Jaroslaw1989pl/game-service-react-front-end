// 3rd party components
import { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { io } from 'socket.io-client';
// custom components
import CheckersBoard from './checkers/checkers-board';
// custom context components
import ServerContext from '../../store/server-context';
import UserContext from '../../store/user-context';
import FlashMessageContext from '../../store/flash-message-context';
// custom style sheets
import './game-room-layout.css';


const GameRoomLayout = (props) => {

  const navigate = useNavigate();

  const serverContext = useContext(ServerContext);
  const userContext = useContext(UserContext);
  const flash = useContext(FlashMessageContext);

  const playerOneBtn = useRef();
  const playerTwoBtn = useRef();
  const coundownModal = useRef();
  const startTimer = useRef();

  const [sideBtnState, setSideBtnState] = useState();
  const [sideState, setSideState] = useState(false); // true == player one | false == player two
  const [gameActiveState, setGameActiveState] = useState(false);


  const sideSelection = (event) => {
    event.target.disabled = true;

  };

  const startCountdown = (event) => {
    event.target.disabled = true;
    coundownModal.current.style.display = 'block';
    let maxTimeToStart = 10;
    let interval = setInterval(() => {
      maxTimeToStart = coundown(maxTimeToStart, interval);
    }, 1000);
  };

  const coundown = (time, interval) => {
    if (time === 0) {
      clearInterval(interval);
      quickStart();
    } else {
      startTimer.current.innerHTML = '00:0' + (time -= 1);
      return time;
    }
  };

  const quickStart = () => {
    setGameActiveState(true);
    coundownModal.current.remove();
  };
  
  return (
    <>
      <button ref={playerOneBtn} onClick={event => sideSelection(event)}>White pawn</button>
      <button ref={playerTwoBtn} onClick={event => sideSelection(event)}>Black pawn</button>
      <div id="score-container" style={{backgroundColor: 'white'}}>
        <span id="player-one" className="score-item">12</span> : <span id="player-one" className="score-item">12</span>
      </div>
      <button onClick={event => startCountdown(event)}>Start countdown</button>
    
      <CheckersBoard side={sideState} isStart={gameActiveState}/>
    
      <div id="count-down-modal" ref={coundownModal} display="hidden">
        <p>Game will start for: <span id="start-timer" ref={startTimer}>00:10</span></p>
        <button id="quick-start-btn" onClick={quickStart}>Start now</button>
      </div>
    </>
  );
};

export default GameRoomLayout;