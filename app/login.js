import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import auth from "../services/firebaseauth";
import { supabase } from "../services/supabase"; // Import Supabase client

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showReset, setShowReset] = useState(false); // Track if reset button should show
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email) {
      setError("Please enter your email address");
      return;
    }
    
    setError("");
    setShowReset(false); // Reset reset button on new login attempt

    try {
      // 🔥 Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("Firebase User:", user.email);

      // 🔍 Fetch UID from Supabase
      const { data, error: supabaseError } = await supabase
        .from("users")
        .select("uid")
        .eq("email", email)
        .single(); // Get the single matching record

      if (supabaseError) {
        console.error("Supabase Fetch Error:", supabaseError);
        setError("Failed to retrieve user data. Try again.");
        return;
      }

      console.log("Fetched UID from Supabase:", data.uid);

      // ✅ Navigate to Home Page with UID
      navigation.navigate("Homepage", { uid: data.uid });

    } catch (error) {
      console.error("Login Error:", error.message, error.code);
      setError(error.message);

      // Show reset password button for authentication errors
      // Firebase v9 uses "auth/invalid-credential" for wrong password/email combinations
      if (error.code === "auth/invalid-credential" || 
          error.code === "auth/wrong-password" || 
          error.code === "auth/user-not-found") {
        setShowReset(true);
        setError("Invalid email or password. Try again or reset your password.");
      }
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError("Please enter your email address to reset password");
      return;
    }
    
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent to your email!");
    } catch (error) {
      console.error("Reset Error:", error.message);
      setError("Failed to send reset email. Please check if the email is correct.");
    }
  };

  const handleSignup = () => {
    navigation.navigate("Signup");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {error !== "" && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {showReset && (
        <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
          <Text style={styles.resetText}>Forgot Password? Reset</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.signupContainer} onPress={handleSignup}>
        <Text style={styles.signupText}>
          Don't have an account? <Text style={styles.signupLink}>Sign up!</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#87CEEB",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#007BFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorContainer: {
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    textAlign: "center",
  },
  resetButton: {
    marginTop: 10,
    padding: 5,
  },
  resetText: {
    color: "#FF0000",
    fontWeight: "bold",
  },
  signupContainer: {
    marginTop: 20,
  },
  signupText: {
    fontSize: 16,
    color: "#333",
  },
  signupLink: {
    color: "#007BFF",
    fontWeight: "bold",
  },
});