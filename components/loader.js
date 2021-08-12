import React from "react";
import { Button } from "react-native-elements";
import { View } from "react-native";
export default function Loader({ color, bgc }) {
  const primaryColor = "#4E7D9B";
  const secondaryColor = "#e5e5e5";
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: bgc ? bgc : secondaryColor,
      }}
    >
      <Button
        type="clear"
        color={color ? color : primaryColor}
        loading
        size="20"
        loadingStyle={{ color: color ? color : primaryColor }}
        loadingProps={{ color: color ? color : primaryColor, size: "large" }}
      />
    </View>
  );
}
