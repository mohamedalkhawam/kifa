import {
    StyleSheet, Dimensions,I18nManager
} from 'react-native';

export default {
    sizeDefualt: 10,

    GothamMedium: "Regular",

    GothamLight: "Regular",

    GothamBlack: "Regular",

    GothamBook: "Regular",

    PoppinsBold: I18nManager.isRTL ? "Poppins-Bold" : "Poppins-Bold",
    PoppinsRegular: I18nManager.isRTL ? "Poppins-Bold" : "Poppins-Regular",
     
    
};