// custom style components
import './flash-message.css';


const FlashMessage = (props) => {
  return (
    <div className="flash-message">
      {props.type === 'success' && <div className="message-success">{props.text}</div>}
      {props.type === 'error' && <div className="message-error">{props.text}</div>}
    </div>
  );
};

export default FlashMessage;
