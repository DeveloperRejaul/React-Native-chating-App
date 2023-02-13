import {StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';
import {rf, rh, rw} from '../utitils/dimensions.js';

export default function HeaderCom({text, onPress}) {
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress}>
        <Text style={styles.back}>Back</Text>
      </Pressable>
      <Text style={styles.title}>{text}</Text>
      <Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: rh(5),
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: rw(2),
    backgroundColor: '#fff',
  },
  title: {
    color: '#000',
    fontSize: rf(2.5),
    fontWeight: '700',
  },
  back: {
    color: '#000',
    fontSize: rf(2),
  },
});
