import {StyleSheet, Text} from 'react-native';
import React, {memo} from 'react';
import {rf, rh, rw} from '../../../utitils/dimensions.js';

const SmsContent = ({item, index}) => {
  return (
    <Text
      key={Math.random()}
      style={[item.type === 'send' ? styles.send : styles.resive]}>
      {item.message}
    </Text>
  );
};
export default memo(SmsContent);
const styles = StyleSheet.create({
  resive: {
    textAlignVertical: 'center',
    backgroundColor: '#007acc',
    fontSize: rf(2),
    color: '#fff',
    alignSelf: 'flex-start',
    paddingHorizontal: rw(3),
    borderRadius: 14,
    borderBottomRightRadius: 2,
    fontWeight: '600',
    marginVertical: rh(0.3),
    paddingVertical: rh(0.5),
  },

  send: {
    textAlignVertical: 'center',
    backgroundColor: '#007acc',
    fontSize: rf(2),
    color: '#fff',
    alignSelf: 'flex-end',
    paddingHorizontal: rw(3),
    borderRadius: 14,
    borderBottomRightRadius: 2,
    fontWeight: '600',
    marginVertical: rh(0.3),
    paddingVertical: rh(0.5),
  },
});
