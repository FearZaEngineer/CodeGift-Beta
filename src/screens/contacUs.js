import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {MyHeader} from '../components/header';
import {useTranslation} from 'react-i18next';

import {getSettings} from '../services/MyApi';
import {useEffect} from 'react';
import {baseProps} from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';
import {ScaledSheet} from 'react-native-size-matters';

export function ContactUs({navigation}) {
  const [t, i18n] = useTranslation();

  function CreatIcon(iconName, header, fontAwesome, type, imgName, textValue) {
    if (type == 'icon') {
      return (
        <>
          <View style={styles.cview1}>
            <Text style={styles.ctext1}>{textValue}</Text>
            <Text style={styles.ctext2}>{header}</Text>

            <View style={styles.cview2}>
              {fontAwesome ? (
                <Icon2 name={iconName} color="#B70B0B" size={22} />
              ) : (
                <Icon name={iconName} color="#B70B0B" size={22} />
              )}
            </View>
          </View>
        </>
      );
    }
    const images = {
      twitter: require('../assets/images/twitter.png'),
      instagram: require('../assets/images/instagram.png'),
      facebook: require('../assets/images/facebook.png'),
    };

    return (
      <View style={styles.cview3}>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(url[imgName]);
          }}
          style={{
            marginRight: 10,
            backgroundColor: '#F2D3D3',
            justifyContent: 'center',
            alignItems: 'center',
            width: 40,
            height: 40,
            borderRadius: 40 / 2,
          }}>
          <Image style={styles.cimgae} source={images[imgName]} />
        </TouchableOpacity>
      </View>
    );
  }
  useEffect(() => {
    getSettings(res => {
      setUrl({
        twitter: res.setting[2].value,
        instagram: res.setting[3].value,
        facebook: res.setting[4].value,
      });
    });
  }, []);
  const [url, setUrl] = useState([]);

  return (
    <>
      {MyHeader(t('تواصل معنا'), navigation)}
      <View style={styles.view1}>
        <StatusBar backgroundColor={'#B70B0B'} barStyle={'dark-content'} />
        <View style={styles.view2}>
          {CreatIcon(
            'local-post-office',
            t('البريد الإلكتروني'),
            null,
            'icon',
            null,
            'Support@CodeGift.com',
          )}
          {CreatIcon('call', t('رقم الجوال'), null, 'icon', null, '1234567')}
        </View>
        <View style={styles.view3}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('rateUs');
            }}
            style={{alignSelf: 'center', marginHorizontal: 10}}>
            <Entypo name="chevron-left" color={'#B70B0B'} size={32} />
          </TouchableOpacity>
          {CreatIcon('pencil', t('شاركنا رأيك'), true, 'icon')}
        </View>
        <View style={styles.view4}>
          <View style={styles.view5}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Cairo-Bold',
                color: '#707070',
              }}>
              {t('تابعونا على')}{' '}
            </Text>
          </View>
          <View style={styles.view6}>
            <Text
              style={{
                fontFamily: 'Cairo-Regular',
                textAlignVertical: 'center',
                position: 'absolute',
                left: 10,
                bottom: 10,
              }}>
              @CodeGift
            </Text>
            {CreatIcon(null, null, null, null, 'facebook')}
            {CreatIcon(null, null, null, null, 'twitter')}
            {CreatIcon(null, null, null, null, 'instagram')}
          </View>
        </View>
      </View>
    </>
  );
}

const styles = ScaledSheet.create({
  //CreatIcon function
  //in if
  cview1: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  ctext1: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
    textAlignVertical: 'center',
    position: 'absolute',
    left: 10,
    bottom: 10,
  },
  ctext2: {
    fontFamily: 'Cairo-Bold',
    margin: 10,
    fontSize: 16,
    color: '#707070',
  },
  cview2: {
    backgroundColor: '#F2D3D3',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
  },
  //out if
  cview3: {flexDirection: 'row', justifyContent: 'flex-end'},
  cimgae: {width: 25, height: 25},
  // main return
  view1: {
    alignItems: 'center',
    paddingTop: 100,
    backgroundColor: 'white',
    flex: 1,
  },
  view2: {
    paddingRight: 10,
    justifyContent: 'space-around',
    borderWidth: 2,
    width: '90%',
    height: 150,
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
    borderColor: '#CACACA',
  },
  view3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
    marginVertical: 20,
    borderWidth: 2,
    width: '90%',
    height: 80,
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
    borderColor: '#CACACA',
  },
  view4: {
    paddingRight: 10,
    justifyContent: 'space-around',
    borderWidth: 2,
    width: '90%',
    height: 120,
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
    borderColor: '#CACACA',
  },
  view5: {marginHorizontal: 5},
  view6: {flexDirection: 'row', justifyContent: 'flex-end'},
});
