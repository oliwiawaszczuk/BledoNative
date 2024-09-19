import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import {storage} from "../../api/store";
import ProjectsScreen from "../screens/ProjectsScreen";

const Tab = createBottomTabNavigator();

export function Not_Login_Navigator() {
    return (
        <Tab.Navigator screenOptions={{headerShown: false, tabBarStyle: {display: 'none'}}}>
            <Tab.Screen name="Login" component={LoginScreen}/>
            <Tab.Screen name="Register" component={RegisterScreen}/>
        </Tab.Navigator>
    );
}

export function Login_Navigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen}/>
            <Tab.Screen name="Projects" component={ProjectsScreen} options={{headerShown: false}}/>
        </Tab.Navigator>
    );
}