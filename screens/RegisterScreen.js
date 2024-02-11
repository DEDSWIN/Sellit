import { StyleSheet, Button, Text, View, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { TextInput } from 'react-native'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";


export default function RegisterScreen({ navigation }) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [conPassword, setconPassword] = useState('')




    const signup = async () => {
        if (Password === conPassword) {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, Password);
                const user = userCredential.user;
                await updateProfile(user, {
                    displayName: name,
                    photoURL: "https://www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg"
                });
                alert("user registered");
                console.log(user.displayName); // Now displayName should be set
                console.log(user.email);
            } catch (error) {
                alert(error.message);
                // Handle errors
            }
        } else {
            alert("password don't match confirm password");
        }
    };




    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigation.replace("Homescreen")
            }

        }
        )
        return unsubscribe
    }, [])




    return (

        <KeyboardAvoidingView
            style={{ flex: 1, }}
            behavior='height'
        >
            <ScrollView contentContainerStyle={styles.container}>


                <View style={{ backgroundColor: '#87C8C8', justifyContent: 'center', alignItems: 'center', }}>
                    <Image
                        source={require('../assets/icon.png')}
                        style={{ marginTop: 80, marginBottom: 5, height: 60, width: 60 }}
                    />
                    <Text style={{ marginBottom: 70, fontSize: 25 }}>Charity Donate</Text>
                </View>


                <View style={{ backgroundColor: '#87C8C8', flex: 1, }}>
                    <View style={styles.logincontainer}>

                        <TextInput
                            placeholder='Name'
                            value={name}
                            onChangeText={text => setName(text)}
                            style={styles.input} />
                        <TextInput
                            placeholder='Email'
                            value={email}
                            onChangeText={text => setEmail(text)}
                            style={styles.input} />
                        <TextInput
                            placeholder='Password'
                            value={Password}
                            onChangeText={text => setPassword(text)}
                            style={styles.input}
                            secureTextEntry />
                        <TextInput
                            placeholder='Confirm Password'
                            value={conPassword}
                            onChangeText={text => setconPassword(text)}
                            style={styles.input}
                            secureTextEntry />

                        <View>

                            <TouchableOpacity
                                touchSoundDisabled='true'
                                activeOpacity={0.5}
                                onPress={signup}
                                style={styles.button}>
                                <Text style={{
                                    color: '#fff',
                                    fontSize: 25,
                                    fontWeight: 'bold',
                                }}>
                                    REGISTER
                                </Text>

                            </TouchableOpacity>

                            <TouchableOpacity
                                activeOpacity={0.6}
                                underlayColor="#DDDDDD"
                                onPress={() => { navigation.goBack() }}

                                style={styles.button2}>
                                <Text style={{
                                    color: '#8B8888',
                                    fontSize: 25,
                                    fontWeight: 'bold',

                                }}>
                                    LOGIN
                                </Text>
                            </TouchableOpacity>



                        </View>

                    </View>
                </View>

            </ScrollView>

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
    },

    logincontainer:
    {
        flex: 1,
        borderWidth: 0.5,
        borderColor: '#8B8888',
        backgroundColor: '#E0F4F4',
        borderTopRightRadius: 35,
        borderTopLeftRadius: 35,
        padding: 10, // Adjust padding as needed
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: {
            width: -4,
            height: 4,
        },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 5,
        alignItems: 'center',
        paddingTop: 20,
    },
    input:
    {
        width: Dimensions.get('window').width - 30,
        height: 60,
        borderRadius: 16,
        backgroundColor: '#FFF',
        fontSize: 18,
        paddingLeft: 10,
        overflow: 'hidden',
        borderWidth: 0.5,
        borderColor: '#C3C3C3',
        marginBottom: 20,

    },
    button:
    {
        width: Dimensions.get('window').width - 30,
        height: 70,
        borderRadius: 40,
        backgroundColor: '#161616',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 1,


    },
    button2:
    {
        width: Dimensions.get('window').width - 30,
        height: 60,
        borderRadius: 40,
        backgroundColor: '#F8F8F8',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 2,
        borderBlockColor: '#161616',


    },

});
