// 3rd party components 
import { Link } from 'react-router-dom';
// custom components
import FlashMessage from './flash-message';
// custom style components
import './top-bar.css';


const SignButtons = (callback) => {
  return (
    <div id="sign-buttons">
      <Link to="/login"><button id="sign-in-btn" className="sign-btn">Sign in</button></Link>
      <Link to="/registration"><button id="sign-up-btn" className="sign-btn">Sign up</button></Link>
    </div>
  );
};

const UserNavigation = (callback) => {

  const toggleDropdownMenu = event => {
    event.preventDefault();

    const menu = document.getElementById('user-menu');
  
    if (menu.style.display == '') menu.style.display = 'block';
    else if (menu.style.display == 'block') menu.style.display = '';
  };

  return (
    <div id="user-navigation">

      <img src="" alt="profile avatar" className="profile-avatar"></img>

      <a href="" id="dropdown-toggle" onClick={toggleDropdownMenu}>{/*username*/} &#x21B4;</a>

      <div id="user-menu" className="dropdown-menu">
        <div className="dropdown-menu-group">
          <div className="menu-item">
            <Link to="/profile-settings">Settings</Link>
          </div>
        </div>
        <div className="dropdown-menu-group">
          <div className="menu-item">
            <form action="/logout" method="POST">
              <button type="submit" id="logout-btn" onClick={callback}>Sign out</button>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
};

const TopBar = (props) => {
  return (
    <header id="top-bar">
      <div id="top-bar-left">
        <Link to="/" className="img-home-link"><img src="img/favicon.png" alt="flavico" /></Link>
        <Link to="/" className="home-link">Playfab</Link>
      </div>
      <div id="top-bar-right">{props.auth ? UserNavigation() : SignButtons()}</div>
      {/* <FlashMessage /> */}
    </header>
  );
}

export default TopBar;
