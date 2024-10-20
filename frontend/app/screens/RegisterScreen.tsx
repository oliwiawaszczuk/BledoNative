import React, {useCallback, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, Button, Text, Card} from 'react-native-paper';
import {storage} from "../../api/store";

export default function RegisterScreen({navigation}) {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const api_host = storage((state) => state.api_host);
    const setError = storage((state) => state.setError);
    const error = storage((state) => state.error);
    const login = storage((state) => state.login);
    const setLoginState = storage((state) => state.setLoginState);
    const notificationToken = storage((state) => state.notificationToken);

    const registerHangle = useCallback( async () => {
        if (email.trim() === '' || password.trim() === '' || username.trim() === '' || confirmPassword.trim() === '') {
            setError("Fields cannot be empty!");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoginState("logging");

        try {
            const response = await fetch(`${api_host}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, username, password, notificationToken})
            });

            const data = await response.json()
            setEmail("")
            setUsername("")
            setPassword("")
            setConfirmPassword("")
            setError(data.statusText)

            if(response.ok) {
                console.log("login success")
                login(data.token)
            } else {
                setLoginState("not-login");
            }
        } catch (error) {
            // console.error('Error fetching login: ', error )
            setLoginState("not-login");
        }
    }, [email, username, password, confirmPassword, error])

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                    <Text style={styles.title}>Register</Text>
                    <TextInput
                        label="Email"
                        style={styles.input}
                        maxLength={60}
                        keyboardType="email-address"
                        onChangeText={text => setEmail(text)}
                        autoCapitalize="none"
                    />
                    <TextInput
                        label="Username"
                        style={styles.input}
                        maxLength={60}
                        autoCapitalize="none"
                        onChangeText={text => setUsername(text)}
                    />
                    <TextInput
                        label="Password"
                        style={styles.input}
                        maxLength={70}
                        onChangeText={text => setPassword(text)}
                        secureTextEntry
                    />
                    <TextInput
                        label="Confirm Password"
                        style={styles.input}
                        maxLength={70}
                        onChangeText={text => setConfirmPassword(text)}
                        secureTextEntry
                    />
                    <Text>{error}</Text>
                    <Button mode="contained" style={styles.button} onPress={registerHangle}>
                        Register
                    </Button>
                    <Button onPress={() => {
                        navigation.navigate('Login');
                        setError("")
                    }}>
                        Already have an account? Log In
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
        alignItems: 'center',
    },
    card: {
        padding: 16,
        borderRadius: 10,
        elevation: 4,
        maxWidth: 400,
        width: '100%',
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
