import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, Image, StatusBar, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Itemcard from './componenets/fundraiser';
import { auth, app } from '../firebase';
import { Firestore, addDoc, collection, doc, getFirestore, setDoc, query, onSnapshot } from "firebase/firestore";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomHeader from './main/customheader';
import { NavigationContainer } from '@react-navigation/native';
import { BottomNavigation } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MyListings from './screens/MyListings';
import NewListing from './screens/NewListing';
import Fundraiser from './fundraiser';

// const email = auth.currentUser?.email;
// const db = getFirestore(app);

// let uid;
// const user = auth.currentUser;
// if (user !== null) {
//     uid = user.uid;
// }
// async function queryForDoc() {
//     const q = query(collection(db, "/All_Listings/" + uid + "/item/"));

//     return new Promise((resolve, reject) => {
//         const unsubscribe = onSnapshot(q, (querySnapshot) => {
//             const data = [];
//             querySnapshot.forEach((doc) => {
//                 data.push(doc.data());
//             });

//             resolve(data);  // Resolve the promise with the data
//         }, (error) => {
//             reject(error);  // Reject the promise with an error if something goes wrong
//         });
//     });
// }


const item1 =
{
    title: 'Car',
    price: '100000',
    image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?cs=srgb&dl=car-vehicle-luxury-116675.jpg&fm=jpg',
}
const item2 =
{
    title: 'Galaxy S21 FE',
    price: '20000',
    image: 'https://techstory.in/wp-content/uploads/2021/06/E3EoMM1WYAECjW3-1014x1024.jpg',
}

const item3 =
{
    title: 'Sofa',
    price: '10000',
    image: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/08/07/13/lifestyle.jpg',
}


const HomeScreen = () => {
    // const [cities, setCities] = useState([]);

    // useEffect(() => {
    //     queryForDoc()
    //         .then((data) => {
    //             setCities(data);
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching data:", error);
    //         });
    // }, []); 

    // return (
    //     <SafeAreaView>

    //         <ScrollView style={styles.scrollView}>
    //             <View style={{ alignItems: 'center' }}>
    //                 <Itemcard item={item1} />
    //                 <Itemcard item={item2} />
    //                 <Itemcard item={item3} />
    //                 {cities.map((city, index) => (
    //                     <Itemcard key={index} item={city} />
    //                 ))}
    //             </View>
    //         </ScrollView>
    //     </SafeAreaView>
    // );




    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'fundraiser', title: 'Fundraiser', focusedIcon: require('./assets/tab/fundraiserdark.png'), unfocusedIcon: require('./assets/tab/fundraiser.png') },
        { key: 'user', title: 'Others', focusedIcon: require('./assets/tab/peoplelistingdark.png'), unfocusedIcon: require('./assets/tab/peoplelisting.png') },
        { key: 'mylist', title: 'My Donations', focusedIcon: require('./assets/tab/donationdark.png'), unfocusedIcon: require('./assets/tab/donation.png') },
        { key: 'newlist', title: 'Donate', focusedIcon: require('./assets/tab/adddark.png'), unfocusedIcon: require('./assets/tab/add.png') },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        fundraiser: Fundraiser,
        user: UserPage,
        mylist: MyListings,
        newlist: NewListing
    });


    return (
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






// function HomeScreen({ navigation }) {
//     const insets = useSafeAreaInsets();

//     return (
//         <View style={styles.container}>
//             <CustomHeader />
//             <View style={styles.scrollcontainer}>

//                 <App />
//             </View>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#E0F4F4',
//         alignItems: 'center',
//         flexDirection: 'column',

//     },



//     scrollcontainer: {
//         marginTop: 4,
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         width: Dimensions.get('window').width + 10,
//         marginBottom: 4,
//         borderRadius: 30,
//         backgroundColor: '#E0F4F4',
//         overflow: 'hidden',
//         // borderWidth: 1,
//         // borderColor: '#00D4C8'

//     },
//     text: {
//         fontSize: 42,
//     },

// });

export default HomeScreen;