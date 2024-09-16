import React from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {storage} from "../../api/store";

export default function HomeScreen({navigation}) {
    const loginState = storage((state) => state.loginState);
    const logout = storage((state) => state.logout);

    return (
        <View>
            <Text>{loginState}</Text>
            <Button mode="contained" onPress={logout}>
                Logout
            </Button>
        </View>
    );
}
