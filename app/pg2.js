import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
export default function Pg2() {
  const router = useRouter();
  const navigation = useNavigation();
  const handleMove = () => {
    navigation.navigate('q1');
   
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        THE FOLLOWING 15 QNS IS PROVIDED FOR YOU TO GIVE THE HEARTFELT ANSWER !!!🤗
      </Text>
      <View style={styles.buttonContainer}>
        <Button title="move :)" onPress={handleMove} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#87CEEB', // Sky blue background
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});
