import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Card } from 'react-native-paper';

export default function RegisterScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Register</Text>
          <TextInput 
            label="Email" 
            style={styles.input} 
            keyboardType="email-address" 
            autoCapitalize="none" 
          />
          <TextInput 
            label="Password" 
            style={styles.input} 
            secureTextEntry 
          />
          <TextInput 
            label="Confirm Password" 
            style={styles.input} 
            secureTextEntry 
          />
          <Button mode="contained" style={styles.button} onPress={() => { /* handle registration */ }}>
            Register
          </Button>
          <Button onPress={() => navigation.navigate('LoginScreen')}>
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
