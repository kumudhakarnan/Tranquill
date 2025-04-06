import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Image, ImageBackground ,Alert} from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons'; 
import Slider from '@react-native-community/slider';
import { useNavigation ,useRoute} from '@react-navigation/native';
import { Platform } from 'react-native';

export default function Hp() {
  const [moodValue, setMoodValue] = useState(null); // Initially null
  const scaleAnim = useRef(new Animated.Value(1)).current; // Emoji Bounce
  const navAnim = useRef(new Animated.Value(-100)).current; // Navbar Slide-in
  const flyAnim = useRef(new Animated.Value(0)).current; // Dragon Flying Animation
  const navigation = useNavigation();
  const route = useRoute();
  const { uid } = route.params || {};

  // Mood Emoji Animation (Bouncing)
  useEffect(() => {
    
    if (moodValue !== null) {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.5,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [moodValue]);

  // Navbar Slide-in Animation (on Mount)
  useEffect(() => {
    Animated.timing(navAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  // Function to get mood emoji based on range
  const getMoodMessage = (value) => {
    if (value < 30) return "😢 It's okay to have bad days. Be kind to yourself and take it one step at a time. 💙";
    if (value < 60) return "😐 You’re doing fine! A little self-care can turn your day around. 🌿✨";
    if (value < 80) return "🙂 Every small joy counts! Keep finding reasons to smile. 🌞😊";
    return "😃 Your energy is contagious! Spread the positivity today. 🌟💖";
  };
   

  const getMoodEmoji = () => {
    if (moodValue === null) return "👀"; // Default Eyes emoji when no selection
    if (moodValue < 30) return "😢"; // Very Sad
    if (moodValue < 60) return "😐"; // Neutral
    if (moodValue < 80) return "🙂"; // Okay Smile
    return "😃"; // Great Smile
  };

  // Flying Dragon Animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(flyAnim, { toValue: -20, duration: 1000, useNativeDriver: true }),
        Animated.timing(flyAnim, { toValue: 20, duration: 1000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <ImageBackground source={require('../assets/bgg.jpg')} style={styles.full}>
      {/* Navbar */}
      <Animated.View style={[styles.navbar, { transform: [{ translateY: navAnim }] }]}>
        <Text style={styles.navTitle}>TRANQUIL 🤍</Text>
        <Text style={styles.navQuote}>A GOOD DAY BUILDS WITH GOOD MOOD !!</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile', { uid } )}>
          <MaterialIcons name="account-circle" size={35} color="white" />
        </TouchableOpacity>
      </Animated.View>

      {/* Floating Dragon */}
      <Animated.View style={{ transform: [{ translateY: flyAnim }] }}>
        <Image source={require('../assets/tq.png')} style={styles.dragonImage} />
      </Animated.View>

      <View style={styles.moodContainer}>
        <Text style={styles.moodText}>CLICK YOUR FACE!</Text>
        
        <View style={styles.moodRow}>
        <Slider
  style={styles.slider}
  minimumValue={0}
  maximumValue={100}
  step={1}
  value={moodValue ?? 50} // Default position
  onValueChange={(value) => {
    setMoodValue(value); // Just update the state without alert
  }}
  onSlidingComplete={(value) => {
    if (value !== null) {
      const moodMsg = getMoodMessage(value);
      if (Platform.OS !== 'web') {
        Alert.alert("CHEERUP-CHAMP!", moodMsg);
      } else {
        console.warn("Mood Check-in:", moodMsg);
      }
    }
  }}
  
  minimumTrackTintColor="#87CEEB"
  maximumTrackTintColor="#ADD8E6"
  thumbTintColor="#1E90FF"
/>
          <Animated.Text style={[styles.moodEmoji, { transform: [{ scale: scaleAnim }] }]}>
            {getMoodEmoji()}
          </Animated.Text>
        </View>
      </View>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Reminders")}>
        <Text style={{ fontSize: 30 }}>😇</Text>
          <Text style={styles.navText}>Thoughts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Journal", { uid } )}>
          <FontAwesome5 name="book" size={25} color="white" />
          <Text style={styles.navText}>Journal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Relaxation")}>
          <Text style={{ fontSize: 30 }}>🧘</Text> 
          <Text style={styles.navText}>Relaxation</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Tasks", { uid } )}>
          <MaterialIcons name="assignment" size={30} color="white" />
          <Text style={styles.navText}>Tasks</Text>
        </TouchableOpacity>
        {/* New Map Icon */}
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("np")}>
          <FontAwesome5 name="map-marked-alt" size={25} color="white" />
          <Text style={styles.navText}>Places</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}



const styles = StyleSheet.create({
  full: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navbar: {
    position: 'absolute',
    top: 0,
    width: '100%',
    backgroundColor: 'rgba(70, 130, 180, 0.8)',
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  navTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  navQuote: {
    fontSize: 10,
    color: 'white',
    fontStyle: 'italic',
    textAlign: 'center',
    flex: 1,
    marginHorizontal: 10,
  },
  dragonImage: {
    width: 400,
    height: 350,
    resizeMode: 'contain',
    marginBottom: 1,
    marginTop: 300,
  },
  
  moodContainer: {
    position: 'absolute', 
    top: 80, 
    width: '50%', 
    alignItems: 'center', 
    backgroundColor: 'rgba(255, 255, 255, 0.5)', 
    padding: 12, 
    borderRadius: 12, 
    elevation: 3,
  }, moodRow: {
    flexDirection: 'row',  // Align slider & emoji in a row
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  
  slider: {
    flex: 1, // Make slider take most space,
    height: 20,
    marginRight: 10, // Space between slider & emoji
  },
  
  moodEmoji: {
    fontSize: 30,
  },
  
  
  moodText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
 


  bottomNav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(70, 130, 180, 0.8)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
  },
});
