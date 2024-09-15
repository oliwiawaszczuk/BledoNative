import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

export default function HomeScreen({ navigation }) {
  return (
    <View>
      <Text variant="headlineMedium">Home Screen</Text>
      <Button mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
        Go to Login
      </Button>
    </View>
  );
}
