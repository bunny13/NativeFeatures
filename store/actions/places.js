import { ADD_PLACE, LOAD_PLACE } from './actionTypes';
import * as FileSystem from 'expo-file-system';
import { insertPlaces, loadPlaces } from '../../helper/db';

export const addPlace = (placeTitle, placeImg) => {
    return async (dispatch) => {
        const imageName = placeImg.split('/').pop();
        const imageLocation = FileSystem.documentDirectory + imageName;
        try{
            await FileSystem.moveAsync({
                from: placeImg,
                to:imageLocation
            });
            const insertResult = await insertPlaces(placeTitle, imageLocation,'Dummy Address', 15.2, 10.6);
            dispatch({type: ADD_PLACE, placeId: insertResult.insertId, placeTitle: placeTitle, placeImg: imageLocation });
        }
        catch (err){
            console.log(err);
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