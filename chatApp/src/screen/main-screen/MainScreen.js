import {StyleSheet, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import HeaderCom from '../../component/HeaderCom.js';
import UsersUI from './component/UsersUI.js';
import websocket from '../../socket/socketio.service.js';
import useApi from '../../api/useApi.js';
import appInfo from '../../constent/appInfo.js';

export default function MainScreen({navigation}) {
  const [userData, setuserData] = useState([]);
  const {data, getData, status} = useApi();
  useEffect(() => {
    getData(appInfo.getAlluserUrl);
    websocket.InitializeSocket();
    websocket.emit('send-message', 'hello server');
    websocket.on('send-data-from-server', data => {
      console.log(data);
    });
  }, []);

  useEffect(() => {
    if (status === 200) {
      setuserData([...data.users]);
    }
  }, [data]);

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
