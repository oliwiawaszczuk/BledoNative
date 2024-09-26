import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import {storage} from "../../api/store";
import ProjectsScreen from "../screens/ProjectsScreen";
import ProjectScreen from "../screens/ProjectScreen";
import { Ionicons } from '@expo/vector-icons';
import {UsersScreen} from "../screens/UsersScreen";
import UserScreen from "../screens/UserScreen";

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
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Projects"
                component={ProjectsScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="folder-outline" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Users"
                component={UsersScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="people" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen name="Project" component={ProjectScreen}  options={{ tabBarButton: () => null, headerShown: false}}/>
            <Tab.Screen name="User" component={UserScreen}  options={{ tabBarButton: () => null, headerShown: false}}/>
        </Tab.Navigator>
    );
}