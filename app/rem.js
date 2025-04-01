import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Reminders() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation(); // ✅ Added this line

  // Fetch a new quote from the API
  const fetchQuote = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://zenquotes.io/api/random');
      const data = await response.json();
      setQuote(data[0].q);
      setAuthor(data[0].a);
    } catch (error) {
      alert('Error fetching quote. Please try again.');
      console.error('Error fetching quote:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a quote when the page loads
  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GOOD THOUGHT🍃</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <>
          <Text style={styles.quote}>"{quote}"</Text>
          <Text style={styles.author}>- {author}</Text>
        </>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Homepage')} >
          <Text style={styles.buttonText}>BACK</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={fetchQuote}>
          <Text style={styles.buttonText}>MORE 👉🏻👈🏻</Text>
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
    padding: 20,
    backgroundColor: '#87CEEB',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  quote: {
    fontSize: 22,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 15,
    color: '#444',
  },
  author: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row', // ✅ Aligns buttons horizontally
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  button: {
    height: 50,
    width: '45%', // ✅ Adjusted width to fit both buttons nicely
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});