

import * as React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, Image, StatusBar, ScrollView, Dimensions, TouchableHighlight } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';


const scrwidth = Dimensions.get('window').width;

function Donationcard(props) {


    const { item } = props;
    return (

        <View style={styles.itemcard}>
            <Image
                style={{ height: 191, width: scrwidth - 8, borderTopLeftRadius: 30, borderTopRightRadius: 30, }}
                source={{ uri: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/08/07/13/lifestyle.jpg' }}
            />

            <View style={{ flexDirection: 'row', }}>
                <View style={{ flex: 1, padding: 12, paddingTop: 8, paddingRight: 10 }}>

                    <View style={{ justifyContent: 'center', marginBottom: -3 }}>
                        <Text style={{ fontSize: 20, fontFamily: 'Poppins-Semibold' }}>
                            {item.title}
                        </Text>
                    </View>

                    <View style={{ justifyContent: 'center' }}>
                        <Text style={{ fontSize: 13, fontFamily: 'OpenSans-Light' }}>
                            {item.cause}
                        </Text>
                    </View>

                    <TouchableHighlight
                        style={{ justifyContent: 'center', marginLeft: 5, marginTop: 2 }}
                        activeOpacity={0.1}
                    // onPress={}
                    >

                        <Text style={{ fontSize: 17, color: '#00B2FF' }}>
                            view more
                        </Text>
                    </TouchableHighlight>

                </View>
                {/* <AnimatedCircularProgress
                    style={{ margin: 10 }}
                    duration={1500}
                    lineCap='butt'
                    size={90}
                    width={8}
                    fill={6} // Progress percentage (0-100)
                    tintColor="#00e0ff"
                    backgroundColor="#5f5f5f"
                    onAnimationComplete={() => console.log('Animation complete')}
                    children={(fill) => (
                        <Text style={{ fontSize: 28, color: 'black', fontFamily: 'Poppins-Regular', paddingTop: 4, }}>
                            {Math.round(fill)}
                            <Text style={{ fontSize: 17 }}>%</Text>
                        </Text>
                    )}

                /> */}
                <View style={{ alignItems: 'center', marginRight: 13, marginTop: 9 }}>
                    <Text style={{ fontSize: 16, fontFamily: 'Poppins-Semibold' }}>
                        Quantity
                    </Text>
                    <Text style={{ fontSize: 17, fontFamily: 'Montserrat-Regular', marginTop: -5 }}>
                        {item.quantity}
                    </Text>

                </View>

            </View>

        </View>
    );
}



const styles = StyleSheet.create({
    itemcard: {
        width: scrwidth - 8,
        backgroundColor: '#fff',
        flexDirection: 'column',
        borderRadius: 30,
        marginBottom: 20,

    },


})


export default Donationcard