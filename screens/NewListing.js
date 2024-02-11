import React, { Component, useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity, TextInput, Pressable, Modal, KeyboardAvoidingView } from 'react-native';
import { auth, app } from '../firebase';
import { Firestore, addDoc, collection, doc, getFirestore, setDoc } from "firebase/firestore";
import * as ImagePicker from 'expo-image-picker';
import Openmap from './componenets/openmap';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


function NewListing({ navigation }) {
    const [title, settitle] = useState('');
    const [quantity, setquantity] = useState(0);
    const [category, setcategory] = useState('');
    const [description, setdescription] = useState('');
    const [address, setaddress] = useState(null);
    const [image, setimage] = useState('');
    const [location, setlocation] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    // const [modalVisible, setModalVisible] = useState(false);


    let uid;
    const user = auth.currentUser;
    if (user !== null) {
        uid = user.uid;
    }
    console.log(uid);
    const db = getFirestore(app);

    const path = doc(db, '/All_Listings/' + uid);


    async function initdoc() {
        try {
            await setDoc(path, {}, { merge: true });
            console.log('value has been written to db')
        }
        catch (error) {
            console.log('error occuered ${error}')
        }

    }
    initdoc();  // calling function to initialize the user space , merge if exists

    const usercollection = collection(db, '/All_Listings/' + uid + '/item/');// create a subcollection item for each user

    async function addANewDocument(downloadURL) {
        try {
            const docRef = await addDoc(usercollection, {
                title: title,
                quantity: quantity,
                category: category,
                description: description,
                address: address,
                location: location,
                urlimage: downloadURL
            });
            console.log("Document written with ID: ", docRef.id);
            alert('listing added successfully');
            navigation.goBack();
        }
        catch (e) {
            alert("error adding doc");
        }

    }



    const storage = getStorage(app);
    const storageref = ref(storage, `${uid}-${Date.now()}`);
    async function uploadImage() {
        if (title && quantity && description && category && address && image && location) {

            const response = await fetch(image);
            const blob = await response.blob();
            // delete first
            const uploadTask = uploadBytesResumable(storageref, blob);
            uploadTask.on('state_changed',
                (snapshot) => {
                    // setprogress(snapshot.bytesTransferred / snapshot.totalBytes);
                },
                (error) => {
                    // Handle unsuccessful uploads
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log(downloadURL);
                        addANewDocument(downloadURL);
                        // now upload the data
                    });
                }
            );
        }
        else {
            alert('incomplete fields')
        }

    }



    async function pickImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [5, 3],
            quality: 0.999,
        });

        if (!result.canceled) {
            setimage(result.assets[0].uri);
        }
    }




    return (

        <KeyboardAvoidingView
            style={{ flex: 1, }}
            behavior='height'
        >
            <ScrollView contentContainerStyle={styles.container}>

                <View style={{ backgroundColor: '#fff', flex: 1 }}>

                    <View style={{ marginTop: 45, marginLeft: 20, marginBottom: 15 }}>
                        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 32 }}>
                            New Donation
                        </Text>
                    </View>

                    <TouchableOpacity
                        onPress={pickImage}
                        activeOpacity={0.6}
                        style={{
                            marginLeft: 10, marginBottom: 20, borderRadius: 23,
                            backgroundColor: '#E0F4F4', width: 130
                        }}>
                        {image ? <Image
                            style={{ width: 250, height: 150, borderRadius: 15 }}
                            source={{ uri: image }}
                        /> : <Image
                            style={{ height: 60, width: 60, margin: 35 }}
                            source={require('../assets/camera.png')}
                        />}


                    </TouchableOpacity>


                    <View style={{ ...styles.inputcontainor, width: 270 }}>
                        <Image
                            style={styles.image}
                            source={require('../assets/title.png')}
                        />
                        <View style={{ justifyContent: 'center', flex: 1, paddingBottom: 3, }}>
                            <TextInput
                                placeholder='Title'
                                value={title}
                                onChangeText={text => settitle(text)}
                                style={styles.input}
                            />
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row' }}>

                        <View style={{ ...styles.inputcontainor, width: 100 }}>
                            <Image
                                style={{ ...styles.image, height: 25, width: 25, marginTop: 12, marginLeft: 13 }}
                                source={require('../assets/quantity.png')}
                            />
                            <View style={{ justifyContent: 'center', flex: 1, paddingBottom: 3, paddingRight: 8 }}>
                                <TextInput
                                    keyboardType='number-pad'
                                    placeholder='Qty'
                                    value={quantity}
                                    onChangeText={text => setquantity(text)}
                                    style={styles.input}
                                />
                            </View>
                        </View>


                        <View style={{ ...styles.inputcontainor, width: 220 }}>
                            <Image
                                style={styles.image}
                                source={require('../assets/category.png')}
                            />
                            <View style={{ justifyContent: 'center', flex: 1, paddingBottom: 3, }}>
                                <TextInput
                                    placeholder='Category'
                                    value={category}
                                    onChangeText={text => setcategory(text)}
                                    style={styles.input}
                                />
                            </View>
                        </View>
                    </View>


                    <View style={{ ...styles.inputcontainor, width: Dimensions.get('window').width - 20 }}>
                        <Image
                            style={styles.image}
                            source={require('../assets/description.png')}
                        />
                        <View style={{ justifyContent: 'center', flex: 1, paddingBottom: 3, }}>
                            <TextInput
                                multiline={true}
                                placeholder='Description'
                                value={description}
                                onChangeText={text => setdescription(text)}
                                style={styles.input}
                            />
                        </View>
                    </View>

                    <View
                        style={{ ...styles.inputcontainor, width: Dimensions.get('window').width - 30 }}>
                        <Image
                            style={styles.image}
                            source={require('../assets/address.png')}
                        />
                        <View style={{ justifyContent: 'center', flex: 1, paddingBottom: 3, }}>
                            {<TextInput
                                multiline={true}
                                placeholder='Address'
                                value={address}
                                onChangeText={text => setaddress(text)}
                                style={styles.input}
                            />}

                        </View>
                    </View>


                    <Pressable
                        onPress={() => { setModalVisible(true) }}
                        style={{ ...styles.inputcontainor, width: 220 }}>
                        <Image
                            style={styles.image}
                            source={require('../assets/location.png')}
                        />
                        <View style={{ justifyContent: 'center', flex: 1, paddingBottom: 3, }}>
                            <Text
                                style={{ ...styles.input }}
                            >{location !== null ? 'Selected' : 'Select Location'}{console.log(address)}</Text>
                        </View>
                    </Pressable>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}

                    // onRequestClose={() => {
                    //     Alert.alert('Modal has been closed.');
                    //     setModalVisible(!modalVisible);
                    // }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Openmap setaddress={setlocation} />
                                <TouchableOpacity
                                    style={[styles.button2, styles.buttonClose]}
                                    onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={styles.textStyle}>Select</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>



                    <Pressable
                        onPress={uploadImage}
                        style={({ pressed }) => [
                            {
                                elevation: pressed ? 0 : 3,
                                backgroundColor: pressed ? '#00c8c8' : '#00ADAD',
                            },
                            styles.button,
                        ]}>
                        <Text style={{
                            fontSize: 37, fontFamily: 'Poppins-Regular', marginTop: -2
                        }}>Post</Text>

                    </Pressable>

                    <View style={{ marginTop: 15, alignItems: 'center', }}
                    >
                        <TouchableOpacity onPress={() => { navigation.goBack() }}>
                            <Text style={{ fontSize: 20, fontWeight: '200' }}>Cancel</Text>
                        </TouchableOpacity>

                    </View>



                </View >
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    inputcontainor:
    {
        width: 270,
        borderRadius: 23,
        backgroundColor: '#E0F4F4',
        marginLeft: 10,
        flexDirection: 'row',
        marginBottom: 18,

    },
    input: {
        fontSize: 20,
        fontFamily: 'Montserrat-Regular',
    },
    image: {
        height: 28, width: 28, marginLeft: 10, marginTop: 10, marginBottom: 11, marginRight: 6,
    },
    button:
    {

        height: 50,
        width: 320,
        borderRadius: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        // Elevation for Android
        marginTop: 20,
        marginLeft: 20,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width + 200,
        backgroundColor: 'white',
        borderRadius: 40,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button2: {
        padding: 8,
        elevation: 1,
        alignItems: 'center',
        backgroundColor: '#00B2FF',



    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
})

export default NewListing;