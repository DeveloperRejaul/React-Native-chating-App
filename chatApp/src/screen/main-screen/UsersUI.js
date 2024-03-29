import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {memo} from 'react';
import {rf, rh, rw} from '../../utitils/dimensions.js';
import imagePhat from '../../constent/imagePhat.js';
import {timeSince} from '../../utitils/timeDeference.js';

const UsersUI = ({ele, index, onPress, lastMessage}) => {
  timeSince();

  return (
    <TouchableOpacity onPress={onPress} key={index} style={styles.userBody}>
      <View style={styles.imageBody}>
        <Image
          defaultSource={imagePhat.profilePicture}
          source={imagePhat.profilePicture}
          style={styles.image}
        />
      </View>
      <Text style={styles.userName}>{ele.name}</Text>
      {lastMessage?.map((message, i) => (
        <>
          <Text>
            {message.receiverId === ele._id && message.lastMessage?.text}
          </Text>
          <Text>time</Text>
        </>
      ))}
    </TouchableOpacity>
  );
};

export default memo(UsersUI);

const styles = StyleSheet.create({
  userBody: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: rh(1),
  },
  imageBody: {
    height: rh(8),
    width: rh(8),
    overflow: 'hidden',
    borderRadius: 100,
    marginRight: rw(2),
  },
  image: {
    resizeMode: 'cover',
    height: '100%',
    width: '100%',
  },
  userName: {
    fontSize: rf(2),
    color: '#000',
  },
});
