import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";
import Color from '../constants/Color';

const styles = StyleSheet.create({
    placeItem:{
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    image:{
        width:70,
        height:70,
        borderRadius: 35,
        backgroundColor: '#ccc',
        borderColor: Color.primary,
        borderWidth: 1
    },
    infoContainer: {
        marginLeft : 25,
        width : 250,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    title:{
        color: '#666',
        marginBottom: 5
    },
    address:{
        color: '#666'
    }
});

const PlaceItem = props => {
    return(
        <TouchableOpacity style={styles.placeItem} onPress={props.onSelect}>
            <Image 
                style={styles.image}
                source={{uri:props.image}}
                />
            <View style={styles.infoContainer}>
                <Text style={styles.title}>
                    {props.title}
                </Text>
                <Text style={styles.address}>
                    {props.address}
                </Text>    
            </View>
        </TouchableOpacity>
    )
}

export default PlaceItem;