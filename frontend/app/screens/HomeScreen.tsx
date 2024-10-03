import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {storage} from "../../api/store";
import Logout from "../components/Logout";
import {sendPushNotification} from "../../api/notification"
import {styles} from "../../assets/styles";
import {HiUser} from "../components/HiUser";

export default function HomeScreen({navigation}) {
    const token = storage((state) => state.token);
    const api_host = storage((state) => state.api_host);
    const notificationToken = storage((state) => state.notificationToken);
    // const [isLoading, setIsLoading] = useState(true);
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${api_host}/get_user_details/${token}`);
                const data = await response.json();
                setUserDetails(data['user']);
            } catch (e) {

            }
        };

        fetchData();
    }, [token]);

    if (!userDetails) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    return (
        <View>
            <HiUser userDetails={userDetails}/>
            {/*<Logout/>*/}
            {/*{notificationToken && <Button mode="contained" onPress={() => sendPushNotification(notificationToken)}>Send notification</Button>}*/}
        </View>
    );
}
