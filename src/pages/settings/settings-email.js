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
  // useRef constans
  // const formError = useRef();
  // useState constans for user authentication on page
  const [isUserAuthenticated, setUserAuthenticationStatus] = useState(false);
  const [user, setUser] = useState({});
  // useState constans for user actions on page


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

  const emailValidation = (value) => {

  };

  const submit = (event) => {
    
    event.preventDefault();
    

  };
  
  return (
    <>
      <TopBar auth={isUserAuthenticated} user={user}/>

      <ul id="flash-messages-list">
        {flash.messages.map((message) => <FlashMessage type={message.type} text={message.text}/>)}
      </ul>
      
      <SettingsForm authentication={true} user={user}>

      </SettingsForm>
    </>
  );
};

export default SettingsEmailPage;