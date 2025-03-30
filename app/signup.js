import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import auth from '../services/firebaseauth';
import { supabase } from '../services/supabase'; // Import Supabase client

export default function Signup() {
  const [name, setName] = useState('');
  const [phnno, setPhnno] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const handleSignup = async () => {
    setError("");

    try {
      // 1️⃣ Firebase Authentication (Sign Up)
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user; // Get Firebase user

      // 2️⃣ Insert User Data into Supabase
      const { data, error: supabaseError } = await supabase
        .from('users')
        .insert([
          {
            name: name,
            email: email,
            phno: phnno,
            password: password, // Storing phone number
          }
        ])
        .select("uid"); // Get auto-generated UID

      if (supabaseError) {
        console.error("Supabase Insert Error:", supabaseError);
        setError("Failed to save user data. Please try again.");
        return;
      }

      // 4️⃣ Fetch the same UID from Supabase to confirm it exists
      const { data: userData, error: fetchError } = await supabase
        .from("users")
        .select("uid,name")
        .eq("email", email) // Find user by email
        .single(); // Get single result

      if (fetchError) {
        console.error("Supabase Fetch Error:", fetchError);
        return;
      }

     // console.log("🔥 Fetched UID from Supabase:", userData.uid,userData.name); // Console log the fetched UID

      // 5️⃣ Navigate after successful signup
      navigation.navigate("pg1", { uid: userData.uid });

    } catch (error) {
      console.error("Firebase Signup Error:", error.message);
      setError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Phone Number"
        keyboardType="phone-pad"
        value={phnno}
        onChangeText={setPhnno}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {error !== "" && (
        <View>
          <Text style={{ color: "red" }}>{error}</Text>
        </View>
      )}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
