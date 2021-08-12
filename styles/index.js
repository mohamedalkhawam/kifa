import { StyleSheet, useWindowDimensions, Platform } from "react-native";
import React from "react";
export const primaryColor = "#4E7D9B";
export const secondaryColor = "#e5e5e5";
import { useTranslation } from "react-i18next";
export const globalStyle = () => {
  const { t, i18n } = useTranslation();
  const localize = i18n;
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F8F8F8",
      height: "100%",
      width: "100%",
    },
    menuGridStyle: {
      width: "50%",
      height: "50%",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    splitContainer: {
      flex: 1,
      backgroundColor: "#F8F8F8",
      height: "100%",
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    partContainer: {
      width: "50%",
      height: "100%",
      paddingVertical: "4%",
      paddingHorizontal: "2%",
    },
    loginView: {
      backgroundColor: "#F8F8F8",
    },
    logoView: {
      backgroundColor: primaryColor,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    header: {
      height: 100,
      width: windowWidth,
      backgroundColor: primaryColor,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },
    headerText: {
      color: secondaryColor,
      fontSize: 23,
      fontWeight: "bold",
    },
    logoCard: {
      backgroundColor: "#F8F8F8",
      width: windowWidth * 0.2,
      height: windowWidth * 0.2,
      borderRadius: windowWidth * 0.005,
      shadowOffset: {
        width: 10,
        height: 10,
      },
      shadowColor: "#212121",
      shadowOpacity: 0.11,
      elevation: 2,
      justifyContent: "center",
      alignItems: "center",
    },
    languageButtonsContainer: {
      position: "absolute",
      right: 0,
      top: "7%",
      flexDirection: "row",
      width: "75%",
      justifyContent: "space-evenly",
    },
    englishButton: {
      backgroundColor: "#F8F8F8",
      width: windowHeight * 0.15,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      shadowOffset: {
        width: 10,
        height: 10,
      },
      shadowColor: "#212121",
      shadowOpacity: 0.11,
      elevation: 2,
    },
    arabicButton: {
      width: windowHeight * 0.15,
      height: 50,
      borderColor: "#F8F8F8",
      borderWidth: 1.5,
      alignItems: "center",
      justifyContent: "center",
    },
    loginButton: {
      height: 55,
      width: "75%",
      backgroundColor: primaryColor,
      alignItems: "center",
      justifyContent: "center",

      flexDirection: "row",
      borderRadius: 8,
    },
    shadow: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5,
    },
    flexBetween: {
      width: "100%",
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
    },
    flexCenter: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },
    flexEnd: {
      width: "100%",
      justifyContent: "flex-end",
      alignItems: "center",
      flexDirection: "row",
    },
    AuthInputContainerStyle: {
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 7,
    },
    productCardContainerStyle: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-evenly",
    },
    productCardStyle: {
      width: windowWidth / 2 / 4,
      backgroundColor: secondaryColor,
      height: (windowWidth / 2 / 4) * 1.3,
      borderRadius: (windowWidth / 2 / 4) * 0.04,
      marginTop: 30,
      textAlign: "center",
      shadowOffset: {
        width: 10,
        height: 10,
      },
      shadowColor: "#212121",
      shadowOpacity: 0.11,
      elevation: 2,
    },
    productCardImageStyle: {
      height: "70%",
    },
    responsiveDirection: {
      flexDirection: localize.language === "en" ? "row" : "row-reverse",
    },
    productCardTitleStyle: {
      textAlign: "center",
      paddingVertical: 5,
      fontWeight: "bold",
      color: primaryColor,
      textDecorationLine: "underline",
    },
    productCardPriceStyle: {
      textAlign: "center",
      color: primaryColor,
    },
    responsiveTextDirection: {
      textAlign: localize.language === "en" ? "left" : "right",
    },
    flexStart: {
      width: "100%",
      justifyContent: "flex-start",
      alignItems: "center",
      flexDirection: "row",
    },
    flexAround: {
      width: "100%",
      justifyContent: "space-around",
      alignItems: "center",
      flexDirection: "row",
    },
    flexEvenly: {
      width: "100%",
      justifyContent: "space-evenly",
      alignItems: "center",
      flexDirection: "row",
    },
    HomePageLeftSizeHeader: {
      width: "100%",
      height: windowHeight * 0.18,
      justifyContent: "space-around",
      borderBottomWidth: 5,
      borderBottomColor: primaryColor,
      paddingHorizontal: 10,
      paddingTop: 15,
    },
    HomePageRightSizeHeader: {
      width: "100%",
      height: windowHeight * 0.18,
      justifyContent: "space-around",
      borderBottomWidth: 5,
      borderBottomColor: secondaryColor,
      paddingHorizontal: 10,
      paddingTop: 15,
    },
    HomePageLeftSideTitleStyle: {
      color: primaryColor,
      fontWeight: "bold",
      fontSize: 18,
    },
    floatingActionButtonsContainer: {
      flexDirection: "row",
      position: "absolute",
      bottom: 15,
      left: 15,
    },
    floatingActionButtonsStyle: {
      backgroundColor: primaryColor,
      marginRight: 10,
      borderRadius: 15,
    },
    tableHeaderTextStyle: {
      fontSize: 16,
      color: primaryColor,
      fontWeight: "bold",
    },
    tableBodyTextStyle: {
      fontSize: 14,
      color: "#555",
    },
    bodyContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 50,
      width: "100%",
      height: "100%",
      backgroundColor: "#F8F8F8",
    },
    body: {
      alignItems: "center",
      width: "90%",
      paddingBottom: 200,
      height: "100%",
      backgroundColor: "#F8F8F8",
    },
    scrollContainer: {
      height: "65%",
      alignItems: "center",
      justifyContent: "center",
    },
    inputContainer: {
      alignItems: "center",
      marginVertical: 15,
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between",
    },
    fullInput: {
      fontSize: 14,
      fontWeight: "600",
      color: "#777",
      borderColor: "#F8F8F8", // if you need
      padding: 5,
      paddingHorizontal: 10,
      width: "100%",
      height: 50,
      borderRadius: 5,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowColor: "#212121",
      shadowOpacity: 0.11,
      elevation: 2,
      backgroundColor: "white",
      borderWidth: 1,
    },
    smallInput: {
      fontSize: 13,
      fontWeight: "600",
      color: "#777",
      borderColor: "#F8F8F8", // if you need
      padding: 5,
      paddingHorizontal: 10,
      width: "48%",
      height: 50,
      borderWidth: 1,
      borderRadius: 5,
      backgroundColor: "white",
      borderRadius: 5,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowColor: "#212121",
      shadowOpacity: 0.11,
      elevation: 2,
    },
    circle: {
      width: 37,
      height: 37,
      borderRadius: 18,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowColor: "#212121",
      shadowOpacity: 0.11,
      elevation: 2,
      borderWidth: 1,
      borderColor: "#9991",
    },
    circleActiveContainer: {
      width: 50,
      height: 50,
      borderRadius: 25,
      borderWidth: 4,
      alignItems: "center",
      justifyContent: "center",
      borderColor: "#212121",
      margin: 3,
    },
    circleInActiveContainer: {
      width: 50,
      height: 50,
      borderRadius: 25,
      alignItems: "center",
      justifyContent: "center",
      margin: 3,
    },
    chooseImageBtn: {
      borderWidth: 1,
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 15,
      alignItems: "center",
      justifyContent: "center",
    },
    inputAndroid: {
      paddingTop: 13,
      paddingHorizontal: 10,
      paddingBottom: 12,
      borderWidth: 1,
      borderColor: "#F8F8F8",
      borderRadius: 5,
      backgroundColor: "white",
      fontWeight: "bold",
      fontSize: 13,
      fontWeight: "600",
      color: "#777",
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowColor: "#212121",
      shadowOpacity: 0.11,
      elevation: 2,
      width: windowWidth * 0.9,
      height: 50,
    },
    inputIOS: {
      paddingTop: 13,
      paddingHorizontal: 10,
      paddingBottom: 12,
      borderWidth: 1,
      borderColor: "#F8F8F8",
      borderRadius: 4,
      backgroundColor: "white",
      width: windowWidth * 0.9,
      fontSize: 13,
      fontWeight: "bold",
      color: "#777",
      borderRadius: 5,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowColor: "#212121",
      shadowOpacity: 0.11,
      elevation: 2,
    },
    placeholder: {
      fontSize: 13,
      fontWeight: "bold",
      color: "#777",
    },
    selectServicesContainer: {
      width: "100%",
      flexWrap: "wrap",
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: 25,
    },
    selectServicesCard: {
      width: "48%",

      marginVertical: 10,
      backgroundColor: "white",
      borderRadius: 5,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowColor: "#212121",
      shadowOpacity: 0.11,
      elevation: 2,
      alignItems: "center",
      justifyContent: "center",
    },
    selectServicesText: {
      paddingVertical: 10,
    },

    modalView: {
      width: windowWidth * 0.9,
      height: 600,
      backgroundColor: "#F8F8F8",
      borderRadius: 20,
      // padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },

    modalBody: {
      alignItems: "center",
      justifyContent: "center",
      width: "90%",
      marginVertical: 15,
      paddingBottom: 300,
    },
    modalFooter: {
      width: "100%",
      position: "absolute",
      bottom: 0,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      backgroundColor: "#F8F8F8",
      height: 60,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },

    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonChoose: {
      width: "50%",
      alignItems: "center",
      borderBottomRightRadius: 20,
      backgroundColor: "#212121",
      height: 60,
      justifyContent: "center",
    },
    buttonClose: {
      width: "50%",
      alignItems: "center",
      borderBottomLeftRadius: 20,
      height: 60,
      backgroundColor: "#9992",
      justifyContent: "center",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
    },
    card: {
      flex: 1,
      marginVertical: 4,
      marginHorizontal: 16,
      borderRadius: 5,
      overflow: "hidden",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      borderColor: "black",
      borderRadius: 15,
    },
    invoicesTabsContainerStyle: {
      width: "100%",
      height: 70,
      borderBottomWidth: 1,
      borderBottomColor: secondaryColor,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    invoicesTabsStyle: {
      width: "50%",
      height: "60%",
      alignItems: "center",
      justifyContent: "center",
    },
    invoicesTabsText: {
      color: primaryColor,
      fontSize: 15,
    },
    invoicesTabsSeperator: {
      borderRightWidth: 1,
      borderRightColor: primaryColor,
    },
    invoiceCardContainerStyle: {
      width: "100%",
      paddingVertical: 15,
      paddingHorizontal: 10,
      borderRadius: 5,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 15,
      backgroundColor: "#F8F8F8",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5,
    },
    invoicesHalfPart: {
      width: "50%",
      paddingHorizontal: 10,
    },
    bold: {
      fontWeight: "bold",
    },
    textPrimaryColor: {
      color: primaryColor,
    },
    containerPrimaryColor: {
      backgroundColor: primaryColor,
      color: primaryColor,
    },
    invoicesCardTitleStyle: {
      fontWeight: "bold",
      paddingVertical: 3,
      color: primaryColor,
      fontSize: 16,
    },
    invoicesCardInfoStyle: {
      color: "#777",
      fontSize: 15,
    },
    propertyStyle: {
      fontWeight: "bold",
      paddingVertical: 3,
      color: primaryColor,
    },
    infoStyle: { color: "#777" },
    singleInvoiceRowStyle: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 15,
      paddingHorizontal: 15,
    },
    singleInvoiceTitleStyle: {
      fontWeight: "bold",
      paddingVertical: 3,
      color: primaryColor,
      fontSize: 22,
      fontWeight: "400",
      textDecorationLine: "underline",
    },
    autocompleteWrapper: {
      width: "100%",
      // flexDirection: "row",
      // alignItems: "center",
      // justifyContent: "center",
      paddingHorizontal: 20,
      zIndex: 1000,
      paddingTop: 20,
    },
    autocompleteContainerView: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",

      borderRadius: 5,
      borderColor: primaryColor,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5,
      backgroundColor: "white",
      position: "relative",
    },
    autocompleteContainer: {
      width: "100%",
    },
    autoCompleteInputContainerStyle: {
      borderWidth: 0,
      padding: 7,
    },
    autoCompleteInput: {
      height: 55,
      marginHorizontal: 15,
    },
    snakeSuccesfully: {
      color: "green",
    },
    someThingWentWrongSnake: {
      color: "red",
    },
    customerCardHeaderStyle: {
      marginTop: 25,
      width: "100%",
      backgroundColor: primaryColor,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      paddingHorizontal: 7,
      paddingVertical: 5,
    },
    customerCardWrapper: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5,
    },
    searchListStyle: {
      justifyContent: "center",
      maxHeight: windowHeight * 0.2,
      zIndex: 1000,
    },
  });
};
