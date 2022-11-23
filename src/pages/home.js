// 3rd party components
import { useContext, useState, useEffect, useRef } from 'react';
// custom style components
import './home.css';
// custom layouts components
import MainLayout from '../components/layout/main-layout';
import GameTile from "../components/games/game-tile";
// custom components
import ServerContext from '../store/server-context';
import FlashMessageContext from '../store/flash-message-context';


const HomePage = () => {

  const server = useContext(ServerContext);
  const flash = useContext(FlashMessageContext);

  const platformAll = useRef();
  const platformWeb = useRef();
  const platformAndroid = useRef();
  const searchInput = useRef();

  const [isUserAuthenticated, setUserAuthenticationStatus] = useState();
  const [user, setUser] = useState({});
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [activePlatform, setActivePlatform] = useState();


  useEffect(() => {
    
    const session = JSON.parse(localStorage.getItem('session'));

    const token = session ? session.token : '';
   
    const xhr = new XMLHttpRequest();      
        
    xhr.onerror = () => console.log('HomePage: POST Server not responding.');
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

  useEffect(() => {
    setActivePlatform(platformAll.current);

    const xhr = new XMLHttpRequest();      
        
    xhr.onerror = () => console.log('HomePage: POST Server not responding.');
    xhr.onload = () => {
      console.log(JSON.parse(xhr.responseText));
      setGames(JSON.parse(xhr.responseText));
      setFilteredGames(JSON.parse(xhr.responseText));
    }
    xhr.open('GET', server.domain + server.gamesList);
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

    if (platform.name === 'all')
      setFilteredGames(games.filter(game => game.title.toLowerCase().includes(searchInput.current.value.toLowerCase())));
    else 
      setFilteredGames(games.filter(game => {
        return game.platform === platform.name && game.title.toLowerCase().includes(searchInput.current.value.toLowerCase());
      }));
  };

  return (
    <MainLayout authentication={isUserAuthenticated} user={user}>
      {/* <div id="page-content"> */}
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
      {/* </div> */}
    </MainLayout>
  );
};

export default HomePage;