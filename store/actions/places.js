import { ADD_PLACE, LOAD_PLACE } from './actionTypes';
import * as FileSystem from 'expo-file-system';
import { insertPlaces, loadPlaces } from '../../helpers/db';

export const addPlace = (placeTitle, placeImg, locCoordinates) => {
    return async (dispatch) => {

        const result = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${locCoordinates.lat},${locCoordinates.lon}&key=AIzaSyAnNi58FhXkWMlStffMQVobJv5X35xqfkU`);
        if(!result.ok){
            throw new Error("Something Went Wrong !!");
        }

        const dataResult = await result.json();
        const address = dataResult.results[0].formatted_address;
        const imageName = placeImg.split('/').pop();
        const imageLocation = FileSystem.documentDirectory + imageName;
        const lat = locCoordinates.lat;
        const lon = locCoordinates.lon;

        try{
            await FileSystem.moveAsync({
                from: placeImg,
                to:imageLocation
            });
            const insertResult = await insertPlaces(placeTitle, imageLocation,address, lat, lon);
            dispatch({type: ADD_PLACE, placeId: insertResult.insertId, placeTitle: placeTitle, placeImg: imageLocation, address: address, lat: lat, lon: lon });
        }
        catch (err){
            throw err;
        }

        
    }
}

export const loadPlace = () => {
    return async (dispatch) => {
        const allPlacesResult = await loadPlaces();
        dispatch({
            type: LOAD_PLACE,
            placesArray: allPlacesResult.rows._array
        })
    }
}