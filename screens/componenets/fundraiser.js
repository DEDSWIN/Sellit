

import * as React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, Image, StatusBar, ScrollView, Dimensions, TouchableHighlight } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';


const scrwidth = Dimensions.get('window').width;

function Itemcard(props) {


    const { item } = props;
    return (
        <View style={styles.itemcard}>
            <Image
                style={{ height: 191, width: scrwidth - 8, borderTopLeftRadius: 30, borderTopRightRadius: 30, }}
                source={{ uri: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/08/07/13/lifestyle.jpg' }}
            />

            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                <View style={{ flex: 1, padding: 12, paddingTop: 8, paddingRight: 0 }}>

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
                <AnimatedCircularProgress
                    style={{ margin: 10 }}
                    duration={1500}
                    lineCap='butt'
                    size={90}
                    width={8}
                    fill={item.progress} // Progress percentage (0-100)
                    tintColor="#00e0ff"
                    backgroundColor="#5f5f5f"
                    onAnimationComplete={() => console.log('Animation complete')}
                    children={(fill) => (
                        <Text style={{ fontSize: 28, color: 'black', fontFamily: 'Poppins-Regular', paddingTop: 4, }}>
                            {Math.round(fill)}
                            <Text style={{ fontSize: 17 }}>%</Text>
                        </Text>
                    )}

                />

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
    text1: {
        paddingTop: 7,
        paddingLeft: 20,
        color: '#000',
        // Make sure the Inter font is available in your project
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: '600', // React Native uses string values for fontWeight
    },

    text2: {
        paddingTop: 7,
        paddingRight: 5,
        color: '#066',
        // Make sure the Inter font is available in your project
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: '600',// React Native uses string values for fontWeight
        alignSelf: 'flex-end'
    },
})


export default Itemcard