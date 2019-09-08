import React from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { HeaderButton } from 'react-navigation-header-buttons';

const IoniconsHeaderButton = props => {
    return <HeaderButton {...props} IconComponent={Ionicons} iconSize={23} color="white"/>
}

export default IoniconsHeaderButton;