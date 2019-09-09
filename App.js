import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PlacesNavigator from "./navigation/PlacesNavigation";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import placesReducer from './store/reducers/places';
import { init } from './helper/db'; 

init()
.then(() => {
  console.log("Initialized Database");
})
.catch(() => {
  console.log("Database Failed");
}) 

const rootReducer = combineReducers({
  places: placesReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  return (
    <Provider store = {store}>
      <PlacesNavigator /> 
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
