// 3rd party modules
import { createContext, useState } from "react";


const FlashMessageContext = createContext({
  messages: [],
  totalMessages: 0,
  add: (type, text) => {}
});

export const FlashMessageContextProvider = (props) => {

  const [messages, setMessages] = useState([]);

  const addMessageHendler = (type, text) => {
    setMessages(previousMessages => previousMessages.concat({type, text}));
  };

  const flash = {
    messages: messages,
    totalMessages: messages.length,
    add: addMessageHendler
  };

  return <FlashMessageContext.Provider value={flash}>{props.children}</FlashMessageContext.Provider>;
};

export default FlashMessageContext;