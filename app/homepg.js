import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Image, ImageBackground ,Alert} from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons'; 
import Slider from '@react-native-community/slider';
import { useNavigation ,useRoute} from '@react-navigation/native';
export default function Hp() {
  const [moodValue, setMoodValue] = useState(50);
  const scaleAnim = useRef(new Animated.Value(1)).current; // Emoji Bounce
  const navAnim = useRef(new Animated.Value(-100)).current; // Navbar Slide-in
  const flyAnim = useRef(new Animated.Value(0)).current; // Dragon Flying Animation
  const navigation = useNavigation();
  const route = useRoute();
  const { uid } = route.params || {};

  // Mood Emoji Animation (Bouncing)
  useEffect(() => {
    mood();
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
  const getMoodEmoji = () => {
    if (moodValue < 30) return "😢";  // Very Sad
    if (moodValue < 60) return "😐";  // Neutral
    if (moodValue < 80) return "🙂";  // Okay Smile
    return "😃";                      // Great Smile
  };
  const mood = () => {
    Alert.alert("Mood Check-in", "How are you feeling today?", [
      { text: "Happy 😊", onPress: () => setMoodValue(80) },
      { text: "Neutral 😐", onPress: () => setMoodValue(50) },
      { text: "Sad 😢", onPress: () => setMoodValue(20) },
    ]);
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
        <TouchableOpacity onPress={()=>navigation.navigate('Profile', { uid } )}>
          <MaterialIcons name="account-circle" size={35} color="white" />
        </TouchableOpacity>
      </Animated.View>

      {/* Floating Dragon */}
      <Animated.View style={{ transform: [{ translateY: flyAnim }] }}>
        <Image source={require('../assets/tq.png')} style={styles.dragonImage} />
      </Animated.View>

<View style={styles.moodContainer}>
  <Text style={styles.moodText}>CHOOSE YOUR FACE!</Text>
  
  <View style={styles.moodRow}>
    <Slider
      style={styles.slider}
      minimumValue={0}
      maximumValue={100}
      step={1}
      value={moodValue}
      onValueChange={setMoodValue}
      minimumTrackTintColor="#87CEEB" // Sky Blue
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
        <TouchableOpacity style={styles.navItem}  onPress={() => navigation.navigate("Reminders")}>
          <MaterialIcons name="notifications" size={30} color="white" />
          <Text style={styles.navText}>Reminders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Journal" ,{ uid } )}>
          <FontAwesome5 name="book" size={25} color="white" />
          <Text style={styles.navText}>Journal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}  onPress={() => navigation.navigate("Relaxation")}>
          <Text style={{ fontSize: 30 }}>🧘</Text> 
          <Text style={styles.navText}>Relaxation</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Tasks" ,{ uid } )}>
          <MaterialIcons name="assignment" size={30} color="white" />
          <Text style={styles.navText}>Tasks</Text>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  navQuote: {
    fontSize: 14,
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
    top: 80, // Move below navbar
    width: '50%', 
    alignItems: 'center', 
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Transparent White
    padding: 12, 
    borderRadius: 12, 
    elevation: 3,
  },
  
  moodRow: {
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
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: 'white',
    marginTop: 4,
  },
});

