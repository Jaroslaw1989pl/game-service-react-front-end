// 3rd party components
import { useContext, useState, useEffect } from 'react';
// custom style components
import './home.css';
// custom layouts components
import TopBar from "../components/layout/top-bar";
import FlashMessage from '../components/layout/flash-message';
import GameTile from "../components/games/game-tile";
// custom components
import ServerContext from '../store/server-context';


const HomePage = () => {

  const server = useContext(ServerContext);

  const [isUserAuthenticated, setUserAuthenticationStatus] = useState(false);
  const [user, setUser] = useState({});
  const [flashMessage, setFlashMessage] = useState({active: false, type: '', text: ''});

  useEffect(() => {
    
    const session = JSON.parse(localStorage.getItem('session'));

    // the session expires if the current time in seconds is less than session.expire 
    if (session) { //&& session.expire >= Math.floor(new Date().getTime() / 1000)) {
   
      const xhr = new XMLHttpRequest();      
        
      xhr.onerror = () => console.log('HomePage: POST Server not responding.');
      xhr.onload = () => {
        if (xhr.status === 200) {
          setUserAuthenticationStatus(true);
          setUser(JSON.parse(xhr.responseText));
        } else {
          localStorage.removeItem('session');
          setUserAuthenticationStatus(false);
          setFlashMessage({active: true, type: 'error', text: xhr.responseText});
        }
      }
      xhr.open('POST', server.domain + server.userGet);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('Authorization', 'Bearer ' + session.token);
      xhr.send();
    }
  }, []);

  return (
    <>
      <TopBar auth={isUserAuthenticated} user={user}/>
      {flashMessage.active && <FlashMessage type={flashMessage.type} text={flashMessage.text}/>}
      <div id="page-content">
        <GameTile />
      </div>
    </>
  );
};

export default HomePage;