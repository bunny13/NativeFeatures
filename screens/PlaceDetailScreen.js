import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { connect } from "react-redux";
import MapPreview from '../components/MapPreview';
import Color from '../constants/Color';

const styles = StyleSheet.create({
    detailContainer:{
        margin: 10,
        alignItems: "center"
    },
    image:{
        width:"100%",
        height:200
    },
    mapPreview:{
        width: "100%",
        height: 200,
        borderColor: "#ccc",
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    addressContainer:{
        width:"100%",
        marginTop: 10,
        shadowColor:'black',
        shadowOpacity: 0.2,
        shadowOffset: { width : 0, height: 2},
        backgroundColor: 'white',
        elevation: 5,
        justifyContent:"center",
        alignItems:"center"
    },
    addressText:{
        fontSize: 18,
        color: 'blue',
        padding:10
    }
});

const PlaceDetailScreen = props => {
    const placeId = props.navigation.getParam("placeId");
    const placeToShow = props.places.find(place => place.id === placeId);
    let imageUri;
    let locCordinates;

    if(placeToShow.imageUri){
        imageUri = placeToShow.imageUri
    }

    if(placeToShow.lat && placeToShow.lon){
        console.log("here");
        locCordinates = {
            lat: placeToShow.lat, 
            lon: placeToShow.lon
        }
    }
    openMapHandler = () => {
        props.navigation.navigate('Map',{
            readOnly: true,
            locCordinates: locCordinates
        })
    }

    return (
        <ScrollView>
            <View style={styles.detailContainer}>
                <Image 
                    style={styles.image}
                    source={{uri: imageUri}}
                />
                <View style={styles.addressContainer}>
                    <Text style={styles.addressText}>{placeToShow.address}</Text>
                    <MapPreview style={styles.mapPreview} locCordinates={locCordinates} openMapHandler={openMapHandler}>
                        <Text>No Location Found!!</Text>
                    </MapPreview>
                </View>
            </View>
        </ScrollView>
    )
}

PlaceDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('placeTitle')
    }
}

const mapStateToProps = (state) => {
    return {
        places: state.places.places
    }
}

export default connect(mapStateToProps, null)(PlaceDetailScreen);