import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native';
import {rf, rh, rw} from '../utitils/dimensions.js';

export default function InputCom({lable, placeholder, value, onChangeText}) {
  return (
    <View style={styles.container}>
      <Text style={styles.lable}>{lable}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    width: '100%',
    borderRadius: 5,
    padding: 0,
    fontSize: rf(2),
    paddingVertical: rh(1),
    paddingHorizontal: rw(2),
    color: '#000',
  },
  lable: {
    textAlign: 'left',
    fontSize: rf(2),
    color: '#323232',
  },
  container: {
    width: '95%',
    marginVertical: rh(1),
  },
});
