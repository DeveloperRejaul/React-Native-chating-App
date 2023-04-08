import {StyleSheet} from 'react-native';
import React from 'react';
import MainScreen from './MainScreen';
import {LastMessageProvider} from '../../context/LastMessageContext';

export default function MainScreenIndex() {
  return (
    <LastMessageProvider>
      <MainScreen />
    </LastMessageProvider>
  );
}

const styles = StyleSheet.create({});
