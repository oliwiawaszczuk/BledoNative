import React from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {storage} from "../../api/store";
import Logout from "../components/Logout";
import {sendPushNotification} from "../../api/notification"

export default function HomeScreen({navigation}) {
    const token = storage((state) => state.token);
    const notificationToken = storage((state) => state.notificationToken);

    return (
        <View>
            {/*<Logout/>*/}
            {/*{notificationToken && <Button mode="contained" onPress={() => sendPushNotification(notificationToken)}>Send notification</Button>}*/}
        </View>
    );
}
