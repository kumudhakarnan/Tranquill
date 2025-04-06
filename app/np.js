import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

export default function NP() {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [libraries, setLibraries] = useState([]);
  const [theaters, setTheaters] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      console.log('User Location:', loc.coords);
      setLocation(loc.coords);

      // ✅ Address fetch with headers
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${loc.coords.latitude}&lon=${loc.coords.longitude}`,
          {
            headers: {
              'User-Agent': 'ReactNativeApp/1.0 (your_email@example.com)',
              'Accept': 'application/json',
            },
          }
        );
        const data = await res.json();
        const userAddress = data.display_name || 'Address not found';
        console.log('User Address:', userAddress);
        setAddress(userAddress);
      } catch (error) {
        console.log('Error fetching address:', error);
        setAddress('Address not found');
      }

      const fetchPlaces = async (type, setState, amenities) => {
        try {
          const query = `
            [out:json];
            (
              node["amenity"~"${amenities}"](around:5000,${loc.coords.latitude},${loc.coords.longitude});
              way["amenity"~"${amenities}"](around:5000,${loc.coords.latitude},${loc.coords.longitude});
              relation["amenity"~"${amenities}"](around:5000,${loc.coords.latitude},${loc.coords.longitude});
            );
            out center;
          `;

          const res = await fetch('https://overpass-api.de/api/interpreter', {
            method: 'POST',
            body: query,
          });

          const json = await res.json();
          console.log(`Fetched ${type}:`, json);
          setState(json.elements || []);
        } catch (error) {
          console.log(`Error fetching ${type}:`, error);
        }
      };

      fetchPlaces('Restaurants', setRestaurants, 'restaurant|fast_food|cafe|food_court|bar');
      fetchPlaces('Libraries', setLibraries, 'library');
      fetchPlaces('Theaters', setTheaters, 'theatre|cinema');
    })();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* 🔙 Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>⬅ Back</Text>
      </TouchableOpacity>

      <Text style={styles.header}>📍 Location</Text>

      <Text style={styles.label}>Your Address:</Text>
      <Text style={styles.text}>{address}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Show Map" onPress={() => setShowMap(true)} />
      </View>

      {showMap && location && (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            showsUserLocation={true}
          >
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="You are here"
            />
          </MapView>
        </View>
      )}

      <Text style={styles.label}>🍽️ Nearby Restaurants:</Text>
      {restaurants.length > 0 ? (
        restaurants.map((place, index) => (
          <Text key={`rest-${index}`} style={styles.item}>
            {place.tags?.name || 'Unnamed'} ({place.tags?.amenity})
          </Text>
        ))
      ) : (
        <Text style={styles.text}>No restaurants found nearby.</Text>
      )}

      <Text style={styles.label}>📚 Nearby Libraries:</Text>
      {libraries.length > 0 ? (
        libraries.map((place, index) => (
          <Text key={`lib-${index}`} style={styles.item}>
            {place.tags?.name || 'Unnamed'} ({place.tags?.amenity})
          </Text>
        ))
      ) : (
        <Text style={styles.text}>No libraries found nearby.</Text>
      )}

      <Text style={styles.label}>🎭 Nearby Theaters:</Text>
      {theaters.length > 0 ? (
        theaters.map((place, index) => (
          <Text key={`theatre-${index}`} style={styles.item}>
            {place.tags?.name || 'Unnamed'} ({place.tags?.amenity})
          </Text>
        ))
      ) : (
        <Text style={styles.text}>No theaters found nearby.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 10,
    backgroundColor: '#eee',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  backText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 60,
    marginBottom: 12,
    color: '#444',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 16,
  },
  text: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  item: {
    paddingVertical: 6,
    fontSize: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  mapContainer: {
    height: 300,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
