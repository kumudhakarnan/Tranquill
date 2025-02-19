import { View, Text, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
export default function Pg1() {
   const navigation = useNavigation();

  const handleMove = () => {
    navigation.navigate('pg2');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.message}>
        Hi, my name is Suzu! I'm very excited to begin our journey together! Let's support each other by having fun and upgrading ourselves into a better person! 
      </Text>

      <View style={styles.buttonContainer}>
        <Button title="Next->" onPress={handleMove} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#87CEEB', // Sky blue background
    padding: 20,
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
