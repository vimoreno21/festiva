import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Home';
import LoginScreen from './Login';
import SignupScreen from './Signup';
import GuestScreen from './Guest';
import * as Font from 'expo-font';

const Stack = createNativeStackNavigator();

async function loadCustomFonts() {
  await Font.loadAsync({
    'BalonkuRegular': require('./assets/fonts/BalonkuRegular.otf'),
  });
}

export default function App() {
  React.useEffect(() => {
    // Load custom fonts before rendering the app
    loadCustomFonts();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Guest" component={GuestScreen} />
        {/* Add more screens/routes as needed */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};