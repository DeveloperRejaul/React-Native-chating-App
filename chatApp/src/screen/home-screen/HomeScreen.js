import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import ButtonCom from '../../component/ButtonCom.js';

export default function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
      <ButtonCom
        text={'Sign Up'}
        onPress={() => navigation.navigate('signUp')}
      />
      <ButtonCom text={'Login'} onPress={() => navigation.navigate('login')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
