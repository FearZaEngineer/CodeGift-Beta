import React from 'react';
import {useEffect, useState, useRef} from 'react';
import {
  ActivityIndicator,
  Share,
  Alert,
  Linking,
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  FlatList,
  ScrollView,
  SafeAreaView,
  TextInput,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import {MyHeader} from '../components/header';
import {
  getIntialOffers,
  getOffers,
  HomeCatgories,
  sliderImages,
} from '../services/MyApi';
import {SliderBox} from 'react-native-image-slider-box';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Clipboard from '@react-native-clipboard/clipboard';
import {useTranslation} from 'react-i18next';
import {ScaledSheet} from 'react-native-size-matters';

export function CatPage(props) {
  const onShare = async item => {
    try {
      const result = await Share.share({
        message: `${(i18n.language = 'ar'
          ? item.company.fullnameAR
          : item.company.fullnameEN)}\n ${(i18n.language = 'ar'
          ? item.titleAR
          : item.titleEn)}\n ${(i18n.language = 'ar'
          ? item.descriptionAR
          : item.descriptionEN)}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  console.log(props.route.params);
  function spiisficItems(item) {
    const catselection = offers.filter(it => {
      if (item.titleAR == 'الكل' || item.titleEN == 'All') {
        return true;
      }
      if (
        it.category.titleAR !== undefined ||
        it.category.titleEN !== undefined
      ) {
        return (
          it.category.titleAR == item.titleAR ||
          it.category.titleEN == item.titleEN
        );
      }
    });
    return catselection;
  }

  function deatils(item) {
    let LastTimeUsed;
    item !== null
      ? (LastTimeUsed = Math.round(
          Math.abs(new Date() - new Date(item.updatedAt)) / (1000 * 60 * 60),
        ))
      : null;

    return item !== null ? (
      <Modal visible={openModul ? true : false} transparent={true}>
        <View style={styles.dmain}>
          <View style={styles.dwrapper}>
            <View style={styles.dnestedwrapper}>
              <TouchableOpacity
                onPress={() => {
                  setOpenModul(false);
                }}
                style={styles.dbutton}>
                <MaterialIcons size={22} color={'#B70B0B'} name="close" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  onShare(item);
                }}
                style={styles.dbutton}>
                <MaterialIcons size={22} name="share" color={'#2B9CE8'} />
              </TouchableOpacity>
            </View>
            <View style={styles.dmain2}>
              <Image source={{uri: item.company.logo}} style={styles.dimage} />
            </View>
            <Text style={styles.dtext}>
              {i18n.language == 'ar'
                ? item.company.fullnameAR
                : item.company.fullnameEN}
            </Text>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(item.company.location);
              }}
              style={styles.dbutton1}>
              <Text style={styles.dtext1}>{t('رابط المتجر')}</Text>
              <Feather name={'external-link'} color={'#2B9CE8'} size={20} />
            </TouchableOpacity>
            <Text style={styles.ditext1}>{t('العرض')}</Text>
            <Text style={styles.ditext2}>{t('خصم')}</Text>
            <Text style={styles.ditext3}>{t('الوصف')}</Text>
            <Text style={styles.ditext4}>
              {i18n.language == 'ar' ? item.descriptionAR : item.descriptionEN}
            </Text>
            <View style={styles.ditext5}>
              <Text style={styles.ditext6}>
                {LastTimeUsed} {t('ساعة')}
              </Text>
              <Text style={styles.ditext7}>{t('اخر استعمال فعال منذ')}</Text>
            </View>
            <View style={styles.diwrapper}>
              <View style={styles.dview}>
                <View style={styles.dview1} />
              </View>
              <View style={styles.dview2} />
              <View style={styles.dview3} />
            </View>
            <View style={styles.dview4}>
              <TouchableOpacity
                onPress={() => {
                  Clipboard.setString(item.code);
                  Alert.alert(null, t('تم النسخ'));
                }}
                style={styles.dibutton}>
                <Text style={styles.dibuttonText}>{t('نسخ')}</Text>
              </TouchableOpacity>
              <View style={styles.diiText1}>
                <Text style={styles.diiText2}>{item.code}</Text>
              </View>
            </View>
          </View>
          <View style={styles.dlmain}>
            <TouchableOpacity
              onPress={() => {
                setOpenModul(false);
              }}
              style={styles.dlbutton}>
              <Text style={styles.dltext1}>{t('غير فعال')}</Text>
              <AntDesign name="dislike1" color="gray" size={22} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setOpenModul(false);
              }}
              style={styles.dlbutton}>
              <Text style={styles.dltext1}> {t('فعال')}</Text>
              <AntDesign name="like1" color="gray" size={22} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    ) : null;
  }

  function renderCats({item}) {
    return (
      <TouchableOpacity
        onPress={() => {
          setPressed2({
            id: item._id,
          });

          setSelectedCatOffer(spiisficItems(item));
        }}
        style={{
          borderRadius: 30,
          padding: 10,
          margin: 10,
          flex: 1,
          backgroundColor:
            item._id == pressed2.id ||
            item.titleAR == pressed2.titleAR ||
            item.titleEN == pressed2.titleEN
              ? '#B70B0B'
              : null,
        }}>
        <Text
          style={{
            fontSize: 18,
            fontFamily: 'Cairo-Bold',
            color:
              item._id == pressed2.id ||
              item.titleAR == pressed2.titleAR ||
              item.titleEN == pressed2.titleEN
                ? 'white'
                : '#B70B0B',
          }}>
          {i18n.language == 'ar' ? item.titleAR : item.titleEN}
        </Text>
      </TouchableOpacity>
    );
  }
  function renderItems({item}) {
    return (
      <TouchableOpacity
        onPress={() => {
          setOpenModul(true);
          setPressed(item);
        }}
        style={styles.rmain}>
        <View style={styles.rwrapper}>
          {item.company !== undefined ? (
            <View style={styles.rswrapper}>
              <Text style={styles.rtext}>
                {i18n.language == 'ar'
                  ? item.company.fullnameAR
                  : item.company.fullnameEN}
              </Text>
              <Text numberOfLines={1} style={styles.rtext2}>
                {i18n.language == 'ar'
                  ? item.descriptionAR
                  : item.descriptionEN}
              </Text>
              <View style={styles.riwrapper} />
            </View>
          ) : null}
          <View style={styles.rlwrapper}>
            {item.company !== undefined ? (
              <Image style={styles.rimgae} source={{uri: item.company.logo}} />
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  const [list, setList] = useState([
    {titleAR: 'الكل', titleEN: 'All', _id: '311254153'},
  ]);
  const [adimages, setAdimages] = useState([]);
  const [offers, setOffers] = useState([]);
  const [pressed, setPressed] = useState(null);
  const [openModul, setOpenModul] = useState(false);
  const [pressed2, setPressed2] = useState({});
  const [selectedCatOffer, setSelectedCatOffer] = useState();
  const [processed, setProcessed] = useState(true);
  const [t, i18n] = useTranslation();

  useEffect(() => {
    setProcessed(true);
    getOffers(res => {
      const data = res.filter(it => {
        return it.status == 1;
      });

      setOffers(data);
      setPressed2({
        ...pressed2,
        titleAR: props.route.params[0],
      });
    });

    getIntialOffers(res => {
      setSelectedCatOffer(res);
      setProcessed(false);
    }, props.route.params[0]);

    HomeCatgories(res => {
      setList([...list, ...res]);
      setSelectedCatOffer(data);
    });

    sliderImages(res => {
      const images = res.map(item => {
        return item.adsPath;
      });
      setAdimages(images);
    });
  }, []);

  const catNameKeys = item => {
    return item._id;
  };
  const itemsKeys = item => {
    return item._id;
  };

  return (
    <View style={{flex: 1}}>
      {deatils(pressed)}
      {MyHeader(
        i18n.language == 'ar' ? props.route.params[0] : props.route.params[1],
        props.navigation,
        true,
        true,
      )}
      <View style={styles.main}>
        <TextInput
          placeholderTextColor={'#dbdad7'}
          placeholder={t('اكتب هنا')}
          style={styles.textInput}
        />
        <Icon2 name="search" color="#dbdad7" size={18} />
      </View>
      <SliderBox
        dotStyle={{
          width: 15,
          height: 15,
          borderRadius: 7.5,
          borderColor: '#B70B0B',
          borderWidth: 1.5,
        }}
        ImageComponentStyle={{
          borderRadius: 20,
          width: '90%',
          height: 150,
          marginTop: 5,
        }}
        images={adimages}
        sliderBoxHeight={160}
        resizeMode="cover"
        dotColor="#B70B0B"
      />
      <View>
        <FlatList
          keyExtractor={catNameKeys}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={list}
          renderItem={renderCats}
          contentContainerStyle={{
            marginBottom: 10,
            flexDirection: 'row-reverse',
          }}
        />
      </View>
      <View style={{flex: 1}}>
        <FlatList
          keyExtractor={itemsKeys}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{}}
          data={selectedCatOffer}
          renderItem={renderItems}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('share', list);
        }}
        style={styles.button}>
        <Icon name="plus" size={50} color="#B70B0B" />
      </TouchableOpacity>
    </View>
  );
}

const styles = ScaledSheet.create({
  main: {
    borderColor: 'gray',
    alignSelf: 'center',
    width: 250,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderWidth: 2,
    justifyContent: 'flex-end',
    borderRadius: 300 / 2,
    height: 50,
    borderColor: '#dbdad7',
  },
  textInput: {
    marginHorizontal: 5,
    fontSize: 18,
    alignSelf: 'center',
    width: '90%',
  },
  button: {
    bottom: 20,
    left: 20,
    position: 'absolute',
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    borderRadius: 100 / 2,
    backgroundColor: 'white',
    elevation: 5,
    zIndex: 1,
  },
  // renderItems function styles
  rmain: {marginVertical: 3, height: 100, flex: 1},
  rwrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    marginHorizontal: 26,
  },
  rswrapper: {flex: 1, margin: 20, width: '100%', alignItems: 'flex-end'},
  rtext: {fontSize: 17, color: 'black', fontFamily: 'Cairo-Bold'},
  rtext2: {fontSize: 14, color: 'gray', fontFamily: 'Cairo-Bold'},
  riwrapper: {
    borderColor: '#dbdad7',
    marginTop: 1,
    borderWidth: 1,
    width: '110%',
    marginTop: 15,
  },
  rlwrapper: {overflow: 'hidden', width: 70, height: 70, borderRadius: 90 / 2},
  rimgae: {width: '100%', height: '100%', resizeMode: 'contain'},
  // deatils function styles
  dmain: {backgroundColor: 'rgba(0, 0, 0, 0.3)', height: '100%'},
  dwrapper: {
    justifyContent: 'space-around',
    elevation: 10,
    alignItems: 'center',
    marginTop: 90,
    alignSelf: 'center',
    borderWidth: 0,
    borderRadius: 20,
    padding: 20,
    paddingTop: 5,
    backgroundColor: 'white',
    width: '80%',
    height: '75%',
  },
  dnestedwrapper: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '105%',
  },
  dbutton: {
    backgroundColor: 'white',
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    borderColor: 'white',
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dmain2: {
    elevation: 6,
    borderColor: 'white',
    marginBottom: 10,
    marginTop: 30,
    overflow: 'hidden',
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  dimage: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  dtext: {alignSelf: 'center', fontSize: 20, fontFamily: 'Cairo-Bold'},
  dbutton1: {
    flexDirection: 'row',
    marginTop: 10,
    alignSelf: 'center',
    height: 35,
    borderRadius: 20,
    width: '40%',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dtext1: {fontFamily: 'Cairo-Regular', fontSize: 13, marginHorizontal: 5},
  ditext1: {marginTop: 5, fontSize: 18, fontFamily: 'Cairo-Bold'},
  ditext2: {fontFamily: 'Cairo-Regular'},
  ditext3: {fontSize: 18, fontFamily: 'Cairo-Bold'},
  ditext4: {fontFamily: 'Cairo-Regular', color: 'gray', fontSize: 14},
  ditext5: {flexDirection: 'row', justifyContent: 'space-around', width: '80%'},
  ditext6: {marginTop: 10, fontFamily: 'Cairo-Regular', color: '#B70B0B'},
  ditext7: {marginTop: 10, fontFamily: 'Cairo-Regular', color: 'gray'},
  diwrapper: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '130%',
  },
  dview: {height: 2, width: '60%', overflow: 'hidden'},
  dview1: {
    height: 2,
    width: '100%',
    borderWidth: 4,
    borderRadius: 10,
    borderStyle: 'dashed',
    borderColor: '#B70B0B',
  },
  dview2: {
    position: 'absolute',
    right: -5,
    backgroundColor: '#a7a7a7',
    borderRadius: 60 / 2,
    width: 60,
    height: 60,
  },
  dview3: {
    position: 'absolute',
    left: -5,
    backgroundColor: '#a7a7a7',
    borderRadius: 60 / 2,
    width: 60,
    height: 60,
  },
  dview4: {marginTop: 20, flexDirection: 'row', justifyContent: 'center'},
  dibutton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 2,
    backgroundColor: '#B70B0B',
    borderColor: '#B70B0B',
    width: 120,
    height: 40,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    left: 2,
    zIndex: 1,
  },
  dibuttonText: {fontSize: 16, fontFamily: 'Cairo-Bold', color: 'white'},
  diiText1: {
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 2,
    backgroundColor: 'white',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#B70B0B',
    width: 120,
    height: 40,
    right: 0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  diiText2: {fontSize: 16, color: 'black', fontWeight: 'bold'},
  dlmain: {
    flexDirection: 'row',
    marginTop: 10,
    alignSelf: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  dlbutton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    backgroundColor: 'white',
    width: 130,
    height: 40,
    borderRadius: 25,
  },
  dltext1: {marginHorizontal: 5, fontSize: 16, fontFamily: 'Cairo-Bold'},
});
