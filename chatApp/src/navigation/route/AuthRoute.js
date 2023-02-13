import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import HomeScreen from '../../screen/home-screen/HomeScreen.js';
import AuthStack from '../stack/AuthStack.js';
import MainStack from '../stack/MainStack.js';
export default function AuthRoute({Stack}) {
  const [first, setfirst] = useState(false);
  const state = useSelector(state => state);

  console.log();

  const {auth} = state.auth;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      {auth ? <>{MainStack(Stack)}</> : <>{AuthStack(Stack)}</>}
    </Stack.Navigator>
  );
}
