import {StyleSheet, View} from 'react-native';
import React from 'react';
import ChatUI from './ChatUI';
import {LastMessageProvider} from '../../context/LastMessageContext';

export default function ChatUiIndex({route}) {
  return (
    <LastMessageProvider>
      <ChatUI route={route} />
    </LastMessageProvider>
  );
}

const styles = StyleSheet.create({});
