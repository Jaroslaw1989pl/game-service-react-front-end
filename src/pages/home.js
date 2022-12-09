// 3rd party components
import { useContext, useState, useEffect, useRef } from 'react';
// custom style components
import './home.css';
// custom layouts components
import MainLayout from '../components/layout/main-layout';
import GameTile from "../components/games/game-tile";
// custom context components
import ServerContext from '../store/server-context';
import UserContext from '../store/user-context';
import FlashMessageContext from '../store/flash-message-context';


const HomePage = () => {

  const serverContext = useContext(ServerContext);
  const userContext = useContext(UserContext);
  const flashContext = useContext(FlashMessageContext);

  const platformAll = useRef();
  const platformWeb = useRef();
  const platformAndroid = useRef();
  const searchInput = useRef();

  const [gamesState, setGamesState] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [activePlatform, setActivePlatform] = useState(platformAll.current);

  // console.log(userContext);
  useEffect(() => {    
    const xhr = new XMLHttpRequest();      
    
    xhr.onerror = () => console.log('HomePage: GET: ' + serverContext.gamesList + ' not responding.');
    xhr.onload = () => {
      setGamesState(JSON.parse(xhr.responseText));
      setFilteredGames(JSON.parse(xhr.responseText));
    }
    xhr.open('GET', serverContext.domain + serverContext.gamesList);
    xhr.send();
  }, []);

  const gamesListFilter = (event) => {

    let platform = activePlatform;

    if (event.type == 'click') {
      setActivePlatform(event.target);
      platform = event.target;
    }
    
    // setting up active button color
    platformAll.current.style.color = platformWeb.current.style.color = platformAndroid.current.style.color = 'white';  
    platform.style.color = 'red';

    if (platform.name === 'all') {
      setFilteredGames(gamesState.filter(game => game.title.toLowerCase().includes(searchInput.current.value.toLowerCase())));
    } else {
      setFilteredGames(gamesState.filter(game => {
        return game.platform === platform.name && game.title.toLowerCase().includes(searchInput.current.value.toLowerCase());
      }));
    } 
  };

  return (
    <MainLayout >
      <div id="platform-filter">
        <ul>
          <li className="platform-item">
            <button name="all" ref={platformAll} style={{color: 'red'}} onClick={event => gamesListFilter(event)}>All</button>
          </li>
          <li className="platform-item">
            <button name="web" ref={platformWeb} onClick={event => gamesListFilter(event)}>Web</button>
          </li>
          <li className="platform-item">
            <button name="android" ref={platformAndroid} onClick={event => gamesListFilter(event)}>Android</button>
          </li>
        </ul>
      </div>
      <div id="games-filter">
        <div id="search-filter">
          <p>Find game:</p>
          <input type="text" ref={searchInput} onInput={event => gamesListFilter(event)}></input>
        </div>
      </div>
      <div id="games-tiles-container">
        {filteredGames.map((game, index) => <GameTile key={index} src={game.image} title={game.title}/>)}
      </div>
    </MainLayout>
  );
};

export default HomePage;