// 3rd party components
import { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// custom style components
import './settings.css';
// custom layouts components
import TopBar from "../../components/layout/top-bar";
import FlashMessage from '../../components/layout/flash-message';
import AvatarCheckbox from '../../components/form/auth-checkbox-input';
// custom components
import ServerContext from '../../store/server-context';


const SettingsPage = () => {

  const server = useContext(ServerContext);
  
  const navigate = useNavigate();

  const menu = useRef();

  const [isUserAuthenticated, setUserAuthenticationStatus] = useState(false);
  const [user, setUser] = useState({});
  const [isNameUpdateAvailable, setNameUpdateAvailability] = useState(false);
  const [flashMessage, setFlashMessage] = useState({active: false, type: '', text: ''});

  useEffect(() => {

    const timestamp = Math.floor(new Date().getTime() / 1000);
    
    const session = JSON.parse(localStorage.getItem('session'));

    const token = session ? session.token : '';
   
    const xhr = new XMLHttpRequest();      
        
    xhr.onerror = () => console.log('SettingsPage: POST Server not responding.');
    xhr.onload = () => {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        if (timestamp > data.nameUpdate) setNameUpdateAvailability(true);
        setUserAuthenticationStatus(true);
        setUser(data);
      } else {
        localStorage.removeItem('session');
        setUserAuthenticationStatus(false);
        navigate('/login');
      }
    }
    xhr.open('POST', server.domain + server.userGet);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    xhr.send();
  }, [user.avatar]);

  const setAvatar = (value) => {

    const xhr = new XMLHttpRequest();      
        
    xhr.onerror = () => console.log('Avatar: POST Server not responding.');
    xhr.onload = () => {
      if (xhr.status === 200) {
        user.avatar = value;
        setFlashMessage({active: true, type: 'success', text: 'Avatar updated successfully.'});
      } else setFlashMessage({active: true, type: 'error', text: xhr.responseText});
    }
    xhr.open('POST', server.domain + server.userSetAvatar);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(`userId=${user.id}&userAvatar=${value}`);
  };

  return (
    <>
      <TopBar auth={isUserAuthenticated} user={user}/>

      {flashMessage.active && <FlashMessage type={flashMessage.type} text={flashMessage.text}/>}

      {/* <div id="page-content"> */}

        <section className="content" ref={menu}>

          <h1>ACCOUNT MENAGEMENT</h1>

          <div className="left-content">
            
            {/* user personal avatar */}
            <div className="info-personal-avatar">
              <img src={'img/profile-avatars/' + user.avatar + '.jpg'} alt="profile avatar"></img>
            </div>

            <AvatarCheckbox className="settings-avatar" isInputHidden={true} onClick={setAvatar} />

          </div>

          <div className="right-content">

            <div className="info-personal">
              <div className="info-personal-user">
                {/* Username section */}
                <div className="info-personal-wrapper username">
                  <div className="info-cell-icon">
                    <img src="img/settings-icons/id-card.png" alt="info-cell-icon"></img>
                  </div>
                  <div className="info-cell-value">
                    <h3>{user.name}</h3>
                  </div>
                  <div className="info-cell-edit">
                    <Link to="/settings/username" className={isNameUpdateAvailable ? '' : 'disabled'}><p>Change</p></Link>
                  </div>
                  {
                    !isNameUpdateAvailable && 
                    <p className="info-personal-wrapper-message">
                      Next update will be available on {new Date(user.nameUpdate * 1000 + 3600000 * 24 * 14).toDateString()}.
                    </p>
                  }
                  <div style={{clear: 'both'}}></div>
                </div>
                {/* User location section */}
                <div className="info-personal-wrapper location">
                  <div className="info-cell-icon">
                    <img src="img/settings-icons/globe.png" alt="info-cell-icon"></img>
                  </div>
                  <div className="info-cell-value">
                    <p id="user-location">Place of residance: </p><p id="user-location-info"></p>
                  </div>
                  <div className="info-cell-edit">
                  </div>
                  <div style={{clear: 'both'}}></div>
                </div>
              </div>

              <div className="info-personal-security">
                <h3>Account Security Settings</h3>
                {/* User email section */}
                <div className="info-personal-wrapper email">
                  <div className="info-cell-icon">
                    <img src="img/settings-icons/email.png" alt="info-cell-icon"></img>
                  </div>
                  <div className="info-cell-value">
                    <p id="p-email"><b>{user.email}</b></p>
                    <p id="p-date">Email address added: {new Date(user.emailUpdate * 1000).toDateString()}</p>
                  </div>
                  <div className="info-cell-edit">
                    <Link to="/settings-email"><p>Change</p></Link>
                  </div>
                  <div style={{clear: 'both'}}></div>
                </div>
                {/* User password section */}
                <div className="info-personal-wrapper">
                  <div className="info-cell-icon">
                    <img src="img/settings-icons/lock.png" alt="info-cell-icon"></img>
                  </div>
                  <div className="info-cell-value">
                    <p>Password added: {new Date(user.passUpdate * 1000).toDateString()}</p>
                  </div>
                  <div className="info-cell-edit">
                    <Link to="/settings-password"><p>Change</p></Link>
                  </div>
                  <div style={{clear: 'both'}}></div>
                </div>
              </div>

              <div className="info-personal-data">
                <h3>Data Protection</h3>
                {/* User delete section */}
                <div className="info-personal-wrapper data">
                  <div className="info-cell-icon">
                    <img src="img/settings-icons/user.png" alt="info-cell-icon"></img>
                  </div>
                  <div className="info-cell-value">
                    <p>Delete <b>{user.name}</b> user account</p>
                  </div>
                  <div className="info-cell-edit">
                    <Link to="/profile-delete"><button>Delete account</button></Link>
                  </div>
                  <div style={{clear: 'both'}}></div>
                </div>
              </div>
            </div>
          </div>

          <div style={{clear: 'both'}}></div>

        </section>

      {/* </div> */}
    </>
  );
};

export default SettingsPage;