import React from "react";
import { View, Text, FlatList } from "react-native";
import IoniconsHeaderButton from "../components/UI/HeaderButton";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { connect } from "react-redux";
import PlaceItem from '../components/PlaceItem';
 
const PlacesListScreen = props => {
    const places = props.places;
    const sendData = (id, title) => {
        props.navigation.navigate('PlaceDetail',{
            placeId: id,
            placeTitle: title
        })
    }

    return (
        <FlatList 
            data = {places}
            keyExtractor = {item => item.id}
            renderItem = {item => (
                <PlaceItem 
                    image = {null}
                    title = {item.item.title}
                    onSelect = {() => sendData(item.item.id, item.item.title)}
                />
            )}
        />
    )
}

PlacesListScreen.navigationOptions = (navData) => {
    return {
        headerTitle: "All Places",
        headerRight: (
            <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
                <Item title="Add" iconName="md-add" onPress={()=>navData.navigation.navigate("NewPlace")}/>
            </HeaderButtons>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        places: state.places.places
    }
}

export default connect(mapStateToProps)(PlacesListScreen);