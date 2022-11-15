import React, { useEffect } from 'react'
import { View,Text,I18nManager } from 'react-native'
import {Drawer,} from './src/navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { MyHeader } from './src/components/header'
import { Share } from './src/screens/shareWithUs'
import { Stack } from './src/navigation/stack'
import SplashScreen from 'react-native-splash-screen'
import './src/i18n/index'
import { useTranslation } from "react-i18next";



function App(){
  
  useEffect(()=>{
    SplashScreen.hide()
  },[])
  const [t, i18n ] = useTranslation();
  I18nManager.forceRTL(i18n.language=='en'?true:false)
  return(
    <NavigationContainer>
      <Stack/>
    </NavigationContainer>

  )
}
export default App