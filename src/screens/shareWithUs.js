import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, Alert} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {MyHeader} from '../components/header';
import SelectDropdown from 'react-native-select-dropdown';
import {HomeCatgories} from '../services/MyApi';
import {useTranslation} from 'react-i18next';
import {t} from 'i18next';
import {ScaledSheet} from 'react-native-size-matters';

export function Share({navigation, route}) {
  const [t, i18n] = useTranslation();

  const [done, setDone] = useState({
    country: '',
    type: '',
    add1: '',
    add2: '',
    des: '',
    discount: '',
  });

  const mdata = route.params.map(item => {
    return i18n.language == 'ar' ? item.titleAR : item.titleEN;
  });
  console.log(done);

  function dropDown(text, country) {
    return (
      <SelectDropdown
        buttonStyle={{
          height: 40,
          backgroundColor: 'white',
          width: '100%',
          alignSelf: 'center',
        }}
        data={country ? [t('السعودية'), t('مصر'), t('الكويت')] : mdata}
        onSelect={(selectedItem, index) => {
          if (
            selectedItem == t('مصر') ||
            selectedItem == t('السعودية') ||
            selectedItem == t('الكويت')
          ) {
            setDone({
              ...done,
              country: selectedItem,
            });
          } else {
            setDone({
              ...done,
              type: selectedItem,
            });
          }
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem;
        }}
        renderCustomizedButtonChild={selectedItem => {
          return (
            <Text
              style={{
                marginLeft: 50,
                marginRight: 10,
                fontSize: 16,
                fontFamily: 'Cairo-Bold',
                color: 'black',
              }}>
              {selectedItem}
            </Text>
          );
        }}
        defaultButtonText={text}
        renderDropdownIcon={() => {
          return (
            <Entypo
              style={{position: 'absolute', right: 20}}
              name="chevron-down"
              color="#B70B0B"
              size={35}
            />
          );
        }}
        renderCustomizedRowChild={item => {
          return (
            <Text style={{fontFamily: 'Cairo-Bold', color: 'gray'}}>
              {' '}
              {item}{' '}
            </Text>
          );
        }}
      />
    );
  }

  return (
    <View style={{flex: 1}}>
      {MyHeader(t('شاركنا رأيك'), navigation, true)}

      <View style={styles.view1}>
        <View
          style={{
            flexDirection: 'row-reverse',
            marginTop: 15,
            marginBottom: 10,
          }}>
          {dropDown(t('اختر الدولة'), true)}
        </View>
        <View style={styles.view4} />
        <View style={styles.view3}>{dropDown(t('اختر الفئة'), false)}</View>
        <View style={styles.view4} />
        {inputes(t('العنوان'))}
        <View style={styles.view4} />

        {inputes('add2')}
        <View style={styles.view4} />

        {inputes(t('الوصف'))}
        <View style={styles.view4} />

        {inputes(t('كود الخصم'))}
        <View style={styles.view4} />
        <Text style={styles.text1}>{t('شروط الإضافة')}</Text>
        <Text style={styles.text2}>
          • {t('لاصحاب المتاجر الالكترونية الخاصة ولا يشمل مسوقي العمولة')}
        </Text>
        <Text style={styles.text2}>• {t('ان يكون كود الخصم فعال')}</Text>
        <Text style={styles.text2}>• {t('كود واحد للمتجر الخاص')}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          check(done);
        }}
        style={styles.button}>
        <Text style={styles.text3}>{t('إرسال')}</Text>
      </TouchableOpacity>
    </View>
  );
  function inputes(text) {
    return (
      <TextInput
        onChangeText={input => {
          switch (text) {
            case t('العنوان'):
              return setDone({
                ...done,
                add1: input,
              });
              break;
            case t('add2'):
              return setDone({
                ...done,
                add2: input,
              });
              break;
            case t('الوصف'):
              return setDone({
                ...done,
                des: input,
              });
              break;
            case t('كود الخصم'):
              return setDone({
                ...done,
                discount: input,
              });
          }
        }}
        placeholder={text == 'add2' ? t('العنوان') : text}
        style={styles.text4}
      />
    );
  }
}

function check(done) {
  function err() {
    switch ('') {
      case done.country:
        return t('اختر الدولة');
        break;
      case done.type:
        return t('اختر الفئة');
        break;
      case done.add1 && done.add2:
        return t('الرجاء اضافة العنوان');
        break;
      case done.des:
        return t('الرجاء اضافة الوصف');
        break;
      case done.discount:
        return t('الرجاء اضافة كود الخصم');
        break;
    }
  }
  if (
    done.country !== '' &&
    done.type !== '' &&
    done.add1 !== '' &&
    done.add2 !== '' &&
    done.des !== '' &&
    done.discount !== ''
  ) {
    Alert.alert(null, t('نجح'));
  } else {
    Alert.alert(t('خطأ فى التأكيد'), err());
  }
}
const styles = ScaledSheet.create({
  view1: {
    borderRadius: 15,
    backgroundColor: 'white',
    width: '90%',
    height: '70%',
    alignSelf: 'center',
    marginTop: 40,
    elevation: 5,
  },
  view3: {marginTop: 10, marginBottom: 10},
  view4: {
    alignSelf: 'center',
    borderColor: '#dbdad7',
    marginTop: 0,
    borderWidth: 1,
    width: '90%',
    height: 0,
  },
  text1: {
    fontFamily: 'Cairo-Bold',
    fontSize: 18,
    color: 'black',
    marginHorizontal: 20,
  },
  text2: {
    fontFamily: 'Cairo-Regular',
    color: 'black',
    fontSize: 16,
    marginHorizontal: 20,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 12,
    width: '90%',
    height: 50,
    backgroundColor: '#B70B0B',
    alignSelf: 'center',
  },
  text3: {fontSize: 22, fontFamily: 'Cairo-Bold', color: 'white'},
  text4: {
    alignSelf: 'flex-end',
    width: '85%',
    marginTop: 10,
    right: 20,
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
  },
});
