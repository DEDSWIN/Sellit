import React from 'react';
import { View, Text, StyleSheet, Platform, Image, Button, TouchableHighlight, TouchableOpacity, Dimensions } from 'react-native';
import DropdownComponent from './dropdown';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const CustomHeader = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    return (
        <View style={[styles.header, { paddingTop: insets.top }]}>
            <TouchableOpacity onPress={() => { navigation.navigate('userpage') }}>
                <Image
                    style={{ height: 55, width: 55, borderRadius: 28, marginTop: 5, }}
                    source={require('../../assets/1.png')}
                />
            </TouchableOpacity>


        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 'auto',
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        backgroundColor: '#E0F4F4',
        justifyContent: 'center',
        alignItems: 'center',


    },
    headerText: {
        color: 'white',
        fontSize: 18,
    },
});

export default CustomHeader;
