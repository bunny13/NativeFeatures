import React from "react";
import { View, Text, Image,StyleSheet, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
    mapPrev: {
        alignItems: "center",
        justifyContent: "center"
    },
    image:{
        width: "100%",
        height: "100%"
    }
})


const MapPreview = props => {
    let imageUrl = '';
    if(props.locCordinates){
        imageUrl =  `https://maps.googleapis.com/maps/api/staticmap?center=${props.locCordinates.lat},${props.locCordinates.lon}&zoom=14&size=600x300&maptype=roadmap
        &markers=color:blue%7Clabel:${props.locCordinates.lat},${props.locCordinates.lon}&key=AIzaSyAnNi58FhXkWMlStffMQVobJv5X35xqfkU`;
    }

    return (
        <TouchableOpacity onPress={props.openMapHandler} style={{...props.style, ...styles.mapPreview}}>
            {props.locCordinates ? 
                <Image 
                style={styles.image}
                source = {{uri: imageUrl}}
                /> : 
                props.children}
        </TouchableOpacity>
    )
}

export default MapPreview;