import React from 'react';
import ChatUI from '../../screen/main-screen/component/ChatUI.js';
import MainScreen from '../../screen/main-screen/MainScreen.js';

export default function MainStack(Stack) {
  return (
    <>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="ChatUI" component={ChatUI} />
    </>
  );
}
