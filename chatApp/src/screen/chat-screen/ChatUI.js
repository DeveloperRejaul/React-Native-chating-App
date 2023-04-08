import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import HeaderCom from '../../component/HeaderCom.js';
import SmsContent from './SmsContent.js';
import {rf, rh, rw} from '../../utitils/dimensions.js';
import {useDispatch, useSelector} from 'react-redux';
import appInfo from '../../constent/appInfo.js';
import websocket from '../../socket/socketio.service.js';
import {useNavigation} from '@react-navigation/native';

export default function ChatUI({route}) {
  const [userData, setUserData] = useState([]);
  const [receivedSMS, setReceivedSMS] = useState([]);
  const [message, setMessage] = useState('');

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const userId = useSelector(state => state.auth.userId);
  const roomId = useSelector(state => state.chat.roomId);

  // get all message when first time component render
  useEffect(() => {
    getAllMessage();
  }, []);

  const getAllMessage = () => {
    fetch(`${appInfo.url}/api/message/${roomId}`)
      .then(res => res.json())
      .then(res => {
        const messages = res.allMessage.messages.reverse();
        setUserData([...messages]);
      })
      .catch(error => console.log(error));
  };

  // handle chatting message
  const handleMessage = () => {
    fetch(`${appInfo.url}/api/message/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        text: message,
        sender: userId,
        chatRoom: roomId,
      }),
    }).then(res => console.log(res));

    setUserData([{text: message, sender: userId}, ...userData]);
    websocket.emit('sendMessage', roomId, message);

    setMessage('');
  };

  websocket.on('receiveMessage', message => {
    setUserData([{text: message, sender: receiver}, ...userData]);
  });

  console.log(userData);

  return (
    <>
      <HeaderCom text={'ChatUi'} onPress={() => navigation.goBack()} back />
      <View style={styles.container}>
        <FlatList
          data={userData}
          renderItem={({item, index}) => (
            <SmsContent key={Math.random()} {...{item, index, userId}} />
          )}
          inverted
        />

        <View style={styles.inputBudy}>
          <TextInput
            style={styles.TextInput}
            value={message}
            onChangeText={setMessage}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleMessage}>
            <Text style={styles.btnText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: rh(0.3),
  },
  FlatListContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  inputBudy: {
    flexDirection: 'row',
  },
  TextInput: {
    borderWidth: 1,
    width: '80%',
    borderRadius: 10,
    paddingHorizontal: rw(5),
    paddingVertical: rh(1),
    marginBottom: rh(1),
    borderColor: 'blue',
    fontSize: rf(2),
    backgroundColor: '#fff',
  },
  sendButton: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: rf(2.3),
    fontWeight: '700',
    color: 'blue',
  },
});
