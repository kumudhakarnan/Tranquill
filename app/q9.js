import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation,useRoute } from '@react-navigation/native';
import { supabase } from '../services/supabase';
export default function Q9() {
  const navigation = useNavigation();
     const route = useRoute();
     const { uid } = route.params || {};
     const qid = 9;
  
     const handleAnswer = async (answer) => {
      try {
        const { data, error } = await supabase
          .from('qnn')
          .insert([{ uid, qnsno:qid, ansnum: answer }]);
  
        if (error) {
          console.error('Error inserting answer:', error.message);
        } else {
          
         
  
          // Move to next question (q2)
          navigation.navigate('q10', { uid });
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      }
    };
  return (
    <View style={styles.container}>
      <Text style={styles.question}>
      How well have you been eating today?
      </Text>

      {/* Options */}
      <Pressable style={styles.option}onPress={()=>handleAnswer(4)}
        
        >
        <Text style={styles.optionText}>😄 Very healthy, balanced meals </Text>
      </Pressable>
      <Pressable style={styles.option}onPress={()=>handleAnswer(3)}>
        <Text style={styles.optionText}>😃  Mostly healthy, with some snacks</Text>
      </Pressable>
      <Pressable style={styles.option}onPress={()=>handleAnswer(2)}>
        <Text style={styles.optionText}>🙂 Not great, but I’ve had some nutritious food
        </Text>
      </Pressable>
      <Pressable style={styles.option} onPress={()=>handleAnswer(1)}>
        <Text style={styles.optionText}>😕 Poor, mostly unhealthy or skipped meals
        </Text>
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