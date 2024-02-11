import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const scrwidth = Dimensions.get('window').width - 50;

const ProgressBar = ({ progress = 0.1 }) => {
    const [width, setWidth] = useState(0);
    useEffect(() => {
        setWidth(scrwidth * progress);
    }, [progress]);

    return (
        <View style={styles.container}>
            <View style={styles.track}>
                <View style={[styles.bar, { width }]} />
            </View>
            <Text style={styles.text}>{`${progress * 100}%`}</Text>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0f0f0f',
        borderRadius: 20,
        padding: 5,
        justifyContent: 'center'
    },
    track: {
        height: 4,
        backgroundColor: '#ccc',
        borderRadius: 2,
        width: scrwidth,
    },
    bar: {
        height: 4,
        backgroundColor: '#007bff',
        borderRadius: 2,
    },
    text: {
        marginLeft: 8,
        fontSize: 12,
        color: '#fff',
    },
});

export default ProgressBar;
