// 3rd party components
import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// custom style components
import './top-bar.css';
// custom components
import FlashMessage from './flash-message';
import ServerContext from '../../store/server-context';


const TopBar = () => {

  const server = useContext(ServerContext);
  const [isUserAuthenticated, setUserAuthenticationStatus] = useState(false);
  const [username, setUsername] = useState(false);
  const [flashMessage, setFlashMessage] = useState({active: false, type: '', text: ''});


  const toggleDropdownMenu = event => {
    event.preventDefault();

    const menu = document.getElementById('user-menu');
  
    if (menu.style.display == '') menu.style.display = 'block';
    else if (menu.style.display == 'block') menu.style.display = '';
  };

  useEffect(() => {
    
    const session = JSON.parse(localStorage.getItem('session'));

    // the session expires if the current time in seconds is less than session.expire 
    if (session) { //&& session.expire >= Math.floor(new Date().getTime() / 1000)) {
   
      const xhr = new XMLHttpRequest();      
        
      xhr.onerror = () => console.log('POST Server not responding.');
      xhr.onload = () => {
        console.log(xhr.responseText);
        if (xhr.status === 200) {
          setUserAuthenticationStatus(true);
        } else {
          localStorage.removeItem('session');
          setUserAuthenticationStatus(false);
          setFlashMessage({active: true, type: 'error', text: xhr.responseText});
        }
      }
      xhr.open('POST', server.domain + '/user/get-user');
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('Authorization', 'Bearer ' + session.token);
      xhr.send();
    }
  }, []);

  return (
    <header id="top-bar">
      <div id="top-bar-left">
        <Link to="/" className="img-home-link"><img src="img/favicon.png" alt="flavico" /></Link>
        <Link to="/" className="home-link">Playfab</Link>
      </div>
      <div id="top-bar-right">
        {isUserAuthenticated 
          ? <div id="user-navigation">

              <img src="" alt="profile avatar" className="profile-avatar"></img>

              <a href="" id="dropdown-toggle" onClick={event => toggleDropdownMenu(event)}>{/*username*/} &#x21B4;</a>

              <div id="user-menu" className="dropdown-menu">
                <div className="dropdown-menu-group">
                  <div className="menu-item">
                    <Link to="/profile-settings">Settings</Link>
                  </div>
                </div>
                <div className="dropdown-menu-group">
                  <div className="menu-item">
                    <form action="/logout" method="POST">
                      <button type="submit" id="logout-btn" /*onClick={callback}*/>Sign out</button>
                    </form>
                  </div>
                </div>
              </div>

            </div>
          : <div id="sign-buttons">
              <Link to="/login"><button id="sign-in-btn" className="sign-btn">Sign in</button></Link>
              <Link to="/registration"><button id="sign-up-btn" className="sign-btn">Sign up</button></Link>
            </div>
        }    
      </div>
      {flashMessage.active && <FlashMessage type={flashMessage.type} text={flashMessage.text}/>}
    </header>
  );
}

export default TopBar;
