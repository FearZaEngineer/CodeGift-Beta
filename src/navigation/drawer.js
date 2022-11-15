import React from "react";
import{View,Image,ScrollView,StatusBar,TouchableOpacity } from 'react-native'
import { Home } from "../screens/home";
import { ContactUs } from "../screens/contacUs";
import { Privacy } from "../screens/privacy";
import { Settings } from "../screens/settings";
import { Terms } from "../screens/terms";
import { CommQ } from "../screens/commonQuestions";
import { createDrawerNavigator ,DrawerContentScrollView,DrawerItemList} from "@react-navigation/drawer";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { useTranslation } from "react-i18next";



export function Drawer(props){


    const [t, i18n ] = useTranslation();

    const customeDrawer=(drawerProps)=>{
        return(
            
            <ScrollView >
                <StatusBar backgroundColor='#FFF' barStyle="dark-content" />
                <TouchableOpacity  style={{position:'absolute',width:80,alignSelf:'center',padding:20,right:0,top:0}}  >
                    <Ionicons   color='#B70B0B' name="md-menu" size={40} onPress={()=>{
                     props.navigation.navigate(getFocusedRouteNameFromRoute(props.route));

                    }} />
                </TouchableOpacity>
                <View style={{alignSelf:'center',marginTop:100}}>
                <Image source={require('../assets/images/logo2.png')} style={{resizeMode:'contain',width:150,height:150}}/>
                </View>
                <DrawerContentScrollView {...drawerProps}>
                        <DrawerItemList {...drawerProps} />
                    </DrawerContentScrollView>
                
            </ScrollView>
        )
    }
    
    const newDrawer = createDrawerNavigator()
   
    return(
        <newDrawer.Navigator initialRouteName="الرئيسية"  drawerType="front" drawerContentOptions={{
            activeTintColor: '#444444',
                inactiveTintColor: '#888888',
                activeBackgroundColor: '#F4F4F4',
                inactiveBackgroundColor: '#FFFFFF',
                labelStyle: {fontSize:16,fontFamily:'Cairo-Regular',fontWeight:'bold'}
        }} drawerStyle={{width:'100%'}} drawerContent={customeDrawer}  drawerPosition={i18n.language=='ar'?'right':'left'} backBehavior='firstRoute'
        screenOptions={({route})=>{
            const iconName= {[t('الرئيسية')]:'home',
            [t("تواصل معنا")]:'local-post-office',
            [t("سياسة الخصوصية")]:'shield',
            [t("شروط وأحكام")]:'clipboard-text',
            [t("الإسئلة الشائعة")]:'question',
            [t("الإعدادات")]: 'settings' }
            
            return{drawerIcon:()=>{
                switch(iconName[route.name]){
                    case'shield':
                         return <Entypo style={{alignSelf:'center',position:'absolute',right:5}} color="#B70B0B" name={iconName[route.name]} size={22}/>
                    break;
                    case'clipboard-text':
                         return <MaterialCommunityIcons style={{alignSelf:'center',position:'absolute',right:5}} color="#B70B0B" name={iconName[route.name]} size={22}/>
                    break;
                    case 'question':
                         return <FontAwesome5 style={{alignSelf:'center',position:'absolute',right:5}} color="#B70B0B" name={iconName[route.name]} size={22}/>
                    default:
                          return <MaterialIcons style={{alignSelf:'center',position:'absolute',right:5}} color="#B70B0B" name={iconName[route.name]} size={22}/>
                    
                }
            },unmountOnBlur:'true'}

        }}>
            <newDrawer.Screen name={t("الرئيسية" )}component={Home} />
            <newDrawer.Screen name={t("تواصل معنا")} component={ContactUs}/>
            <newDrawer.Screen name={t("سياسة الخصوصية")} component={Privacy}/>
            <newDrawer.Screen name={t("شروط وأحكام")} component={Terms}/>
            <newDrawer.Screen name={t("الإسئلة الشائعة")} component={CommQ}/>
            <newDrawer.Screen name={t("الإعدادات")} component={Settings}/>     
        </newDrawer.Navigator>
    )
}
