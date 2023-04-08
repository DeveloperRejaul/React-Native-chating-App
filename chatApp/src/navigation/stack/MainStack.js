import React from 'react';
import ChatUI from '../../screen/chat-screen/index.js';
import MainScreen from '../../screen/main-screen/index.js';

export default function MainStack(Stack) {
  return (
    <>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="ChatUI" component={ChatUI} />
    </>
  );
}
