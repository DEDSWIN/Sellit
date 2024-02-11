import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import Itemcard from './componenets/fundraiser';
import Donationcard from './componenets/donationcard';
import { auth, app } from '../firebase';
import { Firestore, addDoc, collection, doc, getFirestore, setDoc, query, onSnapshot } from "firebase/firestore";

const email = auth.currentUser?.email;
const db = getFirestore(app);

let uid;
const user = auth.currentUser;
if (user !== null) {
    uid = user.uid;
}
async function queryForDoc() {
    const q = query(collection(db, "/All_Listings/" + uid + "/item/"));

    return new Promise((resolve, reject) => {
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push(doc.data());
            });

            resolve(data);  // Resolve the promise with the data
        }, (error) => {
            reject(error);  // Reject the promise with an error if something goes wrong
        });
    });
}



const item1 =
{
    title: 'Vanquish Their ab',
    price: '10000',
    image: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/08/07/13/lifestyle.jpg',
    cause: 'Support The Children of ABC city slums to have a full belly meal.',
    progress: 34,
    quantity: 7
}
const item2 =
{
    title: 'Vanquish Their ab',
    price: '10000',
    image: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/08/07/13/lifestyle.jpg',
    cause: 'Support The Children of ABC city slums to have a full belly mdkfjhdksjhd skdjfhks f kdjfhd jd fjd fdh f dkjfhdjfhdf eal.',
    progress: 34,
    quantity: 89,
}



const BottomBar = () => {
    return (
        <View style={styles.bottomBar}>
            <Text style={styles.bottomBarText}>Bottom Bar</Text>

        </View>
    );
};

const App = () => {
    const [cities, setCities] = useState([]);

    useEffect(() => {
        queryForDoc()
            .then((data) => {
                setCities(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []); // Empty dependency array means this effect runs once when the component mounts

    return (
        <SafeAreaView>
            <ScrollView style={styles.scrollView}>
                <Itemcard item={item1} />
                <Donationcard item={item2} />
                {cities.map((city, index) => (
                    <Itemcard key={index} item={city} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};


function MyListings({ navigation }) {


    return (
        <View style={styles.container}>

            <View style={styles.scrollcontainer}><App /></View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                <TouchableOpacity
                    style={{
                        borderTopLeftRadius: 40, borderTopRightRadius: 40, backgroundColor: '#F8F8F8',
                        height: 50, width: Dimensions.get('window').width,
                        marginTop: 3, alignItems: 'center', justifyContent: 'center',
                    }}
                    onPress=
                    {
                        () => navigation.navigate('newlisting')
                    }
                >
                    <Text style={{ fontSize: 19, fontWeight: 'bold' }}>
                        ADD ITEM
                    </Text>
                </TouchableOpacity>
            </View>


        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#87C8C8',
        // alignItems: 'center',
        // justifyContent: 'center',
        flexDirection: 'column',

    },



    scrollcontainer: {
        marginTop: 33,
        flex: 1,
        alignItems: 'center'

    },
    scrollView: {
        backgroundColor: '#87C8C8',
        marginHorizontal: 0,
    },
    text: {
        fontSize: 42,
    },

});

export default MyListings;
