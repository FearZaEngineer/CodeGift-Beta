import React from "react";

import {View,Text,Image} from 'react-native'
import { ScaledSheet } from "react-native-size-matters";
import { s, vs, ms, mvs } from 'react-native-size-matters';
export function CatCard(props){
    

    return(
        <View style={[styles.main,{width:props.width,height:props.height}]}>
            <View style={styles.second}>
                 <Text style={styles.text}>{props.placeHolder}</Text>
            </View>
            <View style={styles.secondWrapper}>
                <Image source={props.uri=='default'?require('../assets/images/logo2.png'):{uri:props.uri}} style={styles.Image} />
            </View>
        </View>
     
        
    )

    
}

const styles = ScaledSheet.create({
    main: {overflow:'hidden',borderRadius:'15@s',backgroundColor:'#e4e6eb'},
    second: {backgroundColor:'#B70B0B',paddingVertical:2},
    text:{textAlign:'center',padding:5,fontSize:16,color:'white',fontFamily:'Cairo-Bold'},
    secondWrapper : {width:'100%',height:'100%'},
    Image:{width:'100%',height:'100%',height: undefined,aspectRatio:1.33 ,resizeMode: 'cover'}

})