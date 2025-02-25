import React, { useState } from "react";
import {View,Text,TextInput,TouchableOpacity,StyleSheet,} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {signInWithEmailAndPassword} from 'firebase/auth'
import  auth  from '../services/firebaseauth'
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] = useState("");
  const navigation = useNavigation();

  const handleLogin = () => {
    signInWithEmailAndPassword(auth,email,password)
    .then((userCredential) => {
          const user = userCredential.user; 
          console.log(user);
          navigation.navigate("hp");
      })
      .catch((error) => {
        setError(error.message)
      })
   
  };

  

  const handleSignupp = () => {
    //alert('signupp!!!');
    navigation.navigate("Signup"); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        keyboardType="email-address"
        onChangeText={setEmail}
        name={"email"}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        secureTextEntry
        onChangeText={setPassword}
        name={"password"}
      
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
       {error !== "" && (
           <View>
                 <Text style={{color:"red"}}>{error}</Text>
           </View>
        )}
      
      <TouchableOpacity style={styles.signupContainer} onPress={handleSignupp}>
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
