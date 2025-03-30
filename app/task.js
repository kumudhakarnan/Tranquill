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
    const fetchTasks = async () => {
      if (!uid) {
        alert("User is not found!");
      } else {
        const { data, error } = await supabase
          .from('tasks')
          .select('tid,title,status')
          .eq('uid', uid);
        
        if (error) 
          console.error('Error fetching tasks:', error);
        else 
          setTasks(data);
      }
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
    console.log(tasks);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Tasks</Text>
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
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: 'gray', borderRadius: 8, padding: 10, marginBottom: 10, color: 'black' },
  addButton: { backgroundColor: '#1E90FF', padding: 10, borderRadius: 8, alignItems: 'center', marginBottom: 20 },
  addButtonText: { color: 'white', fontWeight: 'bold' },
  taskItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  taskText: { color: 'black', flex: 1, marginLeft: 10 },
  completedTask: { textDecorationLine: 'line-through', color: 'gray' },
  backButton: { marginTop: 20, backgroundColor: '#87CEEB', padding: 10, borderRadius: 8, alignItems: 'center' },
  backButtonText: { color: 'white', fontWeight: 'bold' },
});
