// 3rd party components
import { useContext, useState, useEffect, useRef } from 'react';
import { useLink, useNavigate } from 'react-router-dom';
// custom style components
import './settings-username.css';
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


const SettingsUsernamePage = () => {
  // objects based on custom functions components
  const validator = new Validator();
  // useContext constans
  const server = useContext(ServerContext);
  const flash = useContext(FlashMessageContext);
  // useNavigate constans
  const navigate = useNavigate();
  // useRef constans
  const formError = useRef();
  // useState constans for user authentication on page
  const [isUserAuthenticated, setUserAuthenticationStatus] = useState(false);
  const [user, setUser] = useState({});
  // useState constans for user actions on page
  const [newUsername, setNewUsername] = useState('');
  const [usernamePayment, setUsernamePayment] = useState(false);

  useEffect(() => {
    
    const session = JSON.parse(localStorage.getItem('session'));

    const token = session ? session.token : '';
   
    const xhr = new XMLHttpRequest();      
        
    xhr.onerror = () => console.log('SettingsUsernamePage: POST Server not responding.');
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

  const usernameValidation = (value) => {
    if (value.length >= 3 && value.length <= 24 && validator.alphanumeric(value)) {
      validator.uniqueness(server.domain + server.authenticationFindUser + '?name=' + value)
      .then(result => {
        if (value && JSON.parse(result).userExists) {
          document.getElementById('user-name-uniqueness').style.color = '#7e7e7e';
          setNewUsername('');
        } else {
          document.getElementById('user-name-uniqueness').style.color = 'green';
          setNewUsername(value);
        }
      })
      .catch(error => console.log(error));
    }
  };

  const paymentCheckboxActions = (event) => {
    const paymentError = document.getElementById('payment-error');
    if (paymentError.style.display === 'block') {
      paymentError.textContent = '';
      paymentError.style.display = 'none';
    }
    if (event.target.checked) setUsernamePayment(true);
    else setUsernamePayment(false);
  };

  const submit = (event) => {
    
    event.preventDefault();
    
    const usernameError = document.getElementById('user-name-error');
    const paymentError = document.getElementById('payment-error');
    
    if (!newUsername) {
      usernameError.textContent = 'Username does not met requirements.';
      usernameError.style.display = 'block';
    }
    if (!usernamePayment) {
      paymentError.textContent = 'Please accept payment.';
      paymentError.style.display = 'block';
    }
    if (newUsername && usernamePayment) {
      const xhr = new XMLHttpRequest();   
        
      xhr.onerror = () => console.log('SettingsUsernamePage: POST Server not responding.');
      xhr.onload = () => {
        if (xhr.status === 200) {
          flash.add('success', 'Username updated successfully.');
          navigate('/settings');
        } else {
          console.log(xhr.responseText);
        }
      }
      xhr.open('PATCH', server.domain + server.userSetUsername);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send(`userId=${user.id}&newUsername=${newUsername}&payment=${usernamePayment}&gold=${user.gold - 100}`);
    };
  };
  
  return (
    <>
      <TopBar auth={isUserAuthenticated} user={user}/>

      <ul id="flash-messages-list">
        {flash.messages.map((message) => <FlashMessage type={message.type} text={message.text}/>)}
      </ul>
      
      <SettingsForm id="username" authentication={false}>

        <p id={'new-username-form-error'} className="form-error" ref={formError}></p>

        <p><b>1. Enter a new username:</b></p>
        <TextInput inputType="text" requirements={true} id="user-name" name="newUsername" placeholder="Username"
                   onInput={usernameValidation} />

        <p><b>2. Confirm payment:</b></p>
        {
          user.gold < 100
          ? <>
              <p style={{color: 'red'}}>You don't have enough gold.</p>
            </>
          : <>
              <p id="payment-error" className="input-error"></p>
              <p><input type="checkbox" id="username-payment" name="usernamePayment" value="100"
                        onChange={event => paymentCheckboxActions(event)} /> 100 gold</p>
              <input type="submit" id="username-form-submit-btn" className="form-submit-btn" name="usernameFormSubmitBtn" 
                     value="Update username" onClick={event => submit(event)} />
            </>
        }
      </SettingsForm>
    </>
  );
};

export default SettingsUsernamePage;