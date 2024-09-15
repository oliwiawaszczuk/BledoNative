import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle: {display: 'none'} }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="LoginScreen" component={LoginScreen}/>
      <Tab.Screen name="RegisterScreen" component={RegisterScreen}/>
    </Tab.Navigator>
  );
}
