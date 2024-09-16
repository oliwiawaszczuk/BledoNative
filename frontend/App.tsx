import NavigationContainer from "expo-router/build/fork/NavigationContainer.native";
import {Login_Navigator, Not_Login_Navigator} from "./app/navigation/TabNavigator";
import {storage} from "./api/store";
import {View, Text} from "react-native";
import React, {useEffect} from "react";
// import {registerForPushNotificationsAsync} from "./api/notification";
import {deviceType} from "expo-device";

export default function App() {
    const loginState = storage((state) => state.loginState);
    const setLoginState = storage((state) => state.setLoginState);
    const setError = storage((state) => state.setError);
    const setNotificationToken = storage((state) => state.setNotificationToken);

    // useEffect(() => {
    //     console.log(deviceType)
    //     registerForPushNotificationsAsync().then(token => setNotificationToken(token));
    // }, []);

    useEffect(() => {
        let timer;
        if (loginState === "logging") {
            timer = setTimeout(() => {
                setLoginState("not-login");
                setError("Timeout")
            }, 10000);
        } else {
            clearTimeout(timer);
        }

        return () => clearTimeout(timer);
    }, [loginState]);

    if (loginState === "logging") {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <NavigationContainer>
            {loginState === "not-login" ? <Not_Login_Navigator /> : <Login_Navigator />}
        </NavigationContainer>
    );
}
