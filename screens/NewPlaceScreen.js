import React, { useState, useCallback } from "react";
import { View, Text, TextInput, StyleSheet, Button, ActivityIndicator, ScrollView } from "react-native";
import Colors from '../constants/Color';
import { connect } from 'react-redux';
import ImgPicker from '../components/ImagePicker';
import { addPlace } from '../store/actions/places';
import LocationPicker from '../components/LocationPicker';
//import console = require("console");

const styles = StyleSheet.create({
    formContainer:{
        margin:30
    },
    label:{
        fontSize: 16,
        marginBottom: 10
    },
    inputContainer:{
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginBottom: 15
    },
    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        marginVertical: 15
    }
});

const NewPlaceScreen = props => {
    const [title, setTitle] = useState('');
    const [imageUri, setImageUri] = useState('');
    const [locCoordinates, setLocCoordinates] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const submitHandler = () => {
        setIsLoading(true);
        props.onSubmitPlace(title,imageUri, locCoordinates);
        setIsLoading(false);
        props.navigation.goBack();
    }

    const onImageTaken = (uri) => {
        setImageUri(uri);
    }

    const getUserCoordinates = useCallback(usrCoordinates => {
        setLocCoordinates(usrCoordinates);
    });

    if(isLoading){
        return (
            <View>
                <ActivityIndicator size="large" color={Colors.primary}/>
            </View>
        )
    }

    return (
        <ScrollView>
            <View style={styles.formContainer}>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.inputContainer} value={title} onChangeText={(val) => setTitle(val)}/>
                <ImgPicker
                    onImageTaken = {onImageTaken} 
                />
                <LocationPicker navigation={props.navigation} getUserCoordinates={getUserCoordinates}/>
                    <View style={styles.buttonContainer}>
                        <Button title="Submit" color={Colors.primary} onPress={() => submitHandler()}/>
                    </View>             
            </View>
        </ScrollView>
    )
}

NewPlaceScreen.navigationOptions = navData => {
    return {
        headerTitle: "Add Place"
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmitPlace: (title, imageUri, locCoordinates) => dispatch(addPlace(title, imageUri, locCoordinates))
    }
}

export default connect(null, mapDispatchToProps)(NewPlaceScreen);