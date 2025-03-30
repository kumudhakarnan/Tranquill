import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
export default function Pg1() {
   const navigation = useNavigation();
   const route = useRoute(); // ✅ Get route object
   const { uid } = route.params || {};// Get UID from navigation params
   // console.log(uid);


  const handleMove = () => {
    navigation.navigate('pg2', {uid});
  };

  return (
    <View style={styles.container}>
      {/* Add Image Here */}
      <Image 
        source={require('../assets/tq.png')} // Change this path to your image
        style={styles.image} 
        resizeMode="contain"
      />

      <Text style={styles.message}>
        Hi, my name is Suzu! I'm very excited to begin our journey together! 
        Let's support each other by having fun and upgrading ourselves into a better person! 
      </Text>

      <View style={styles.buttonContainer}>
        <Button title="Next ->" onPress={handleMove} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#87CEEB',
    padding: 20,
  },
  image: {
    width: 200, // Adjust size as needed
    height: 200,
    marginBottom: 20, // Space between image and text
  },
  message: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 50,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});
