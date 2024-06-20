import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { BottomNavigation } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CustomHeader from './screens/main/customheader';
import MainScreen from './screens/main/MainScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/home';
import PasswordReset from './screens/passwordreset';
import MyListings from './screens/MyListings';
import NewListing from './screens/NewListing';
import UserPage from './screens/userpage';
import RegisterScreen from './screens/RegisterScreen';
import ProfilePhoto from './screens/componenets/profilephoto';
import ProgressBar from './screens/componenets/progressbar';
import Itemcard from './screens/componenets/fundraiser';
import { useFonts } from 'expo-font';
import * as Font from 'expo-font';
import Modal from './screens/componenets/modal';
import mapselect from './screens/componenets/openmap';
import Donationcard from './screens/componenets/donationcard';
import { SafeAreaProvider } from 'react-native-safe-area-context';


const customFonts = {
  'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
  'Poppins-Semibold': require('./assets/fonts/Poppins-SemiBold.ttf'),
  'OpenSans-Light': require('./assets/fonts/OpenSans-Light.ttf'),
  'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),
  'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
};

// const Stack = createNativeStackNavigator();

const App = () => {



  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync(customFonts)
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // Or show a loading indicator
  }




  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        animation: 'none'
      }}>

        <Stack.Screen name='login'
          component={LoginScreen}
          options={{ headerShown: false }} />

        <Stack.Screen name='Register'
          component={RegisterScreen}
          options={{ headerShown: false }} />

        <Stack.Screen name='passwordreset'
          component={PasswordReset}
          options={{ headerShown: false }} />




      </Stack.Navigator>
    </NavigationContainer>

  );
};

export default App;
