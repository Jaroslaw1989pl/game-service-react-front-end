// 3rd party components
import { useContext, useState, useEffect, useRef } from 'react';
import { useLink, useNavigate } from 'react-router-dom';
// custom style components
import './settings-email.css';
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


const SettingsEmailPage = () => {
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
  const [newEmail, setNewEmail] = useState('');
  const [userPass, setUserPass] = useState('');

  useEffect(() => {
    
    const session = JSON.parse(localStorage.getItem('session'));

    const token = session ? session.token : '';
   
    const xhr = new XMLHttpRequest();      
        
    xhr.onerror = () => console.log('SettingsEmailPage: POST Server not responding.');
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

    const newEmailError = document.getElementById('new-email-error');
    const userPassError = document.getElementById('user-pass-error');
    
    if (newEmail.length === 0) {
      newEmailError.textContent = 'Please enter new email address.';
      newEmailError.style.display = 'block';
    } else if (!validator.email(newEmail)) {
      newEmailError.textContent = 'Incorrect email address.';
      newEmailError.style.display = 'block';
    } else {
      if (userPass.length === 0) {
        userPassError.textContent = 'Please confirm your password.';
        userPassError.style.display = 'block';
      } else {
        validator.uniqueness(server.domain + server.authenticationFindUser + '?email=' + newEmail)
        .then(result => {
          if (JSON.parse(result).userExists) {
            newEmailError.textContent = 'Email address already in use.';
            newEmailError.style.display = 'block';
          } else {
            const xhr = new XMLHttpRequest();   
            xhr.onerror = () => console.log('SettingsNewEmailPage: POST Server not responding.');
            xhr.onload = () => {
              const response = JSON.parse(xhr.responseText);
              if (response.code === 200) {
                flash.add('success', 'Username updated successfully.');
                navigate('/settings');
              } else {
              }
            }
            xhr.open('PATCH', server.domain + server.userSetEmail);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(`userEmail=${user.email}&newEmail=${newEmail}&userPass=${userPass}`);
          }
        })
        .catch(error => console.log(error));
      }
    }
  };
  
  return (
    <>
      <TopBar auth={isUserAuthenticated} user={user}/>

      <ul id="flash-messages-list">
        {flash.messages.map((message) => <FlashMessage type={message.type} text={message.text}/>)}
      </ul>
      
      <SettingsForm id="email" authentication={true} user={user} customData={submit}>
        {/* custom form */}
        <TextInput inputType="text" id="new-email" name="newEmail" placeholder="Email address" onInput={setNewEmail} />
        <TextInput inputType="password" id="user-pass" name="userPass" placeholder="Confirm password" onInput={setUserPass} />
        <input type="submit" className="settings-form-submit-btn" value="Send form" onClick={event => submit(event)} />
      </SettingsForm>
    </>
  );
};

export default SettingsEmailPage;