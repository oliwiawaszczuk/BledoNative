import React, {useCallback, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, Button, Text, Card} from 'react-native-paper';
import {storage} from "../../api/store";

export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = storage((state) => state.login);
    const setLoginState = storage((state) => state.setLoginState);
    const setError = storage((state) => state.setError);
    const error = storage((state) => state.error);
    const notificationToken = storage((state) => state.notificationToken);

    const loginHangle = useCallback( async () => {
        if (email.trim() == '' || password.trim() == '') {
            setError("Fields cannot be empty!");
            return;
        }

        setLoginState("logging");

        try {
            const response = await fetch('http://192.168.1.191:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password, notificationToken})
            });

            const data = await response.json()
            setEmail("")
            setPassword("")
            setError(data.statusText)

            if(response.ok) {
                login(data.token)
            } else {
                setLoginState("not-login");
            }
        } catch (error) {
            // console.error('Error fetching login: ', error )
            setLoginState("not-login");
        }
    }, [email, password, error])

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                    <Text style={styles.title}>Login</Text>
                    <TextInput
                        label="Email"
                        style={styles.input}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={text => setEmail(text)}
                        value={email}
                    />
                    <TextInput
                        label="Password"
                        style={styles.input}
                        secureTextEntry
                        onChangeText={text => setPassword(text)}
                        value={password}
                    />
                    <Text>{error}</Text>
                    <Button mode="contained" style={styles.button} onPress={loginHangle}>
                        Log In
                    </Button>
                    <Button onPress={() => {
                        navigation.navigate('Register');
                        setError("");
                    }}>
                        Don't have an account? Register
                    </Button>
                </Card.Content>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#f0f0f0',
    },
    card: {
        padding: 16,
        borderRadius: 10,
        elevation: 4,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        marginBottom: 12,
    },
    button: {
        marginTop: 16,
        padding: 8,
    },
});
