import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import fonts, { sizes } from '../../../../helper/fonts';

const TermsAndPrivacyText = props => {
  const { container } = styles;

  const [dataList] = useState(props.dataList);

  const { header, subHeader, subDefault } = styles;

  const renderTextBox = text => {
    return <Text style={header}>{text}</Text>;
  };

  const renderSubHeader = text => {
    return <Text style={subHeader}>{text}</Text>;
  };

  const renderDefault = text => {
    return <Text style={subDefault}>{text}</Text>;
  };

  return (
    <View style={[container, props.mainContain || {}]}>
      {dataList.map((obj, index) => {
        if (obj.type === 'header') {
          return <View key={index}>{renderTextBox(obj.text)}</View>;
        } else if (obj.type === 'subheader') {
          return <View key={index}>{renderSubHeader(obj.text)}</View>;
        } else if (obj.type === 'default') {
          return <View key={index}>{renderDefault(obj.text)}</View>;
        }
        return null;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: 16,
    fontSize: sizes.h6,
    fontFamily: fonts.fontRubikMedium,
  },
  subHeader: {
    marginBottom: 16,
    fontSize: 20,
    fontFamily: fonts.fontRubikMedium,
  },
  subDefault: {
    marginBottom: 16,
    fontSize: 16,
    fontFamily: fonts.fontRubikRegular,
    lineHeight: sizes.h12,
  },
});

export default TermsAndPrivacyText;
