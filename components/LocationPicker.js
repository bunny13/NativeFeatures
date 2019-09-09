import React, {useState} from "react";
import { View,Text,StyleSheet,Image,Button, Alert, ActivityIndicator } from "react-native";
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Color from  "../constants/Color";
import MapPreview from './MapPreview';

const styles = StyleSheet.create({
    pickerContainer:{
        alignItems: "center"
    },
    mapPreview:{
        width: "100%",
        height: 200,
        marginBottom: 10,
        borderColor: "#ccc",
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    actions:{
        flexDirection: "row",
        justifyContent:"space-around",
        width: "100%"
    }
});

const LocationPicker = (props) => {
    const [locCordinates, setLocCordinates] = useState();
    const [isFetching, setIsFetching] = useState(false);

    const verfiyPermissionHandler = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION);
        if(result.status !== "granted"){
            return false;
        }
        return true;
    }

    const getLocationHandler = async () => {
        setIsFetching(true);
        const checkMapPermission = await verfiyPermissionHandler();
        if(checkMapPermission){
            const location = await Location.getCurrentPositionAsync({
                accuracy: 4
            });
            setLocCordinates({
                lat : location.coords.latitude,
                lon : location.coords.longitude
            });
            setIsFetching(false);
        }
    }

    const openMapHandler = () => {
        props.navigation.navigate("Map");
    }

    return (
        <View style={styles.pickerContainer}>
            <MapPreview style={styles.mapPreview} locCordinates={locCordinates} openMapHandler={openMapHandler}>
                {isFetching ? 
                    <ActivityIndicator size="large" color={Color.primary}/> : 
                    <Text>Choose Location</Text>
                }
            </MapPreview>
            <View style={styles.actions}>
                <Button 
                    title="Get User Location"
                    onPress={getLocationHandler}
                    color={Color.primary}/>
                <Button 
                    title="Choose Location"
                    onPress={openMapHandler}
                    color={Color.primary}/>
            </View>
        </View>
    )
}

export default LocationPicker;
