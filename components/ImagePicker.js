import React, {useState} from "react";
import { View,Text,StyleSheet,Image,Button, Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Color from  "../constants/Color";

const styles = StyleSheet.create({
    imageContainer:{
        alignItems: "center"
    },
    imagePreview:{
        width: "100%",
        height: 200,
        marginBottom: 10,
        borderColor: "#ccc",
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    image:{
        height: "100%",
        width: "100%",
    }
});

const ImgPicker = (props) => {
    const [imageTaken, setImageTaken] = useState("");

    const verfiyPermissionHandler = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
        if(result.status !== "granted"){
            return false;
        }
        return true;
    }

    const takeImageHandler = async () => {
        const getPermissionCheck = await verfiyPermissionHandler();
        if(getPermissionCheck){
            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [16,9],
                quality: 0.5
            });
            if(!result.cancelled){
                props.onImageTaken(result.uri);
                setImageTaken(result.uri);
            }
        }else{
            Alert.alert(
                "No Permissions",
                "Permission are not granted by the user to capture image",
                [{
                    text: 'Okay'
                }]
            );
        }
    }
    return (
        <View style={styles.imageContainer}>
            <View style={styles.imagePreview}>
                {imageTaken ? <Image style={styles.image}
                    source = {{uri: imageTaken}}
                /> : <Text>No Image Available!!</Text>}
            </View>
            <Button 
                title="Take Image" 
                onPress={takeImageHandler} 
                color={Color.primary}/>
        </View>
    )
}

export default ImgPicker;
