import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './app/login';
import Welcome from './app/welcome';
import Signup from './app/signup';
import Pg1 from './app/pg1';
import Pg2 from './app/pg2';
import Q1 from './app/q1';
import Q2 from './app/q2';
import Q3 from './app/q3';
import Q4 from './app/q4';
import Q6 from './app/q6';
import Q5 from './app/q5';
import Q7 from './app/q7';
import Q8 from './app/q8';
import Q9 from './app/q9';
import Q10 from './app/q10';
import Q11 from './app/q11';
import Q12 from './app/q12';
import Q13 from './app/q13';
import Q14 from './app/q14';
import Q15 from './app/q15';
import Hp from './app/homepg';
import Tasks from './app/task';
import Relaxation from './app/relaxation';
import Journal from './app/journal';
import Profile from './app/pp';
import Reminders from './app/rem';
import NP from './app/np';
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
        <Stack.Screen name="q1" component={Q1}/>
        <Stack.Screen name="q2" component={Q2}/>
        <Stack.Screen name="q3" component={Q3}/>
        <Stack.Screen name="q4" component={Q4}/>
        <Stack.Screen name="q5" component={Q5}/>
        <Stack.Screen name="q6" component={Q6}/>
        <Stack.Screen name="q7" component={Q7}/>
        <Stack.Screen name="q8" component={Q8}/>
        <Stack.Screen name="q9" component={Q9}/>
        <Stack.Screen name="q10" component={Q10}/>
        <Stack.Screen name="q11" component={Q11}/>
        <Stack.Screen name="q12" component={Q12}/>
        <Stack.Screen name="q13" component={Q13}/>
        <Stack.Screen name="q14" component={Q14}/>
        <Stack.Screen name="q15" component={Q15}/>
        <Stack.Screen name="Homepage" component={Hp}/>
        <Stack.Screen name="Journal" component={Journal}/>
        <Stack.Screen name ="Tasks" component={Tasks}/>
        <Stack.Screen name ="Relaxation" component={Relaxation}/>
        <Stack.Screen name="Profile" component={Profile}/>
        <Stack.Screen name="Reminders" component={Reminders}/>
        <Stack.Screen name="np" component={NP}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}
