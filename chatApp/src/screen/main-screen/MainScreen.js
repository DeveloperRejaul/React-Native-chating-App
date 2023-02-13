import {StyleSheet, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import HeaderCom from '../../component/HeaderCom.js';
import userdata from '../../utitils/data.js';
import UsersUI from './component/UsersUI.js';
import useApi from '../../api/useApi.js';
import websocket from '../../socket/socketio.service.js';

export default function MainScreen({navigation}) {
  const [userData, setuserData] = useState([]);
  const {getData, data, status} = useApi();
  useEffect(() => {
    websocket.InitializeSocket();
  }, []);

  useEffect(() => {
    getData('http://172.30.144.1:3000/api/users');
  }, []);

  useEffect(() => {
    if (status === 200) {
      setuserData([...data.data]);
    }
  }, [data]);

  websocket.emit(('resive_message', () => {}));

  return (
    <>
      <HeaderCom text={'Your Messanger'} />
      <View style={styles.container}>
        {userData.map((ele, index) => (
          <UsersUI
            onPress={() =>
              navigation.navigate('ChatUI', {
                data: ele,
              })
            }
            key={index}
            {...{ele, index}}
          />
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
