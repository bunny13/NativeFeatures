import { ADD_PLACE } from './actionTypes';

export const addPlace = (placeTitle) => {
    console.log("HAHA");
    return {
        type: ADD_PLACE,
        placeTitle: placeTitle
    }
}