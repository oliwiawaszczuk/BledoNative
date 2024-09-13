import {Image, StyleSheet, Platform, Button} from 'react-native';

import {HelloWave} from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import React, {useEffect, useRef, useState} from "react";
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

interface User {
    id: number;
    username: String;
}

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

// Funkcja do rejestracji i uzyskania tokena powiadomień
async function registerForPushNotificationsAsync() {
    let token;

    if (Device.isDevice) {
        const {status: existingStatus} = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const {status} = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            alert('Permission for notifications not granted!');
            return;
        }

        token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
        alert('Must use physical device for Push Notifications');
    }

    return token;
}

export default function HomeScreen() {
    const [users, setUsers] = useState<User[]>([]);
    const [text, setText] = useState("");
    const [expoPushToken, setExpoPushToken] = useState<string | null>(null);

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
        console.log("zaladowano token: ", expoPushToken)
        setText("")
    }, []);

    const get_users = async () => {
        console.log("Loading users...");
        try {
            const response = await fetch('http://192.168.1.191:5000/api/users');
            const data = await response.json();
            console.log(data)
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
        // setUsers("wioeaf");
    }

    const get_text = async () => {
        console.log("Loading text...");
        setText(expoPushToken);
    }

    const sendPushNotification = async () => {
        const message = {
            to: expoPushToken,
            sound: 'default',
            title: 'praHi',
            body: 'This is a test notification!',
            data: {someData: 'goes here'},
        };

        try {
            await fetch('https://exp.host/--/api/v2/push/send', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(message),
            });
            console.log('Notification sent from token: ', expoPushToken);
        } catch (error) {
            console.error('Error sending notification:', error);
        }
    };

    return (
        <ParallaxScrollView
            headerBackgroundColor={{light: '#A1CEDC', dark: '#1D3D47'}}
            headerImage={
                <Image
                    source={require('@/assets/images/partial-react-logo.png')}
                    style={styles.reactLogo}
                />
            }>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Welcome!</ThemedText>
                <HelloWave/>
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <ThemedText type="title">Users:</ThemedText>
                <Button title="Zaladuj users" onPress={get_users}></Button>
                <ThemedText>
                    {users.map(user => (
                        <ThemedText key={user.id}>{user.id} : {user.username}<br/></ThemedText>
                    ))}
                </ThemedText>
            </ThemedView>

            <ThemedView>
                <ThemedText type="title">Text</ThemedText>
                <Button title="Zaladuj text" onPress={get_text}></Button>
                <ThemedText>TEXT: {text}</ThemedText>
            </ThemedView>

            <ThemedView>
                <Button title="Wyslij powiadomienie" onPress={sendPushNotification} disabled={!expoPushToken}></Button>
            </ThemedView>

        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
});
