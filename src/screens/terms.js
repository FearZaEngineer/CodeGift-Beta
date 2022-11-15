import React from 'react';
import {View, Text} from 'react-native';
import {MyHeader} from '../components/header';
import {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {contentText} from '../services/MyApi';
import {ScaledSheet} from 'react-native-size-matters';

export function Terms({navigation}) {
  const [t, i18n] = useTranslation();
  const [text, setText] = useState('');
  useEffect(() => {
    contentText(res => {
      setText(res);
    });
  }, []);
  return (
    <View style={styles.view1}>
      {MyHeader(t('شروط وأحكام'), navigation)}

      <View style={styles.view2}>
        <Text style={styles.text}>
          {i18n.language == 'ar' ? text.termsAR : text.termsEN}
        </Text>
      </View>
    </View>
  );
}
const styles = ScaledSheet.create({
  view1: {backgroundColor: 'white', flex: 1},
  view2: {
    alignSelf: 'center',
    marginTop: 30,
    padding: 10,
    width: '90%',
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    borderColor: '#CACACA',
  },
  text: {
    marginHorizontal: 12,
    fontFamily: 'Cairo-Regular',
    color: '#1A2E35',
    fontSize: 16,
  },
});
