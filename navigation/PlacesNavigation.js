import React from "react";
import { createAppContainer } from "react-navigation"; 
import { createStackNavigator } from 'react-navigation-stack';
import MapScreen from '../screens/MapScreen';
import NewPlaceScreen from '../screens/NewPlaceScreen';
import PlaceDetailScreen from '../screens/PlaceDetailScreen';
import PlacesListScreen from '../screens/PlacesListScreen';
import Colors from '../constants/Color';
import AccordianScreen from '../screens/AccordianScreen';

const PlacesNavigator = createStackNavigator({
    'PlacesList' : PlacesListScreen,
    'PlaceDetail': PlaceDetailScreen,
    'NewPlace': NewPlaceScreen,
    'Map': MapScreen,
    'Accordian': AccordianScreen
},{
    defaultNavigationOptions: {
        headerStyle:{
            backgroundColor: Colors.primary
        },
        headerTintColor: 'white'
    }
});

export default createAppContainer(PlacesNavigator);
