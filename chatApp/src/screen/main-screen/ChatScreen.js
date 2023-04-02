import {StyleSheet, View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import HeaderCom from '../../component/HeaderCom.js';
import UsersUI from './component/UsersUI.js';
import websocket from '../../socket/socketio.service.js';
import useApi from '../../api/useApi.js';
import appInfo from '../../constent/appInfo.js';
import {useSelector, useDispatch} from 'react-redux';
import {logOut} from '../../redux/features/AuthSlice.js';
import {Alert} from 'native-base';
import {handleOneByOneChat} from '../../redux/features/oneByOneChatSlice.js';

export default function ChatScreen({navigation}) {
  const [userData, setuserData] = useState([]);
  const [roomId, setRoomId] = useState('');
  const {data, getData, status, postData} = useApi();
  const dispatch = useDispatch();
  const myEmail = useSelector(state => state.auth.email);
  const myId = useSelector(state => state.auth.userId);

  useEffect(() => {
    getData(appInfo.getAlluserUrl);
    websocket.InitializeSocket();
    websocket.emit('send-message', 'hello server');
    websocket.on('send-data-from-server', data => {
      console.log(data);
    });
  }, []);

  const handleUserData = () => {
    const newUser = data.users.filter(data => data.email != myEmail);
    setuserData([...newUser]);
  };

  useEffect(() => {
    if (status === 200) {
      handleUserData();
    }
  }, [data]);

  const handleChat = async ele => {
    const receiverId = ele._id;

    // create one by one Room
    await fetch(`${appInfo.url}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        userId: myId,
        otherUserId: receiverId,
      }),
    })
      .then(res => {
        if (!res.ok) {
          Alert.alert('Room Not Created');
        } else {
          return res.json();
        }
      })
      .then(res => {
        setRoomId(res._id);
        dispatch(handleOneByOneChat({userInfo: ele, roomId: res._id}));
      });

    websocket.emit('joinRoom', roomId, res => {
      console.log(res);
    });
    navigation.navigate('ChatUI');
  };

  return (
    <>
      <HeaderCom text={'Your Messanger'} />
      <View style={styles.container}>
        {userData.map((ele, index) => (
          <UsersUI
            onPress={() => handleChat(ele)}
            key={index}
            {...{ele, index}}
          />
        ))}

        <Text onPress={() => dispatch(logOut())}>LogOut</Text>
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
