import React, {useState} from "react";
import { View, Text } from "react-native";
import MapView, { Marker} from 'react-native-maps';

const MapScreen = props => {
    const [selectedLocation, setLocationHandler] = useState();

    let initialRegion={
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }

      const getClickedLocation = event => {
        setLocationHandler({
            lat: event.nativeEvent.coordinate.latitude,
            lon: event.nativeEvent.coordinate.longitude,
        })
      }
      let markerCoordinates;
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
}

export default MapScreen;