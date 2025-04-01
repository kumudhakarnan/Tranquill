import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";
import { supabase } from '../services/supabase'; 

export default function Journal() {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const { uid } = route.params || {};

  useEffect(() => {
    console.log(uid);
    const fetchEntries = async () => {
      if (!uid) {
        alert("User not found!");
        return;
      }
      const { data, error } = await supabase
        .from('journal')
        .select('jid, content, created_at')
        .eq('uid', uid)
        .order('created_at', { ascending: false });

      if (error) console.error('Error fetching journal entries:', error);
      else setEntries(data);
    };

    fetchEntries();
  }, [uid]);

  const addEntry = async () => {
    if (newEntry.trim() === '' || !uid) return;

    const { data, error } = await supabase
      .from('journal')
      .insert([{ uid, content: newEntry }])
      .select('*');

    if (error) console.error('Error adding entry:', error);
    else setEntries([data[0], ...entries]);  // Add new entry to the top
    setNewEntry('');
  };

  const deleteEntry = async (jid) => {
    const { error } = await supabase
      .from('journal')
      .delete()
      .eq('jid', jid)
      .eq('uid', uid);

    if (error) console.error('Error deleting entry:', error);
    else setEntries(entries.filter(entry => entry.jid !== jid));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Journal</Text>

      <TextInput
        style={styles.input}
        placeholder="Write your thoughts..."
        value={newEntry}
        onChangeText={setNewEntry}
        multiline
      />

      <TouchableOpacity style={styles.addButton} onPress={addEntry}>
        <Text style={styles.addButtonText}>Add Entry</Text>
      </TouchableOpacity>

      <FlatList
        data={entries}
        keyExtractor={(item) => item.jid.toString()}
        renderItem={({ item }) => (
          <View style={styles.entryItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.entryText}>{item.content}</Text>
              <Text style={styles.timestamp}>
                {new Date(item.created_at).toLocaleString()}
              </Text>
            </View>
            <TouchableOpacity onPress={() => deleteEntry(item.jid)}>
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
  entryItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  entryText: { color: 'black', fontSize: 16, flex: 1, marginRight: 10 },
  timestamp: { fontSize: 12, color: 'gray', marginTop: 5 },
  backButton: { marginTop: 20, backgroundColor: '#87CEEB', padding: 10, borderRadius: 8, alignItems: 'center' },
  backButtonText: { color: 'white', fontWeight: 'bold' },
});
