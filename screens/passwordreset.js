import { StyleSheet, Button, Text, View, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { TextInput } from 'react-native'
import { auth } from '../firebase'
import { sendPasswordResetEmail } from "firebase/auth";


export default function PasswordReset({ navigation }) {

    const [email, setEmail] = useState('')
    const reset = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("email sent !");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
            });
    }




    return (

        <KeyboardAvoidingView
            style={{ flex: 1, }}
            behavior='height'
        >
            <ScrollView contentContainerStyle={styles.container}>


                <View style={{ backgroundColor: '#87C8C8', justifyContent: 'center', alignItems: 'center', }}>
                    <Image
                        source={require('../assets/dollar.png')}
                        style={{ marginTop: 150, marginBottom: 5, }}
                    />
                    <Text style={{ marginBottom: 140, fontSize: 25 }}>SeLL IT</Text>
                </View>


                <View style={{ backgroundColor: '#87C8C8', flex: 1, }}>
                    <View style={styles.logincontainer}>

                        <TextInput
                            placeholder='Enter email'
                            value={email}
                            onChangeText={text => setEmail(text)}
                            style={styles.input} />

                        <View>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                underlayColor="#DDDDDD"
                                onPress={reset}
                                style={styles.button}>
                                <Text style={{
                                    color: '#fff',
                                    fontSize: 25,
                                    fontWeight: 'bold',
                                }}>
                                    Send Link
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
        paddingTop: 30,
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
        marginBottom: 30,

    },
    button:
    {
        width: Dimensions.get('window').width - 30,
        height: 70,
        borderRadius: 40,
        backgroundColor: '#161616',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        borderWidth: 1,


    },


});
