import { StyleSheet, Button, Text, View, Image, TouchableOpacity, Dimensions, ScrollView, TouchableHighlight } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { TextInput } from 'react-native'
import { auth } from '../firebase'
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";


export default function LoginScreen({ navigation }) {

  const [email, setEmail] = useState('')
  const [Password, setPassword] = useState('')




  const login = () => {
    signInWithEmailAndPassword(auth, email, Password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user.email);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.replace("Homescreen")
      }

    }
    )
    return unsubscribe
  }, [])

  const reset = () => {
    navigation.navigate("passwordreset")
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
            style={{ marginTop: 100, marginBottom: 5, }}
          />
          <Text style={{ marginBottom: 90, fontSize: 25 }}>SeLL IT</Text>
        </View>


        <View style={{ backgroundColor: '#87C8C8', flex: 1, }}>
          <View style={styles.logincontainer}>

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

            <View>
              <TouchableOpacity
                touchSoundDisabled='true'
                activeOpacity={0.5}
                onPress={login}
                style={styles.button}>
                <Text style={{
                  color: '#fff',
                  fontSize: 25,
                  fontWeight: 'bold',
                }}>
                  LOGIN
                </Text>

              </TouchableOpacity>

              <TouchableHighlight
                activeOpacity={0.6}
                underlayColor="#DDDDDD"
                onPress={() => { navigation.navigate('Register') }}
                style={styles.button2}>
                <Text style={{
                  color: '#373737',
                  fontSize: 25,
                  fontWeight: 'bold',
                }}>
                  REGISTER
                </Text>
              </TouchableHighlight>

              <TouchableOpacity
                onPress={reset}
                style={{ justifyContent: 'center', alignItems: 'center', }}>
                <Text style={{
                  color: '#000',
                  fontSize: 18,

                }}>
                  {"forgot password? reset here ->"}
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
    backgroundColor: '#fff',
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
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderBlockColor: '#161616',


  },

});
