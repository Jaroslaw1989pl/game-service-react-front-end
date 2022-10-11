// 3rd party components
import { useContext, useState, useEffect, useRef } from 'react';
import { useLink, useNavigate } from 'react-router-dom';
// custom style components
import './settings-delete.css';
// custom functions components
import Validator from '../../scripts/validator.class';
// custom layouts components
import TopBar from "../../components/layout/top-bar";
import FlashMessage from '../../components/layout/flash-message';
import SettingsForm from '../../components/layout/settings-form';
import TextInput from '../../components/form/auth-text-input';
// custom components
import ServerContext from '../../store/server-context';
import FlashMessageContext from '../../store/flash-message-context';


const SettingsDeleteUserPage = () => {
  // objects based on custom functions components
  const validator = new Validator();
  // useContext constans
  const server = useContext(ServerContext);
  const flash = useContext(FlashMessageContext);
  // useNavigate constans
  const navigate = useNavigate();
  // useState constans for user authentication on page
  const [isUserAuthenticated, setUserAuthenticationStatus] = useState(false);
  const [user, setUser] = useState({});
  // useState constans for user actions on page
  const [userPass, setUserPass] = useState('');

  useEffect(() => {
    
    const session = JSON.parse(localStorage.getItem('session'));

    const token = session ? session.token : '';
   
    const xhr = new XMLHttpRequest();      
        
    xhr.onerror = () => console.log('SettingsDeleteUserPage: POST Server not responding.');
    xhr.onload = () => {
      if (xhr.status === 200) {
        setUserAuthenticationStatus(true);
        setUser(JSON.parse(xhr.responseText));
      } else {
        localStorage.removeItem('session');
        setUserAuthenticationStatus(false);
        flash.add('error', xhr.responseText);
        navigate('/');
      }
    }
    xhr.open('POST', server.domain + server.userGet);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    xhr.send();
  }, []);

  const submit = (event) => {
    
    event.preventDefault();

    const userPassError = document.getElementById('user-pass-error');

    let isFormValid = true;

    // user password validation
    try {
      if (!userPass || userPass.length === 0) throw 'Please confirm your password.';
      else if (!validator.length(userPass, 8)) throw 'Incorrect password.';
      else if (!validator.upperLowerCase(userPass)) throw 'Incorrect password.';
      else if (!validator.numberSymbol(userPass)) throw 'Incorrect password.';
      else if (!validator.alphanumeric(userPass)) throw 'Incorrect password.';
    } catch (error) {
      userPassError.textContent = error;
      userPassError.style.display = 'block';
      isFormValid = false;
    }

    if (isFormValid) {
      const xhr = new XMLHttpRequest();   
      xhr.onerror = () => console.log('SettingsDeleteUserPage: POST Server not responding.');
      xhr.onload = () => {
        console.log(xhr.responseText);
        const response = JSON.parse(xhr.responseText);
        if (response.code === 200) {
          if (session) localStorage.clear();
          flash.add('success', 'Your user profile removed successfully.');
          navigate('/');
        } else {
          userPassError.textContent = response;
          userPassError.style.display = 'block';
        }
      }
      xhr.open('PATCH', server.domain + server.userDelete);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send(`userEmail=${user.email}&userPass=${userPass}`);
    }    
  };
  
  return (
    <>
      <TopBar auth={isUserAuthenticated} user={user}/>

      <ul id="flash-messages-list">
        {flash.messages.map((message) => <FlashMessage type={message.type} text={message.text}/>)}
      </ul>
      
      <SettingsForm id="delete" authentication={true} user={user} customData={submit}>
        {/* custom form */}
        <TextInput inputType="password" id="user-pass" name="userPass" placeholder="Confirm password" onInput={setUserPass} />
        <input type="submit" className="settings-form-submit-btn" value="Send form" onClick={event => submit(event)} />
      </SettingsForm>
    </>
  );
};

export default SettingsDeleteUserPage;