import React from 'react';
import HomeScreen from '../../screen/home-screen/HomeScreen.js';
import Login from '../../screen/login/Login.js';
import Signin from '../../screen/signin/Signin.js';
export default AuthStack = (Stack) => {
  return (
    <>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="signUp" component={Signin} />
      <Stack.Screen name="login" component={Login} />
    </>
  );
};
