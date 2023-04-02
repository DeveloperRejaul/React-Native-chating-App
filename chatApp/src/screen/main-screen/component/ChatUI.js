import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import HeaderCom from '../../../component/HeaderCom.js';
import {ChatData} from '../../../utitils/data.js';
import SmsContent from './SmsContent.js';
import {rf, rh, rw} from '../../../utitils/dimensions.js';

export default function ChatUI({navigation}) {
  const [userData, setUserData] = useState(ChatData);
  const [message, setMessage] = useState('');

  const handleMessage = () => {
    setUserData([{message: message, type: 'send'}, ...userData]);
    setMessage('');
  };

  return (
    <>
      <HeaderCom text={'ChatUi'} onPress={() => navigation.goBack()} back />
      <View style={styles.container}>
        <FlatList
          data={userData}
          renderItem={({item, index}) => (
            <SmsContent key={Math.random()} {...{item, index}} />
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
