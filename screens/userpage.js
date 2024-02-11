import React, { useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { auth, app } from '../firebase';
import { signOut } from 'firebase/auth';
let email, displayName;
const scrwidth = Dimensions.get('window').width;

function arrow() {
    return (
        <View style={{ width: 60, height: 60, justifyContent: 'center', alignItems: 'center' }}>
            <Image style={{ height: 34, width: 34, }}
                source={require('../assets/arrow.png')} />
        </View>
    )
}

function UserPage({ navigation }) {

    [imglink, setimagelink] = useState('');


    useFocusEffect(() => {
        const user = auth.currentUser;
        if (user !== null) {
            email = user.email;
            displayName = user.displayName;
            setimagelink(user.photoURL);
        }
    });



    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>


            <View style={{ height: 120, width: scrwidth, flexDirection: 'row', marginTop: 80, marginBottom: 50, backgroundColor: '#E0F4F4', borderRadius: 20 }}>
                <View style={{ width: 110, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => { navigation.navigate('profilephoto') }}>
                        <Image style={{ height: 80, width: 80, borderRadius: 40, }}
                            source={{ uri: `${imglink}` }} />
                    </TouchableOpacity>
                </View>


                <View style={{ flex: 1, marginTop: 25, height: 100 }}>
                    <Text style={{ fontSize: 30, color: '#000' }}>
                        {displayName}
                    </Text>
                    <Text style={{ fontSize: 18 }}>
                        {email}
                    </Text>

                </View>
            </View >



            <TouchableOpacity style={{
                flexDirection: 'row', backgroundColor: '#E0F4F4', height: 60, alignItems: 'center', marginBottom: 4, borderRadius: 20
            }}
                onPress={() => {
                    // function here
                }}>
                <View style={{ width: 60, alignItems: 'center', justifyContent: 'center', paddingLeft: 5 }}>
                    <Image style={{ height: 37, width: 37, }}
                        source={require('../assets/List.png')} />
                </View>
                <Text style={{ fontSize: 23, flex: 1, paddingLeft: 10, marginTop: -2 }}>
                    My Listings
                </Text>
                {arrow()}
            </TouchableOpacity>



            <TouchableOpacity style={{
                flexDirection: 'row', backgroundColor: '#E0F4F4', height: 60, alignItems: 'center', marginBottom: 40, borderRadius: 20
            }}
                onPress={() => {
                    // function here
                }}>

                <View style={{ width: 60, alignItems: 'center', justifyContent: 'center', paddingLeft: 5 }}>
                    <Image style={{ height: 30, width: 30, }}
                        source={require('../assets/message.png')} />
                </View>
                <Text style={{ fontSize: 23, flex: 1, paddingLeft: 10, marginTop: -2 }}>
                    My Messages
                </Text>
                {arrow()}

            </TouchableOpacity>



            <TouchableOpacity style={{
                flexDirection: 'row', backgroundColor: '#E0F4F4', height: 60, alignItems: 'center', borderRadius: 20
            }}
                onPress={() => {
                    signOut(auth).then(() => {
                        // Sign-out successful.
                    }).catch((error) => {
                        // An error happened.
                    });
                    alert("logged out successfully")
                    navigation.navigate('login')
                }}>
                <View style={{ width: 60, alignItems: 'center', justifyContent: 'center', paddingLeft: 5 }}>
                    <Image style={{ height: 36, width: 36, }}
                        source={require('../assets/Logout.png')} />
                </View>
                <Text style={{ fontSize: 23, flex: 1, paddingLeft: 10, marginTop: -2 }}>
                    Log out
                </Text>
                {arrow()}
            </TouchableOpacity>



            <View
                style={{ height: 45, width: scrwidth, position: 'absolute', bottom: 25 }}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Image style={{ height: 45, width: 45, marginLeft: scrwidth / 2 - 18 }}
                        source={require('../assets/backblack.png')} />
                </TouchableOpacity>
            </View>



        </View >
    )
}

export default UserPage;