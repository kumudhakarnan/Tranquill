import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { supabase } from '../services/supabase'; 

export default function Profile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phno, setPhno] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const { uid } = route.params || {};

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!uid) {
        Alert.alert('Error', 'User ID not found.');
        return;
      }

      const { data, error } = await supabase
        .from('users')
        .select('name, email, phno')
        .eq('uid', uid)
        .single();

      if (error) {
        console.error('Error fetching user:', error);
        Alert.alert('Error', 'Failed to fetch user details.');
      } else if (data) {
        setName(data.name);
        setEmail(data.email);
        setPhno(data.phno);
      }
    };

    fetchUserDetails();
  }, [uid]);

  const handleSave = async () => {
    if (!uid) {
      Alert.alert('Error', 'User ID missing.');
      return;
    }

    const { error } = await supabase
      .from('users')
      .update({ name, phno })
      .eq('uid', uid);

    if (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile.');
    } else {
      Alert.alert('Success', 'Profile updated successfully!');
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout Error:', error);
      Alert.alert('Error', 'Failed to log out.');
    } else {
      navigation.navigate('Login'); 
    }
  };

  return (
    <View style={styles.container}>
      {/* Logout Button at Top Right */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Your Profile</Text>
      <Text style ={styles.tt}>Wanna change the info ? </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Your Name"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={phno}
          onChangeText={setPhno}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>E-mail Address</Text>
        <TextInput
          style={styles.input}
          placeholder="E-mail Address"
          keyboardType="email-address"
          value={email}
          editable={false} // Email is not editable
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Homepage')}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#87CEEB',
  },
  logoutButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 10,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  tt:{
      fontSize:20,
      color:'red',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  button: {
    height: 50,
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
