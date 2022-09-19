// custom style components
import './home.css';
// custom layouts components
import TopBar from "../components/layout/top-bar";
import GameTile from "../components/games/game-tile";


const HomePage = () => {
  return (
    <>
      <TopBar />
      <div id="page-content">
        <GameTile />
      </div>
    </>
  );
};

export default HomePage;