import React, {useState, useEffect} from 'react';
import {View, Text, StatusBar, TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {MyHeader} from '../components/header';
import Accordion from 'react-native-collapsible/Accordion';
import {Questions} from '../services/MyApi';
import {useTranslation} from 'react-i18next';
import {ScaledSheet} from 'react-native-size-matters';

export function CommQ({navigation}) {
  const [t, i18n] = useTranslation();

  const _renderHeader = section => {
    return (
      <>
        <View style={styles.rview1}>
          <Text style={styles.rtext}>
            {i18n.language == 'ar' ? section.questionAr : section.questionEn}
          </Text>
          <View style={styles.rview2}>
            <Entypo name="chevron-down" color={'#B70B0B'} size={32} />
          </View>
        </View>
        <View style={styles.rview3} />
      </>
    );
  };

  const _renderContent = section => {
    return (
      <View style={styles.main}>
        <Text style={styles.text}>
          {i18n.language == 'ar' ? section.answerAr : section.answerEn}
        </Text>
      </View>
    );
  };

  const _updateSections = activeSections => {
    setActiveSections(activeSections);
  };

  const [sections, setSections] = useState([]);
  const [activeSections, setActiveSections] = useState([]);
  useEffect(() => {
    {
      Questions(res => {
        setSections(res);
      });
    }
  }, []);

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      {MyHeader(t('الإسئلة الشائعة'), navigation)}
      <Accordion
        sections={sections}
        activeSections={activeSections}
        underlayColor={'#0000'}
        renderHeader={_renderHeader}
        renderContent={_renderContent}
        onChange={_updateSections}
      />

      <View style={{marginTop: 10, margin: 18}}>
        <StatusBar backgroundColor={'#B70B0B'} barStyle="dark-content" />
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  //_renderHeader
  rview1: {
    marginHorizontal: 22,
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  rview2: {position: 'absolute', right: 10},
  rview3: {
    height: 1,
    backgroundColor: '#dbdad7',
    width: '90%',
    alignSelf: 'center',
  },
  rtext: {
    color: 'black',
    marginVertical: 20,
    fontFamily: 'Cairo-Bold',
    fontSize: 18,
  },
  //_renderContent
  main: {
    alignItems: 'flex-end',
    backgroundColor: '#F8E8E8',
    width: '90%',
    alignSelf: 'center',
  },
  text: {
    right: 20,
    color: 'gray',
    marginVertical: 10,
    fontFamily: 'Cairo-Bold',
    fontSize: 14,
  },
});
