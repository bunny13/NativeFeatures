import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button, ActivityIndicator } from "react-native";
import Colors from '../constants/Color';
import { connect } from 'react-redux';
import { addPlace } from '../store/actions/places';

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
    const [isLoading, setIsLoading] = useState(false);

    const submitHandler = () => {
        setIsLoading(true);
        props.onSubmitPlace(title);
        setIsLoading(false);
        props.navigation.goBack();
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
        onSubmitPlace: (title) => dispatch(addPlace(title))
    }
}

export default connect(null, mapDispatchToProps)(NewPlaceScreen);