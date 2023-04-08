import React from 'react';
import {createContext, useContext, useEffect, useState} from 'react';
import appInfo from '../constent/appInfo';
import {useSelector} from 'react-redux';
const LastMessageContext = createContext({
  lastMessages: [],
  setLastMessages: pre => {},
  lastMessage: [{message: '', receiverId: ''}],
  setLastMessage: pre => {},
});

export function LastMessageProvider({children}) {
  const [lastMessages, setLastMessages] = useState([]);
  const [lastMessage, setLastMessage] = useState([
    {message: '', receiverId: ''},
  ]);
  const myId = useSelector(state => state.auth.userId);

  useEffect(() => {
    getLastMessage();
  }, [lastMessages]);

  // handle last messages
  const getLastMessage = async () => {
    const response = await fetch(
      `${appInfo.url}/api/message/lastMessage/${myId}`,
    );
    const message = await response.json();
    const lastMessages = message.lastMessagesInfo;
    setLastMessages([...lastMessages]);
  };

  return (
    <LastMessageContext.Provider
      value={{lastMessages, setLastMessages, lastMessage, setLastMessage}}>
      {children}
    </LastMessageContext.Provider>
  );
}

export const useLastMessageContext = () => useContext(LastMessageContext);
