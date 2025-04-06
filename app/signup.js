import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
import auth from '../services/firebaseauth';
import { supabase } from '../services/supabase'; 

export default function Signup() {
  const [name, setName] = useState('');
  const [phnno, setPhnno] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  // Validation functions
  const validateGmail = (email) => {
    // Specifically checks for Gmail format
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(email);
  };

  const validatePhoneNumber = (phone) => {
    return phone.length === 10 && !isNaN(phone);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  // Check if email already exists
  const checkEmailExists = async (email) => {
    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);
      return methods.length > 0;
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
    }
  };

  const handleSignup = async () => {
    setError("");
    
    // Basic validations
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }
    
    if (!validatePhoneNumber(phnno)) {    
      setError("Phone number must be exactly 10 digits");
      return;
    }
    
    // Gmail-specific validation
    if (!validateGmail(email)) {
      setError("Please enter a valid Gmail address (example@gmail.com)");
      return;
    }
    
    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);

    try {
      // Check if email exists before trying to create account
      const emailExists = await checkEmailExists(email);
      
      if (emailExists) {
        setError("This Gmail address is already registered. Please use another email or login.");
        setIsLoading(false);
        return;
      }

      // Create Firebase Authentication user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Insert user data into Supabase
      const { data, error: supabaseError } = await supabase
        .from('users')
        .insert([
          {
            name: name,
            email: email,
            phno: phnno,
            password: password,
          }
        ])
        .select("uid");
        
      if (supabaseError) {
        console.error("Supabase Insert Error:", supabaseError);
        setError("Failed to save user data. Please try again.");
        setIsLoading(false);
        return;
      }

      // Fetch the user data from Supabase to confirm it exists
      const { data: userData, error: fetchError } = await supabase
        .from("users")
        .select("uid,name")
        .eq("email", email)
        .single();

      if (fetchError) {
        console.error("Supabase Fetch Error:", fetchError);
        setError("Failed to retrieve user data. Please try again.");
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      
      // Navigate directly like in your simple version
      navigation.navigate("pg1", { uid: userData.uid });

    } catch (error) {
      setIsLoading(false);
      console.error("Firebase Signup Error:", error.message, error.code);
      
      // Provide user-friendly error messages
      if (error.code === "auth/email-already-in-use") {
        setError("This Gmail address is already registered. Please use another email or login.");
      } else if (error.code === "auth/network-request-failed") {
        setError("Network error. Please check your internet connection.");
      } else if (error.code === "auth/weak-password") {
        setError("Password is too weak. Please use a stronger password.");
      } else if (error.code === "auth/invalid-email") {
        setError("The email address is not valid.");
      } else {
        setError("Signup failed: " + error.message);
      }
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
        placeholder="Enter Phone Number (10 digits)"
        keyboardType="phone-pad"
        value={phnno}
        onChangeText={setPhnno}
        maxLength={10}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Gmail Address (example@gmail.com)"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Password (min 6 characters)"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity 
        style={[styles.button, isLoading && styles.disabledButton]} 
        onPress={handleSignup}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>{isLoading ? "Creating Account..." : "Sign Up"}</Text>
      </TouchableOpacity>

      {error !== "" && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <TouchableOpacity 
        style={styles.loginContainer} 
        onPress={() => navigation.navigate("Login")}
        disabled={isLoading}
      >
        <Text style={styles.loginText}>
          Already have an account? <Text style={styles.loginLink}>Login</Text>
        </Text>
      </TouchableOpacity>
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
  disabledButton: {
    backgroundColor: '#7fb9ed',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorContainer: {
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  loginContainer: {
    marginTop: 20,
  },
  loginText: {
    fontSize: 16,
    color: '#333',
  },
  loginLink: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
});
