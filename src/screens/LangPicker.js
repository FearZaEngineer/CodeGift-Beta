import React from 'react';
import {useState} from 'react';
import {TouchableOpacity, View, Text, Image} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Entypo from 'react-native-vector-icons/Entypo';
import {useTranslation} from 'react-i18next';
import RNRestart from 'react-native-restart';
import {ScaledSheet} from 'react-native-size-matters';

export function LangPicker({navigation}) {
  const [t, i18n] = useTranslation();
  const [lang, setLang] = useState();
  return (
    <View>
      <Image
        source={require('../assets/images/logo2.png')}
        style={styles.image}
      />
      <Text style={styles.text}>{t('اختر لغة التطبيق')}</Text>
      <SelectDropdown
        buttonStyle={{
          borderRadius: 10,
          elevation: 5,
          marginTop: 30,
          backgroundColor: 'white',
          width: '80%',
          alignSelf: 'center',
        }}
        data={['العربية', 'English']}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          setLang(selectedItem);
          return selectedItem;
        }}
        rowTextStyle={{fontSize: 18, fontFamily: 'Cairo-Bold', color: 'gray'}}
        renderDropdownIcon={() => {
          return (
            <Entypo
              style={{right: 10, position: 'absolute'}}
              name="chevron-down"
              color="#B70B0B"
              size={30}
            />
          );
        }}
        renderCustomizedButtonChild={selectedItem => {
          return (
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 22,
                fontFamily: 'Cairo-Regular',
                fontWeight: 'bold',
                color: 'gray',
              }}>
              {selectedItem}
            </Text>
          );
        }}
        defaultButtonText={t('إختر اللغة')}
      />
      <TouchableOpacity
        onPress={() => {
          if (lang == 'English') {
            i18n.changeLanguage('en');
          }

          if (lang == 'العربية') {
            i18n.changeLanguage('ar');
          }

          navigation.navigate('drawer');
        }}
        style={styles.button}>
        <Text style={styles.buttonText}>{t('موافق')}</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = ScaledSheet.create({
  image: {
    resizeMode: 'contain',
    width: 180,
    height: 180,
    alignSelf: 'center',
    marginTop: 80,
  },
  text: {
    marginTop: 100,
    alignSelf: 'center',
    fontSize: 22,
    fontFamily: 'Cairo-Regular',
    color: 'gray',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 90,
    elevation: 5,
    backgroundColor: '#B70B0B',
    height: 50,
    width: '80%',
    alignSelf: 'center',
  },
  buttonText: {fontSize: 17, fontFamily: 'Cairo-Bold', color: 'white'},
});
