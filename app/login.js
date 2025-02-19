import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigation = useNavigation();

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Password:", password);
    navigation.navigate("pg2");
  };

  const handleFormChange = (name, value) => {
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = () => {
    //alert('signupp!!!');
    navigation.navigate("Signup"); // Navigate to the signup screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        keyboardType="email-address"
        value={credentials.email}
        name={"email"}
        onChangeText={(value) => handleFormChange("email", value)}
        // onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        secureTextEntry
        value={credentials.password}
        name={"password"}
        // onChangeText={(text) => setPassword(text)}
        onChangeText={(value) => handleFormChange("password", value)}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

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
    backgroundColor: "#87CEEB", // Sky blue background
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
