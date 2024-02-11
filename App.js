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

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'home', title: 'Fundraiser', focusedIcon: require('./assets/tab/fundraiserdark.png'), unfocusedIcon: require('./assets/tab/fundraiser.png') },
    { key: 'user', title: 'Others', focusedIcon: require('./assets/tab/peoplelistingdark.png'), unfocusedIcon: require('./assets/tab/peoplelisting.png') },
    { key: 'mylist', title: 'My Donations', focusedIcon: require('./assets/tab/donationdark.png'), unfocusedIcon: require('./assets/tab/donation.png') },
    { key: 'newlist', title: 'Donate', focusedIcon: require('./assets/tab/adddark.png'), unfocusedIcon: require('./assets/tab/add.png') },
  ]);

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




  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    user: UserPage,
    mylist: MyListings,
    newlist: NewListing

  });

  return (
    // <NavigationContainer>
    //   <Stack.Navigator screenOptions={{
    //     animation: 'none'
    //   }}>

    //     {/* <Stack.Screen name='progressbar'
    //       component={ProgressBar}
    //       options={{ headerShown: false }} /> */}

    //     {/*
    //     <Stack.Screen name='donationcard'
    //       component={Donationcard}
    //       options={{ headerShown: false }} /> */}
    //     <Stack.Screen name='login'
    //       component={LoginScreen}
    //       options={{ headerShown: false }} />
    //     <Stack.Screen name='mylistings'
    //       component={MyListings}
    //       options={{ headerShown: false }} />
    //     <Stack.Screen name='mapselect'
    //       component={mapselect}
    //       options={{ headerShown: false }} />
    //     <Stack.Screen name='modal'
    //       component={Modal}
    //       options={{ headerShown: false }} />

    //     <Stack.Screen name='profilephoto'
    //       component={ProfilePhoto}
    //       options={{ headerShown: false }} />

    //     <Stack.Screen name='userpage'
    //       component={UserPage}
    //       options={{ headerShown: false }} />
    //     <Stack.Screen name='Register'
    //       component={RegisterScreen}
    //       options={{ headerShown: false }} />





    //     <Stack.Screen name='Homescreen'
    //       component={HomeScreen}
    //       options={{ header: ({ scene }) => <CustomHeader title='home' /> }} />

    //     <Stack.Screen name='newlisting'
    //       component={NewListing}
    //       options={{ headerShown: false }} />


    //     <Stack.Screen name='passwordreset'
    //       component={PasswordReset}
    //       options={{ headerShown: false }} />
    //     <Stack.Screen name='customheader'
    //       component={CustomHeader}
    //       options={{ headerShown: false }} />




    //   </Stack.Navigator>
    // </NavigationContainer>
    <NavigationContainer>
      <SafeAreaProvider>
        <BottomNavigation
          shifting={true}
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
          activeColor='#000000'
          inactiveColor='#342D2D'
          sceneAnimationEnabled={true}
          sceneAnimationType='shifting'
          barStyle={{ backgroundColor: '#E0F4F4', height: 70 }}
          activeIndicatorStyle={{ backgroundColor: '#8CD8D3' }}
          style={{ height: 900 }}
        />
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;
