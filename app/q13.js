import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation,useRoute } from '@react-navigation/native';
import { supabase } from '../services/supabase';
export default function Q13() {
   const navigation = useNavigation();
       const route = useRoute();
       const { uid } = route.params || {};
       const qid = 13;
    
       const handleAnswer = async (answer) => {
        try {
          const { data, error } = await supabase
            .from('qnn')
            .insert([{ uid, qnsno:qid, ansnum: answer }]);
    
          if (error) {
            console.error('Error inserting answer:', error.message);
          } else {
            
           
    
            // Move to next question (q2)
            navigation.navigate('Homepage', { uid });
          }
        } catch (err) {
          console.error('Unexpected error:', err);
        }
      };
  

  return (
    <View style={styles.container}>
      <Text style={styles.question}>
      Are you currently working on any personal projects or goals?
      </Text>

      {/* Options */}
      <Pressable style={styles.option}onPress={()=> handleAnswer(4)}
        >
        <Text style={styles.optionText}>Yes, and I’m making good progress </Text>
      </Pressable>
      <Pressable style={styles.option}onPress={()=>handleAnswer(3)}>
        <Text style={styles.optionText}>Yes, but I’m struggling to stay consistent
        </Text>
      </Pressable>
      <Pressable style={styles.option}onPress={()=> handleAnswer(2)}>
        <Text style={styles.optionText}>I want to start something but haven’t yet
        </Text>
      </Pressable>
      <Pressable style={styles.option} onPress={()=> handleAnswer(1)}>
        <Text style={styles.optionText}> No, I don’t have any personal projects right now</Text>
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