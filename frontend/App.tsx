import NavigationContainer from "expo-router/build/fork/NavigationContainer.native";
import {Login_Navigator, Not_Login_Navigator} from "./app/navigation/TabNavigator";
import {storage} from "./api/store";
import {View, Text, Platform, UIManager} from "react-native";
import React, {useCallback, useEffect} from "react";
import {registerForPushNotificationsAsync} from "./api/notification";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Loading} from "./app/components/Loading";

const queryClient = new QueryClient();

const auto_login = async (token: string, login, setLoginState, api_host) => {
    try {
        const response = await fetch(`${api_host}/auto_login`, {
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

if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function App() {
    const api_host = storage((state) => state.api_host);
    const loginState = storage((state) => state.loginState);
    const setLoginState = storage((state) => state.setLoginState);
    const setError = storage((state) => state.setError);
    const setNotificationToken = storage((state) => state.setNotificationToken);
    const token = storage((state) => state.token);
    const login = storage((state) => state.login);

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setNotificationToken(token));
        if (api_host)
            auto_login(token, login, setLoginState, api_host)
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

    if (api_host === null || loginState === "logging" || loginState === "checking-autologin")
        <Loading/>

    return (
        <QueryClientProvider client={queryClient}>
            <NavigationContainer>
                {loginState === "not-login" ? <Not_Login_Navigator /> : <Login_Navigator />}
            </NavigationContainer>
        </QueryClientProvider>
    );
}
