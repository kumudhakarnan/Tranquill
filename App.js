import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './app/login';
import Welcome from './app/welcome';
import Signup from './app/signup';
import Pg1 from './app/pg1';
import Pg2 from './app/pg2';
import q1 from './app/q1';
import q2 from './app/q2';
import q3 from './app/q3';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup}/>
        <Stack.Screen name="pg1" component={Pg1}/>
        <Stack.Screen name="pg2" component={Pg2}/>
        <Stack.Screen name="q1" component={q1}/>
        <Stack.Screen name="q2" component={q2}/>
        <Stack.Screen name="q3" component={q3}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
