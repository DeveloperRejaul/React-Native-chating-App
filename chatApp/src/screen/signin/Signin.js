import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import InputCom from '../../component/InputCom.js';
import ButtonCom from '../../component/ButtonCom.js';
import {rf, rh, rw} from '../../utitils/dimensions.js';
import {launchImageLibrary} from 'react-native-image-picker';
import HeaderCom from '../../component/HeaderCom.js';
import useApi from '../../api/useApi.js';

export default function Signin({navigation}) {
  const [profileFileName, setProfileFileName] = useState('No file choose');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {data, postData, loading, error, status} = useApi();

  const handleSelectPhoto = async () => {
    const result = await launchImageLibrary({
      selectionLimit: 1,
      mediaType: 'photo',
    });
    const fileName = result.assets[0].fileName;
    setProfileFileName(fileName);
  };

  const handleSignin = async () => {
    await postData('http://172.30.144.1:3000/api/users', {
      name: name,
      email: email,
      password: confirmPassword,
    });
  };

  useEffect(() => {
    if (status === 200) {
      navigation.navigate('login');
    }
  }, [data]);

  return (
    <>
      <HeaderCom text="Sign Up" onPress={() => navigation.goBack()} />
      <View style={styles.container}>
        <InputCom
          lable={'Name'}
          placeholder="Type Name"
          value={name}
          onChangeText={setName}
        />
        <InputCom
          lable={'Email Address'}
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
        <InputCom
          lable={'Confirm Password'}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <View style={styles.profile}>
          <Text style={styles.lable}>Upload Your Profile</Text>
          <View style={styles.row}>
            <Text style={styles.fileBtn} onPress={handleSelectPhoto}>
              Choose file
            </Text>
            <Text style={styles.fileName}>{profileFileName}</Text>
          </View>
        </View>
        <ButtonCom text="Sign Up" onPress={handleSignin} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  profile: {width: '95%'},
  fileBtn: {
    backgroundColor: '#ddd',
    borderWidth: 1,
    color: '#000',
    padding: rw(0.7),
    paddingHorizontal: rh(1),
    borderRadius: 5,
    fontSize: rf(1.8),
  },
  fileName: {
    color: '#323232',
    marginLeft: rw(2),
    fontSize: rf(1.5),
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  lable: {
    textAlign: 'left',
    fontSize: rf(2),
    color: '#323232',
  },
});
