import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import InputCom from '../../component/InputCom.js';
import ButtonCom from '../../component/ButtonCom.js';
import HeaderCom from '../../component/HeaderCom.js';
import useApi from '../../api/useApi.js';
import {useDispatch} from 'react-redux';
import {handleAuth} from '../../redux/features/AuthSlice.js';
import appInfo from '../../constent/appInfo.js';
export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {postData, status, loading} = useApi();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    await postData(appInfo.loginUserUrl, {
      email,
      password,
    });
    if (status === 200) {
      dispatch(handleAuth());
    }
  };

  return (
    <>
      <HeaderCom
        text={'Login'}
        onPress={() => navigation.goBack()}
        loading={loading}
      />
      <View style={styles.container}>
        <InputCom
          lable={'Email'}
          placeholder="Type Email"
          value={email}
          onChangeText={setEmail}
        />
        <InputCom
          lable={'Password'}
          placeholder="Type password"
          value={password}
          onChangeText={setPassword}
        />
        <ButtonCom text="Login" onPress={handleLogin} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
