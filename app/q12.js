import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
export default function Q12() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.question}>
      How often do you take time for self-care activities (e.g., exercise, hobbies, relaxation)?
      </Text>

      {/* Options */}
      <Pressable style={styles.option}onPress={()=> alert('great response')}
        
        >
        <Text style={styles.optionText}>😄 Every day </Text>
      </Pressable>
      <Pressable style={styles.option}onPress={()=> alert('great response')}>
        <Text style={styles.optionText}>🙂 A few times a week </Text>
      </Pressable>
      <Pressable style={styles.option}onPress={()=> alert('great response')}>
        <Text style={styles.optionText}>😕 Rarely </Text>
      </Pressable>
      <Pressable style={styles.option} onPress={()=> alert('great response')}>
        <Text style={styles.optionText}>😫 Never </Text>
      </Pressable>

      {/* Move Button */}
      <Pressable style={styles.moveButton} onPress={() => navigation.navigate('q13')}>
        <Text style={styles.moveButtonText}>move :)</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#87CEEB',
  },
  question: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  option: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  optionText: {
    fontSize: 18,
    color: '#333',
  },
  moveButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#1E90FF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  moveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
