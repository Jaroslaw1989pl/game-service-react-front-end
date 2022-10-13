// 3rd party components
import { Link } from 'react-router-dom';
// custom style components
import './game-tile.css';


const GameTile = (props) => {
  return (
    <div className="game-tile">
      <div className="game-tile-left">
        <div className="game-icon">
          <img src={'/img/games/' + props.src} alt="" />
        </div>
      </div>
      <div className="game-tile-right">
        <h2 className="game-title">{props.name}</h2>
        <p className="game-desc">Tradycyjna gra planszowa dla dwóch gracz. Celem jest zbicie pionów przeciwni.</p>
        <Link to={'/games/checkers'}><button className="game-play-btn">Play</button></Link>
      </div>
    </div>
  );
}

export default GameTile;