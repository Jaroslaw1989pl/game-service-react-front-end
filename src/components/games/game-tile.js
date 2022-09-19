// custom style components
import './game-tile.css';


const GameTile = () => {
  return (
    <div className="game-tile">
      <div className="game-icon"><img src="img/favicon.png" alt="" /></div>
      <div className="game-title"></div>
    </div>
  );
}

export default GameTile;