// 3rd party components
import { useContext } from 'react';
import { Link } from 'react-router-dom';
// custom layouts components
import FlashMessage from './flash-message';
// custom components
import FlashMessageContext from '../../store/flash-message-context';
// custom style components
import './game-layout.css';


const GameLayout = (props) => {

  const flash = useContext(FlashMessageContext);

  return (
    <>
      <header id="top-bar">
  
        <div id="top-bar-left">
          <Link to="/" className="img-home-link"><img src="/img/favicon.png" alt="flavico" /></Link>
          <Link to="/" className="home-link">Playfab</Link>
        </div>

        <div id="top-bar-right">
          <div id="user-navigation">
          {
            props.authentication && <>
              <img src={'/img/profile-avatars/' + props.user.avatar + '.jpg'} alt="profile avatar" className="profile-avatar"></img>

              <a id="dropdown-toggle">{props.user.name}</a>
            </>
          }
          </div>
        </div>

      </header>

      <ul id="flash-messages-list">
        {flash.messages.map((message, index) => <FlashMessage key={index} type={message.type} text={message.text}/>)}
      </ul>

      <div id="page-content">
        {props.children}
      </div>
    </>
  );
};

export default GameLayout;