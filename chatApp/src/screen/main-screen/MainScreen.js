import {StyleSheet, View, Text, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import HeaderCom from '../../component/HeaderCom.js';
import UsersUI from './UsersUI.js';
import websocket from '../../socket/socketio.service.js';
import useApi from '../../api/useApi.js';
import appInfo from '../../constent/appInfo.js';
import {useSelector, useDispatch} from 'react-redux';
import {logOut} from '../../redux/features/AuthSlice.js';
import {useNavigation} from '@react-navigation/native';
import {handleOneByOneChat} from '../../redux/features/chatSlice.js';

export default function MainScreen() {
  const [userData, setUserData] = useState([]);
  const [roomId, setRoomId] = useState(null);
  const [latestMessage, setLatestMessage] = useState([]);

  const {data, getData, status} = useApi();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const myEmail = useSelector(state => state.auth.email);
  const userId = useSelector(state => state.auth.userId);

  useEffect(() => {
    getData(appInfo.getAlluserUrl);
    websocket.InitializeSocket();
    websocket.emit('send-message', 'hello server');
    websocket.on('send-data-from-server', data => {
      console.log(data);
    });
    // get all latest message
    const getAllLatestMessage = async userId => {
      await fetch(`${appInfo.url}/api/message/lastMessage/${userId}`)
        .then(res => res.json())
        .then(res => {
          setLatestMessage([...res.lastMessagesInfo]);
        })
        .catch(error =>
          console.log('get all latest message: ' + error.message),
        );
    };

    getAllLatestMessage(userId);
  }, []);

  useEffect(() => {
    if (status === 200) {
      handleUserData();
    }
  }, [data]);

  // get all user
  const handleUserData = () => {
    const newUser = data.users.filter(data => data.email != myEmail);
    setUserData([...newUser]);
  };

  // handle creating chat rooms
  const handleChat = ele => {
    const receiverId = ele._id;

    // create one by one Room
    fetch(`${appInfo.url}/api/chat/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        userId: userId,
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
      })
      .then(() => {
        navigation.navigate('ChatUI', {
          receiverId: receiverId,
        });
        websocket.emit('joinRoom', roomId, res => {
          console.log(res);
        });
      });
  };

  return (
    <>
      <HeaderCom text={'Your Messanger'} />
      <View style={styles.container}>
        {userData.map((ele, index) => {
          return (
            <UsersUI
              onPress={() => handleChat(ele)}
              key={index}
              {...{ele, index, latestMessage}}
            />
          );
        })}

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
