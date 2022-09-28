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
        if (time < 8) return time + 1;
        else message.current.remove(); 
      });
    }, 1000);
  }, [time]);
  
  return (
    <div id="flash-message" ref={message}>
      <div id={'message-' + props.type}>{props.text}</div>
    </div>
  );
};

export default FlashMessage;
