import React, { useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import IoniconsHeaderButton from "../components/UI/HeaderButton";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { connect } from "react-redux";
import PlaceItem from '../components/PlaceItem';
import { loadPlace } from "../store/actions/places";
 
const PlacesListScreen = props => {

    useEffect(() => {
        props.onLoadPlaces();
    }, []); 
    
    const sendData = (id, title) => {
        props.navigation.navigate('PlaceDetail',{
            placeId: id,
            placeTitle: title,
        })
    }

    return (
        <FlatList 
            data = {props.places}
            keyExtractor = {item => item.id}
            renderItem = {item => (
                <PlaceItem 
                    image = {item.item.imageUri}
                    title = {item.item.title}
                    address = {item.item.address}
                    onSelect = {() => sendData(item.item.id, item.item.title)}
                />
            )}
        />
    )
}

PlacesListScreen.navigationOptions = (navData) => {
    //()=>navData.navigation.navigate("NewPlace")
    return {
        headerTitle: "All Places",
        headerRight: (
            <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
                <Item title="Add" iconName="md-add" onPress={()=>navData.navigation.navigate("Accordian")}/>
            </HeaderButtons>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        places: state.places.places
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadPlaces : () => dispatch(loadPlace())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlacesListScreen);