import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import {storage} from "./store";


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export async function registerForPushNotificationsAsync() {
    let token;

    if (Device.isDevice) {
        const {status: existingStatus} = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const {status} = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            console.log('Permission for notifications not granted!');
            return;
        }

        token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
        console.log('Must use physical device for Push Notifications');
    }

    return token;
}

export const sendPushNotification = async (notificationToken) => {
    const message = {
        to: notificationToken,
        sound: 'default',
        title: 'Hello',
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
        console.log('Notification sent from token: ', notificationToken);
    } catch (error) {
        console.error('Error sending notification:', error);
    }
};

