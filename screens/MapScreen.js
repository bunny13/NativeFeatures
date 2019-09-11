import React, {useState, useCallback, useEffect} from "react";
import { View, Text } from "react-native";
import MapView, { Marker} from 'react-native-maps';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import IoniconsHeaderButton from '../components/UI/HeaderButton';
//import console = require("console");

const MapScreen = props => {
    const initialCoordinates = props.navigation.getParam('locCordinates');
    const readOnly = props.navigation.getParam('readOnly');

    const [selectedLocation, setLocationHandler] = useState(initialCoordinates);
    let markerCoordinates;

    const saveMapHandler = useCallback(() => {
        props.navigation.navigate("NewPlace",{ 'pickedLocation' : selectedLocation });
    },[selectedLocation]);

    useEffect(() => {
        props.navigation.setParams({ save: saveMapHandler})
    }, [saveMapHandler]);

    let initialRegion={
        latitude: initialCoordinates.lat ? initialCoordinates.lat : 37.78825,
        longitude: initialCoordinates.lon ? initialCoordinates.lon : -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }

      const getClickedLocation = event => {
          if(readOnly){
              return;
          }
        setLocationHandler({
            lat: event.nativeEvent.coordinate.latitude,
            lon: event.nativeEvent.coordinate.longitude,
        })
      }
      
      if(selectedLocation){
          markerCoordinates = {
              latitude: selectedLocation.lat,
              longitude: selectedLocation.lon
          }
      }
    return (
        <MapView 
            style={{flex: 1}} 
            region={initialRegion} 
            onPress={(event) => getClickedLocation(event)}
        >
            {markerCoordinates && <Marker title="Picked Location" coordinate={markerCoordinates}/>}
        </MapView>
    )
};

MapScreen.navigationOptions = navData => {
    const saveFn = navData.navigation.getParam('save');
    const readOnly = navData.navigation.getParam('readOnly');
    if(readOnly){
        return {};
    }
    return{
        headerRight: (
            <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
                <Item title="Save" onPress={saveFn}/>
            </HeaderButtons>
        )
    }
}

export default MapScreen;