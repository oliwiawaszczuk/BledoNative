import NavigationContainer from "expo-router/build/fork/NavigationContainer.native";
import {Login_Navigator, Not_Login_Navigator} from "./app/navigation/TabNavigator";
import {storage} from "./api/store";
import {View, Text} from "react-native";
import React, {useCallback, useEffect} from "react";
import {registerForPushNotificationsAsync} from "./api/notification";

const auto_login = async (token: string, login, setLoginState) => {
    try {
        const response = await fetch('http://192.168.1.191:5000/api/auto_login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({token})
        });

        const data = await response.json()

        if (response.ok) {
            login(data.token)
            console.log("auto login with token: ", token, " - success");
        } else {
            setLoginState("not-login");
            console.log("auto login with token: ", token, " - not success");
        }
    } catch (error) {
        // console.error('Error fetching login: ', error )
        console.log("auto login with token: ", token, " - not not success");
        setLoginState("not-login");
    }
}

export default function App() {
    const loginState = storage((state) => state.loginState);
    const setLoginState = storage((state) => state.setLoginState);
    const setError = storage((state) => state.setError);
    const setNotificationToken = storage((state) => state.setNotificationToken);
    const token = storage((state) => state.token);
    const login = storage((state) => state.login);

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setNotificationToken(token));

        auto_login(token, login, setLoginState)
    }, [token]);

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
