import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button, ActivityIndicator } from "react-native";
import Colors from '../constants/Color';
import { connect } from 'react-redux';
import ImgPicker from '../components/ImagePicker';
import { addPlace } from '../store/actions/places';
import LocationPicker from '../components/LocationPicker';

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
        alignContent: 'center'
    }
});

const NewPlaceScreen = props => {
    const [title, setTitle] = useState('');
    const [imageUri, setImageUri] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const submitHandler = () => {
        setIsLoading(true);
        props.onSubmitPlace(title,imageUri);
        setIsLoading(false);
        props.navigation.goBack();
    }

    const onImageTaken = (uri) => {
        setImageUri(uri);
    }

    if(isLoading){
        return (
            <View>
                <ActivityIndicator size="large" color={Colors.primary}/>
            </View>
        )
    }

    return (
        <View style={styles.formContainer}>
            <Text style={styles.label}>Title</Text>
            <TextInput style={styles.inputContainer} value={title} onChangeText={(val) => setTitle(val)}/>
            <ImgPicker
                onImageTaken = {onImageTaken} 
            />
            <LocationPicker navigation={props.navigation}/>
                <View style={styles.buttonContainer}>
                    <Button title="Submit" color={Colors.primary} onPress={() => submitHandler()}/>
                </View>             
        </View>
    )
}

NewPlaceScreen.navigationOptions = navData => {
    return {
        headerTitle: "Add Place"
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmitPlace: (title, imageUri) => dispatch(addPlace(title, imageUri))
    }
}

export default connect(null, mapDispatchToProps)(NewPlaceScreen);