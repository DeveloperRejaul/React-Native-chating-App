import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store} from '../../redux/store/store.js';
import {persistStore} from 'redux-persist';
import AuthRoute from './AuthRoute.js';
import HomeScreen from '../../screen/home-screen/HomeScreen.js';

function Route() {
  const persiStore = persistStore(store);
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persiStore}>
        <NavigationContainer>
          <AuthRoute Stack={Stack} />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
export default Route;
