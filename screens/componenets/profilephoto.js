import { Dimensions, Image, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from 'react';
import { app, auth } from "../../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import * as ImagePicker from 'expo-image-picker';
import ProgressBar from "./progressbar";


export default function ProfilePhoto({ navigation }) {

    [imglink, setImagelink] = useState("");
    [Progress, setprogress] = useState(0);

    const user = auth.currentUser;
    useEffect(() => {                              // first time photo
        if (user !== null) {
            setImagelink(user.photoURL);
        }
    }, []);



    async function pickImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
        });

        if (!result.canceled) {
            await uploadImage(result.assets[0].uri);
            console.log(result.assets[0].uri);
        }
    }

    const storage = getStorage(app);
    const storageref = ref(storage, user.uid);//give name to file as user.uid

    async function uploadImage(uri) {

        const response = await fetch(uri);
        const blob = await response.blob();
        // delete first
        const uploadTask = uploadBytesResumable(storageref, blob);
        uploadTask.on('state_changed',
            (snapshot) => {
                setprogress(snapshot.bytesTransferred / snapshot.totalBytes);
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImagelink(downloadURL);
                    updateProfile(user, { photoURL: downloadURL });
                    setprogress(0);
                });
            }
        );


    }



    const scrwidth = Dimensions.get('window').width;


    return (
        <View style={{ flex: 1, backgroundColor: '#0F0F0F' }}>

            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Image style={{ width: scrwidth, height: scrwidth, marginBottom: -40 }}
                    source={{ uri: `${imglink}` }} />

                <TouchableOpacity
                    onPress={pickImage}
                    style={{ height: 40, width: scrwidth, opacity: 0.6, backgroundColor: '#8F8F8F', alignItems: 'center' }}>
                    <Image style={{ marginTop: 5, marginBottom: 5, height: 30, width: 30 }}
                        source={require('../../assets/edit.png')}
                    />
                </TouchableOpacity>
                {Progress === 0 ? null : <ProgressBar progress={Progress.toFixed()} />}

            </View>

            <View
                style={{ height: 35, width: scrwidth, position: 'absolute', bottom: 20, alignItems: 'center' }}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Image style={{ height: 35, width: 35 }}
                        source={require('../../assets/back.png')} />
                </TouchableOpacity>
            </View>

        </View>
    )

}