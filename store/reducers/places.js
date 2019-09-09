import { ADD_PLACE, LOAD_PLACE } from '../actions/actionTypes';
import Places from '../../model/places';

const initalState = {
    places:[]
}

const placesReducer = (state=initalState, action) => {
    switch(action.type){
        case ADD_PLACE :
            const addPlace = new Places(
                action.placeId.toString(),
                action.placeTitle,
                action.placeImg
            )
            return {
                ...state,
                places:state.places.concat(addPlace)
            }
        case LOAD_PLACE:
            return {
                ...state,
                places: action.placesArray.map(
                    place => (new Places(place.id.toString(), place.title, place.imageUri, place.address, place.lat, place.lon))
                )
            }
        default:
            return state;
    }
}   

export default placesReducer;
