import React from "react";
import { TouchableOpacity } from "react-native";
export default function BackButton({ navigation, color, Icon, left, top }) {
  return (
    <TouchableOpacity
      style={[
        {
          position: "absolute",
          left: left ? left : 30,
          top: top ? top : 30,
          zIndex: 10000,
        },
      ]}
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon
        name="arrow-back"
        color={color || "#e5e5e5"}
        type="ionicon"
        size={35}
      />
    </TouchableOpacity>
  );
}
