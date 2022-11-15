import React from 'react';
import {Switch, View, Text, StatusBar, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {MyHeader} from '../components/header';
import {ScaledSheet} from 'react-native-size-matters';

import {useState} from 'react';

export function Settings({navigation}) {
  const [notifStatus, setNotifStatus] = useState(true);
  const [t, i18n] = useTranslation();

  return (
    <View style={styles.view1}>
      {MyHeader(t('الإعدادات'), navigation)}

      <View style={styles.view2}>
        <StatusBar backgroundColor={'#B70B0B'} barStyle="dark-content" />
        <View style={styles.view3}>
          <FontAwesome name="language" size={26} color={'#B70B0B'} />
          <Text style={styles.text1}>{t('اللغة')}</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('LangPicker');
            }}
            style={{position: 'absolute', right: 10}}>
            <View style={styles.view7}>
              <Text style={styles.text2}>
                {i18n.language == 'ar' ? 'العربية' : 'English'}
              </Text>
              <Entypo
                name={i18n.language == 'ar' ? 'chevron-left' : 'chevron-right'}
                color={'#B70B0B'}
                size={32}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.view4} />
        <View style={styles.view3}>
          <MaterialIcons name="notifications" size={26} color={'#B70B0B'} />
          <Text style={styles.text1}>{t('الإشعارات')}</Text>
          <Switch
            style={{position: 'absolute', right: 10}}
            value={notifStatus}
          />
        </View>
        <View style={styles.view4} />
      </View>
    </View>
  );
}
const styles = ScaledSheet.create({
  view1: {backgroundColor: 'white', flex: 1},
  view2: {marginTop: 30, margin: 18},
  view3: {flexDirection: 'row-reverse', alignItems: 'center'},
  view4: {height: 1, backgroundColor: '#dbdad7', width: '100%'}, // line
  view7: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text1: {
    color: 'black',
    marginHorizontal: 10,
    marginVertical: 20,
    fontFamily: 'Cairo-Bold',
    fontSize: 16,
  },
  text2: {color: 'gray', fontFamily: 'Cairo-Regualr', fontSize: 16},
});
