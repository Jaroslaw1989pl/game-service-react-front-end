// 3rd party components
import { useState, useRef, useEffect } from 'react';
// custom style components
import './flash-message.css';


const FlashMessage = (props) => {

  const [time, setTime] = useState(0);
  const message = useRef();
  
  useEffect(() => {
    setTimeout(() => {
      setTime(time => {
        if (time < 5) return time + 1;
        else message.current.remove();
      });
    }, 1000);
  }, [time]);
  
  return (
    <li ref={message}>
      <div id="flash-message">
        <div id={'message-' + props.type}>{props.text}</div>
      </div>
      <div style={{clear: 'both'}}></div>
    </li>
  );
};

export default FlashMessage;
