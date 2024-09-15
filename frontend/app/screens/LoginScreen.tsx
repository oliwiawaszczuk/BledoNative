import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, Button, Text, Card} from 'react-native-paper';

export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const loginHangle = async () => {
        if (email == '' || password == '') {
            setError("Fields cannot be empty!");
            return;
        }

        try {
            const response = await fetch('http://192.168.1.191:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password})
            });

            const data = await response.json();
            setEmail("")
            setPassword("")
            setError(data.statusText)

            if(response.ok) {
                console.log("login success")
            }
        } catch (error) {
            console.error('Error fetching login: ', error )
        }
    }

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
                    <Button onPress={() => navigation.navigate('RegisterScreen')}>
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
