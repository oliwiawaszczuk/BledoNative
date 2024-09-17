import React, {useCallback, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, Button, Text, Card} from 'react-native-paper';
import {storage} from "../../api/store";

export default function RegisterScreen({navigation}) {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const setError = storage((state) => state.setError);
    const error = storage((state) => state.error);
    const login = storage((state) => state.login);
    const setLoginState = storage((state) => state.setLoginState);

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
            const response = await fetch('http://192.168.1.191:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, username, password})
            });

            const data = await response.json()
            setEmail("")
            setUsername("")
            setPassword("")
            setConfirmPassword("")
            setError(data.statusText)

            if(response.ok) {
                console.log("login success")
                login("token")
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
                        keyboardType="email-address"
                        onChangeText={text => setEmail(text)}
                        autoCapitalize="none"
                    />
                    <TextInput
                        label="Username"
                        style={styles.input}
                        autoCapitalize="none"
                        onChangeText={text => setUsername(text)}
                    />
                    <TextInput
                        label="Password"
                        style={styles.input}
                        onChangeText={text => setPassword(text)}
                        secureTextEntry
                    />
                    <TextInput
                        label="Confirm Password"
                        style={styles.input}
                        onChangeText={text => setConfirmPassword(text)}
                        secureTextEntry
                    />
                    <Text>{error}</Text>
                    <Button mode="contained" style={styles.button} onPress={registerHangle}>
                        Register
                    </Button>
                    <Button onPress={() => {
                        navigation.navigate('LoginScreen');
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
