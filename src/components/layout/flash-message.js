// 3rd party components
import { useContext, useState, useRef, useEffect } from 'react';
// custom style components
import './flash-message.css';
// custom components
import FlashMessageContext from '../../store/flash-message-context';


const FlashMessage = (props) => {

  const flash = useContext(FlashMessageContext);
  const message = useRef();
  
  useEffect(() => {
    setTimeout(() => {
      flash.remove();
    }, 5000);
  }, []);
  
  return (
    <li>
      <div id="flash-message">
        <div id={'message-' + props.type}>{props.text}</div>
      </div>
      <div style={{clear: 'both'}}></div>
    </li>
  );
};

export default FlashMessage;
