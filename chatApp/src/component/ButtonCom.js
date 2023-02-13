import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {rf, rh, rw} from '../utitils/dimensions.js';

export default function ButtonCom({text, onPress}) {
  return (
    <TouchableOpacity style={styles.body} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#007acc',
    width: '95%',
    borderRadius: 5,
    paddingHorizontal: rw(2),
    paddingVertical: rh(1),
    marginVertical: rh(1),
  },
  text: {
    fontSize: rf(3),
    textAlign: 'center',
    color: '#fff',
    fontWeight: '700',
  },
});
