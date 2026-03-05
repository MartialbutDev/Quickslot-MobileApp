import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import MobileLogin from './src/components/MobileLogin';
import MobileDashboard from './src/components/MobileDashboard';
import MobileGadgetList from './src/components/MobileGadgetList';
import MobileGadgetDetails from './src/components/MobileGadgetDetails';
import MobileRentals from './src/components/MobileRentals';
import MobileProfile from './src/components/MobileProfile';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#667eea',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Login" 
          component={MobileLogin} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Dashboard" 
          component={MobileDashboard} 
          options={{ headerLeft: null, title: 'QuickSlot' }}
        />
        <Stack.Screen 
          name="GadgetList" 
          component={MobileGadgetList} 
          options={{ title: 'Available Gadgets' }}
        />
        <Stack.Screen 
          name="GadgetDetails" 
          component={MobileGadgetDetails} 
          options={{ title: 'Gadget Details' }}
        />
        <Stack.Screen 
          name="Rentals" 
          component={MobileRentals} 
          options={{ title: 'My Rentals' }}
        />
        <Stack.Screen 
          name="Profile" 
          component={MobileProfile} 
          options={{ title: 'My Profile' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}