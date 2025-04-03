import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import LottieView from 'lottie-react-native';

export default function Relaxation() {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relaxation</Text>

      <Text style={styles.line}>
        !! Breathe in calm, hold the peace, breathe out stress. Let each breath bring you back to the present moment !! 🌿💙
      </Text>
      
      <View style={styles.animationContainer}>
        <LottieView 
          source={require('../assets/load.json')} 
          autoPlay 
          loop 
          style={styles.animation}
        />
       
      </View>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Homepage")}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#87CEEB',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  line: {
    color: "#4B0082", // Dark purple
    fontSize: 16,
    fontStyle: "italic",
    fontWeight: "600",
    textAlign: "center",
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  animationContainer: {
    width: 200, 
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  animation: {
    width: 200,
    height: 200,
  },
  overlayText: {
    position: 'absolute',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  backButton: {
    marginTop: 20,
  },
  backButtonText: {
    color: '#B22222',
    fontSize: 18,
  }
});
