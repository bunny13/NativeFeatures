import { ADD_PLACE } from '../actions/actionTypes';
import Places from '../../model/places';

const initalState = {
    places:[]
}

const placesReducer = (state=initalState, action) => {
    switch(action.type){
        case ADD_PLACE :
            const addPlace = new Places(
                new Date().toString(),
                action.placeTitle
            )
            return {
                ...state,
                places:state.places.concat(addPlace)
            }
        default:
            return state;
    }
}   

export default placesReducer;
