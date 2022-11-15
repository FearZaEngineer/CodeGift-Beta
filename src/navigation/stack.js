import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../screens/home";
import { Drawer } from "./drawer";
import { CatPage } from "../screens/catPage";
import { Share } from "../screens/shareWithUs";
import { RateUs } from "../screens/rateUs";
import {LangPicker} from '../screens/LangPicker'
export function Stack(){
    const stack=createStackNavigator()
    return(
        <stack.Navigator screenOptions={{headerShown:false}}>
            <stack.Screen name="Lang" component={LangPicker}/>
            <stack.Screen name="drawer" component={Drawer}/>
            <stack.Screen name="offer" component={CatPage}/>
            <stack.Screen name="share" component={Share}/>
            <stack.Screen name="rateUs" component={RateUs}/>
            <stack.Screen name="LangPicker" component={LangPicker}/>
        </stack.Navigator>
    )
}