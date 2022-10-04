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
import FlashMessageContext from '../store/flash-message-context';


const HomePage = () => {

  // useContext constans
  const server = useContext(ServerContext);
  const flash = useContext(FlashMessageContext);

  const [isUserAuthenticated, setUserAuthenticationStatus] = useState(false);
  const [user, setUser] = useState({});

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
          flash.add('error', xhr.responseText);
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

      <ul id="flash-messages-list">
        {flash.messages.map((message) => <FlashMessage type={message.type} text={message.text}/>)}
      </ul>

      <div id="page-content">
        <GameTile />
      </div>
    </>
  );
};

export default HomePage;