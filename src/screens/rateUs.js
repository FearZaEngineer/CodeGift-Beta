import React from 'react';
import {View, Text, TouchableOpacity, TextInput, Alert} from 'react-native';
import {MyHeader} from '../components/header';
import SelectDropdown from 'react-native-select-dropdown';
import Entypo from 'react-native-vector-icons/Entypo';
import {useState} from 'react';
import {ScaledSheet} from 'react-native-size-matters';

import {useTranslation} from 'react-i18next';

export function RateUs({navigation}) {
  const [t, i18n] = useTranslation();

  const [done, setDone] = useState({
    type: '',
    name: '',
    email: '',
    message: '',
  });
  console.log(done);

  return (
    <View style={{flex: 1}}>
      <View>
        {MyHeader(t('شاركنا رأيك'), navigation, true)}
        <View>
          <SelectDropdown
            buttonStyle={{
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#CACACA',
              marginTop: 50,
              backgroundColor: '#F6F6F6',
              width: '90%',
              alignSelf: 'center',
            }}
            data={[t('شكوى'), t('إقتراح')]}
            onSelect={(selectedItem, index) => {
              setDone({
                ...done,
                type: selectedItem,
              });
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextStyle={{
              fontSize: 18,
              fontFamily: 'Cairo-Bold',
              color: 'gray',
            }}
            renderDropdownIcon={() => {
              return (
                <Entypo
                  style={{right: 5, position: 'absolute'}}
                  name="chevron-down"
                  color="#B70B0B"
                  size={30}
                />
              );
            }}
            renderCustomizedButtonChild={selectedItem => {
              return (
                <View style={{marginHorizontal: 25}}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'Cairo-Bold',
                      color: 'gray',
                    }}>
                    {selectedItem}
                  </Text>
                </View>
              );
            }}
            renderCustomizedRowChild={selectedItem => {
              return (
                <View style={{marginHorizontal: 20}}>
                  <Text
                    style={{
                      right: 10,
                      fontSize: 16,
                      fontFamily: 'Cairo-Bold',
                      color: 'gray',
                    }}>
                    {selectedItem}
                  </Text>
                </View>
              );
            }}
            defaultButtonText={t('شاركنا رأيك')}
          />
        </View>
        <View style={styles.view}>
          <TextInput
            onChangeText={text => {
              setDone({
                ...done,
                name: text,
              });
            }}
            placeholderTextColor={'#CACACA'}
            placeholder={t('الإسم')}
            style={styles.textinpute1}
          />
          <TextInput
            onChangeText={text => {
              setDone({
                ...done,
                email: text,
              });
            }}
            placeholderTextColor={'#CACACA'}
            placeholder={t('البريد الإلكتروني')}
            style={styles.textinpute1}
          />
          <TextInput
            onChangeText={text => {
              setDone({
                ...done,
                message: text,
              });
            }}
            placeholderTextColor={'#CACACA'}
            placeholder={t('الوصف')}
            style={[styles.textinpute1, {height: 100}]}
          />
          <TouchableOpacity
            onPress={() => {
              function err() {
                switch ('') {
                  case done.type:
                    return t('اختر نوع الشكوى أو الاقتراح');
                    break;
                  case done.name:
                    return t('الرجاء إضافة الاسم الكامل');
                    break;
                  case done.email:
                    return t('الرجاء إضافة بريد إلكتروني صالح');
                    break;
                  case done.message:
                    return t('الرجاء إضافة الرسالة');
                    break;
                }
              }
              if (
                done.email !== '' &&
                done.name !== '' &&
                done.type !== '' &&
                done.message !== ''
              ) {
                alert(t('نجح'));
              } else {
                Alert.alert(t('خطأ فى التأكيد'), err());
              }
            }}
            style={{
              marginTop: 30,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#B70B0B',
              height: 50,
              borderRadius: 10,
              width: '90%',
            }}>
            <Text
              style={{fontFamily: 'Cairo-Bold', fontSize: 20, color: 'white'}}>
              {t('إرسال')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = ScaledSheet.create({
  view: {
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CACACA',
    height: 400,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  textinpute1: {
    marginTop: 25,
    marginVertical: 8,
    borderColor: '#CACACA',
    height: 60,
    fontSize: 15,
    fontFamily: 'Cairo-Bold',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    borderWidth: 1,
    width: '90%',
    borderRadius: 10,
  },
});
