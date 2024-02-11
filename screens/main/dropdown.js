import React, { useState } from 'react';
import { StyleSheet ,Platform} from 'react-native';
import { SelectCountry } from 'react-native-element-dropdown';

const local_data = [
    {
        value: '1',
        lable: 'Country 1',
        image: {
            uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
        },
    },
    {
        value: '2',
        lable: 'Country 2',
        image: {
            uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
        },
    },
    {
        value: '3',
        lable: 'Country dfdf',
        image: {
            uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
        },
    },
    {
        value: '4',
        lable: 'Country 4',
        image: {
            uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
        },
    },
    {
        value: '5',
        lable: 'Country 5',
        image: {
            uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
        },
    },
];

const SelectCountryScreen = _props => {
    const [country, setCountry] = useState('1');

    return (
        <SelectCountry
            style={styles.dropdown}
            selectedTextStyle={styles.selectedTextStyle}
            placeholderStyle={styles.placeholderStyle}
            imageStyle={styles.imageStyle}
            iconStyle={styles.iconStyle}
            itemTextStyle={styles.itemstyle}
            itemContainerStyle={{ backgroundColor:"#fff"}}
            maxHeight={200}
            value={country}
            data={local_data}
            valueField="value"
            labelField="lable"
            imageField="image"
            placeholder="Select country"
            searchPlaceholder="Search..."
            onChange={e => {
                setCountry(e.value);
            }}
        />
    );
};

export default SelectCountryScreen;

const styles = StyleSheet.create({
    dropdown: {
        marginLeft:6,
        height: 40,
        width: 145,
        backgroundColor: '#fff',
        borderRadius: 21,
        paddingHorizontal: 8,
        color: '#000',
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 2,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    imageStyle: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    placeholderStyle: {
        fontSize: 16,
        color:'#fff'
        
        
    },
    selectedTextStyle: {
        fontSize: 14,
        marginLeft: 5,
        color: '#000'
        
    },
    iconStyle: {
        width: 20,
        height: 20,
        
    },
    itemstyle:
    {
        color:'#000',
    },
});