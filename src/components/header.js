import React from "react";
import { StatusBar } from "react-native";
import { TouchableOpacity,View,Text } from "react-native";
import { Header } from "react-native-elements";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import i18n from "../i18n";
import { ScaledSheet } from "react-native-size-matters";
import { s, vs, ms, mvs } from 'react-native-size-matters';

export function MyHeader(name,navigation,backOnly,selectedoffe){
  
    return(
      <>
        <StatusBar barStyle={'dark-content'} backgroundColor='#B70B0B'/>
        <View style={[styles.main,{backgroundColor:!selectedoffe?'white':'#B70B0B'}]}>
        <View style={styles.wrapper}>
             <TouchableOpacity onPress={()=>{
              navigation.goBack()

            }}  style={styles.button} >

            <MaterialIcons
              name={i18n.language=='ar'?"chevron-left":"chevron-right"}
              size={52}
              color={!selectedoffe ?'#B70B0B':'white'}/>
              </TouchableOpacity>

              {!backOnly?<TouchableOpacity onPress={()=>{
                navigation.toggleDrawer()
            }} style={{alignSelf:'center',marginHorizontal:10}}>
              
              <MaterialIcons
                name="menu"
                size={40}
                color='#B70B0B'/>
                </TouchableOpacity>:null}

        </View>
        <Text style={[{color:!selectedoffe ? 'black':'white'},styles.text]}>{name}</Text>
    </View>
    </>
    )
}


const styles = ScaledSheet.create({
  main:{padding:10,justifyContent:'center'},
  wrapper:{flexDirection:'row',justifyContent:'space-between',width:'100%',alignItems:'center'},
  button:{alignSelf:'center',marginHorizontal:10},
  text: {padding:10,fontFamily:'Cairo-Bold',fontSize:22,position:'absolute',alignSelf:'center',top:7}
})