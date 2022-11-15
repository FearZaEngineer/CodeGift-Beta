import React, {useState, useEffect} from 'react';
import {
  I18nManager,
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  StatusBar,
  FlatList,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {HomeCatgories, sliderImages, countries} from '../services/MyApi';
import {CatCard} from '../components/card';
import {SliderBox} from 'react-native-image-slider-box';
import {Accordion} from 'react-native-collapsible/Accordion';
import {useTranslation} from 'react-i18next';
import {ScaledSheet} from 'react-native-size-matters';

export function Home(props) {
  const [t, i18n] = useTranslation();

  const renderCard = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('offer', [
            item.titleAR,
            item.titleEN,
            countryId,
          ]);
        }}
        style={styles.rcbutton}>
        <CatCard
          uri={item.imgPath}
          placeHolder={i18n.language == 'ar' ? item.titleAR : item.titleEN}
          width={171}
          height={170}
        />
      </TouchableOpacity>
    );
  };

  const [catgories, setCatgories] = useState([
    {
      titleAR: 'الكل',
      titleEN: 'All',
      _id: '132312438172777asd72713717asd',
      imgPath: 'default',
    },
  ]);
  const [adimages, setAdimages] = useState([]);
  const [mycountry, setMycountry] = useState();
  const [countryId, setcountryId] = useState();
  const [slectedcountry, setSlectedcountry] = useState(
    i18n.language == 'ar' ? 'السعودية' : 'Saudi',
  );
  const [ModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    HomeCatgories(res => {
      setCatgories([...catgories, ...res]);
    });
    countries(res => {
      setMycountry(res);
    });
  }, []);

  const keys = item => {
    return item._id;
  };

  useEffect(() => {
    sliderImages(res => {
      const images = res.map(item => {
        return item.adsPath;
      });
      setAdimages(images);
    });
  }, []);

  return (
    <>
      <Modal
        animationType="none"
        transparent={true}
        style={{backgroundColor: 'black'}}
        visible={ModalOpen}>
        <View style={styles.mview1}>
          <View style={styles.mview2}>
            {mycountry == undefined
              ? null
              : mycountry.map((item, index) => {
                  return (
                    <>
                      <TouchableOpacity
                        key={index.toString()}
                        onPress={() => {
                          setModalOpen(false);
                          setSlectedcountry(
                            i18n.language == 'ar' ? item.titleAR : item.titleEN,
                          );
                          setcountryId(item._id);
                        }}
                        style={{width: '100%', alignItems: 'center'}}>
                        <Text
                          style={{
                            color: 'gray',
                            marginVertical: 10,
                            fontSize: 16,
                            fontFamily: 'Cairo-Bold',
                          }}>
                          {i18n.language == 'ar' ? item.titleAR : item.titleEN}
                        </Text>
                      </TouchableOpacity>
                      <View style={styles.mview3} />
                    </>
                  );
                })}
          </View>
        </View>
      </Modal>

      <View style={styles.view1}>
        <StatusBar backgroundColor={'white'} barStyle="dark-content" />
        <TouchableOpacity
          style={styles.button1}
          onPress={() => {
            setModalOpen(true);
          }}>
          <Text
            style={{
              fontFamily: 'Cairo-Bold',
              color: 'white',
              marginHorizontal: 15,
              fontSize: 16,
              alignSelf: 'center',
            }}>
            {slectedcountry}
          </Text>
        </TouchableOpacity>
        <View style={styles.view2}>
          <Image
            style={styles.image}
            source={require('../assets/images/logo.png')}
          />
        </View>
        <TouchableOpacity>
          <Icon
            style={styles.button2}
            color={'white'}
            name="md-menu"
            size={40}
            onPress={() => {
              props.navigation.toggleDrawer();
            }}
          />
        </TouchableOpacity>
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
          marginTop: 15,
        }}
        images={adimages}
        sliderBoxHeight={160}
        resizeMode="cover"
        dotColor="#B70B0B"
      />

      <FlatList
        keyExtractor={keys}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{flexDirection: 'row-reverse'}}
        numColumns={2}
        contentContainerStyle={{marginHorizontal: 5, flexDirection: 'column'}}
        data={catgories}
        renderItem={renderCard}
      />
    </>
  );
}
const styles = ScaledSheet.create({
  //renderCard
  rcbutton: {margin: 10, flex: 1, width: '45%',alignItems:'flex-end'},
  //Modal
  mview1: {
    alignSelf: 'center',
    top: 230,
    width: '85%',
    height: 350,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  mview2: {padding: 20, alignItems: 'center', height: '100%'},
  mview3: {
    alignSelf: 'center',
    borderColor: '#dbdad7',
    marginTop: 0,
    borderWidth: 0.5,
    width: '110%',
    height: 0,
  },
  view1: {
    height: 100,
    backgroundColor: '#B70B0B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  view2: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 100,
    position: 'absolute',
  },
  button1: {
    left: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
  },
  button2: {padding: 10, right: 10},
  image: {width: 100, height: 100},
});
