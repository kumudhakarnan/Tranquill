import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';

export default function Welcome({ navigation }) {
  const handleMove = () => {
    navigation.navigate('Login');  
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/tq.png')} style={styles.logo} />
      <Text style={styles.message}>
        Hi, my name is Suzu! I'm very excited to begin our journey together! Let's support each other by having fun and upgrading ourselves into a better person!
      </Text>
      <View style={styles.buttonContainer}>
        <Button title="BEGIN:)" onPress={handleMove} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#87CEEB',
    padding: 30,
  },
  logo: {
    width: 400,
    height: 400,
    marginBottom: 5,
    resizeMode: 'contain',
  },
  message: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});
