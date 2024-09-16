import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import {storage} from "../../api/store";

const Tab = createBottomTabNavigator();

export function Not_Login_Navigator() {
    return ( //screenOptions={{headerShown: false, tabBarStyle: {display: 'none'}}}
        <Tab.Navigator >
            <Tab.Screen name="LoginScreen" component={LoginScreen}/>
            <Tab.Screen name="RegisterScreen" component={RegisterScreen}/>
        </Tab.Navigator>
    );
}

export function Login_Navigator() {
    return (
        <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen name="HomeScreen" component={HomeScreen}/>
        </Tab.Navigator>
    );
}