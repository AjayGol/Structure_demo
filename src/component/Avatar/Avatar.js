import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import fonts from '../../helper/fonts';

const Avatar = props => {
  const { profilePic, name, placeholder } = styles;
  const manageName = () => {
    const fullName = props.name.trim();
    let res = '';
    const nameArr = fullName.split(' ');
    if (nameArr.length === 1) {
      res = res + nameArr[0].charAt(0).toUpperCase();
    } else if (nameArr.length > 1) {
      res = res + nameArr[1].charAt(0).toUpperCase();
    }
    return res;
  };
  return (
    <>
      {props.imageUrl ? (
        <Image
          style={{
            ...profilePic,
            ...{
              width: props.length,
              height: props.length,
              borderRadius: props.length / 2,
            },
          }}
          source={{ uri: props.imageUrl }}
        />
      ) : (
        <View
          style={{
            ...placeholder,
            ...{
              width: props.length,
              height: props.length,
              borderRadius: props.length / 2,
            },
          }}>
          <Text style={name}>{manageName()}</Text>
        </View>
      )}
    </>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  profilePic: {
    marginRight: 8,
  },
  placeholder: {
    marginRight: 8,
    backgroundColor: '#C0C0C0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontFamily: fonts.fontRubikMedium,
    color: '#fff',
    fontSize: 14,
  },
});
