import React, {useCallback, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, Button, Text, Card} from 'react-native-paper';
import {storage} from "../../api/store";

export default function Logout() {
    const logout = storage((state) => state.logout);
    const api_host = storage((state) => state.api_host);
    const token = storage((state) => state.token);
    const setError = storage((state) => state.setError);
    const setLoginState = storage((state) => state.setLoginState);

    const logoutHandle = useCallback( async () => {
        try {
            const response = await fetch(`${api_host}/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({token})
            });

            const data = await response.json()
            setError(data.statusText)

            if(response.ok) {
                logout()
            } else {
                setLoginState("not-login");
            }
        } catch (error) {
            // console.error('Error fetching login: ', error )
            setLoginState("not-login");
        }
    }, [token])

    return (
        <View>
            <Button mode="text" onPress={logoutHandle}>
                Logout
            </Button>
        </View>
    );
}
