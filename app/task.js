import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";
import { supabase } from '../services/supabase'; 

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const { uid } = route.params || {};

  useEffect(() => {
    console.log(uid);
    const fetchTasks = async () => {
      if (!uid) {
        alert("User is not found!");
        return;
      }
      const { data: answers, error: ansError } = await supabase
        .from('qnn')
        .select('qnsno, ansnum')
        .eq('uid', uid);
  
      if (ansError || !answers) {
        console.error('Error fetching answers:', ansError);
        return;
      }
  
      console.log("Fetched answers:", answers);
  
      if (answers.length === 0) return;
  
      const chunkSize = 5;
      let suggestedTasks = [];
  
      for (let i = 0; i < answers.length; i += chunkSize) {
        const chunk = answers.slice(i, i + chunkSize);
        const orCondition = chunk
          .map(a => `and(qnno.eq.${a.qnsno},opnum.eq.${a.ansnum})`)
          .join(',');
      
        const { data: taskChunk, error: taskError } = await supabase
          .from('taskstt')
          .select('tid, task')
          .or(orCondition);
      
        if (taskError) {
          console.error('Error fetching suggested tasks:', taskError);
          return;
        }
      
        suggestedTasks = [...suggestedTasks, ...taskChunk];
      }
      console.log("Fetched suggested tasks:", suggestedTasks);
  
      const { data: existingTasks, error: fetchError } = await supabase
        .from('tasks')
        .select('tid, title, status')
        .eq('uid', uid);
  
      if (fetchError || !existingTasks) {
        console.error('Error fetching tasks:', fetchError);
        return;
      }
  
      console.log("Existing tasks:", existingTasks);
  
      const newTasks = suggestedTasks.filter(sTask =>
        !existingTasks.some(eTask => eTask.tid === sTask.tid)
      ).map(task => ({ tid: task.tid, uid, title: task.task, status: 'pending' }));
  
      console.log("New tasks to insert:", newTasks);
  
      if (newTasks.length > 0) {
        const { error: insertError } = await supabase.from('tasks').insert(newTasks);
        if (insertError) {
          console.error("Error inserting tasks:", insertError);
          return;
        }
      }
  
      setTasks([...existingTasks, ...newTasks]);
    };
  
    fetchTasks();
  }, [uid]);

  const addTask = async () => {
    if (newTask.trim() === '' || !uid) return;
    const { data, error } = await supabase
      .from('tasks')
      .insert([{ uid, title: newTask, status: 'pending' }])
      .select('*');
    
    if (error) console.error('Error adding task:', error);
    else setTasks([...tasks, ...data]);
    setNewTask('');
  };

  const toggleTaskCompletion = async (tid, currentStatus) => {
    const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';
    const { error } = await supabase
      .from('tasks')
      .update({ status: newStatus })
      .eq('tid', tid)
      .eq('uid', uid);
    
    if (error) console.error('Error updating task:', error);
    else setTasks(tasks.map(task => task.tid === tid ? { ...task, status: newStatus } : task));
  };

  const deleteTask = async (tid) => {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('tid', tid)
      .eq('uid', uid);
    
    if (error) console.error('Error deleting task:', error);
    else setTasks(tasks.filter(task => task.tid !== tid));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Tasks</Text>
      <Text style={styles.quote}>“Small steps every day lead to big results.”</Text>

      <TextInput
        style={styles.input}
        placeholder="Add a new task..."
        value={newTask}
        onChangeText={setNewTask}
      />
      <TouchableOpacity style={styles.addButton} onPress={addTask}>
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.tid.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <TouchableOpacity onPress={() => toggleTaskCompletion(item.tid, item.status)}>
              <MaterialIcons
                name={item.status === 'completed' ? 'check-circle' : 'radio-button-unchecked'}
                size={24}
                color={item.status === 'completed' ? 'green' : 'gray'}
              />
            </TouchableOpacity>
            <Text style={[styles.taskText, item.status === 'completed' && styles.completedTask]}>
              {item.title}
            </Text>
            <TouchableOpacity onPress={() => deleteTask(item.tid)}>
              <MaterialIcons name="delete" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Homepage")}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'white' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10, textAlign: 'center', color: 'black' },
  quote: {
    fontSize: 16,
    fontStyle: 'italic',
    color: 'purple',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: { borderWidth: 1, borderColor: 'gray', borderRadius: 8, padding: 10, marginBottom: 10, color: 'black' },
  addButton: { backgroundColor: '#1E90FF', padding: 10, borderRadius: 8, alignItems: 'center', marginBottom: 20 },
  addButtonText: { color: 'white', fontWeight: 'bold' },
  taskItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  taskText: { color: 'black', flex: 1, marginLeft: 10 },
  completedTask: { textDecorationLine: 'line-through', color: 'gray' },
  backButton: {
    marginTop: 20,
    backgroundColor: '#87CEEB',
    padding: 10,
    borderRadius: 8,
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
  },
  backButtonText: { color: 'white', fontWeight: 'bold' },
});
