import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text } from "react-native";
export default function Customers({ navigation }) {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#212121",
        padding: 50,
      }}
    >
      <Text style={{ color: "#F8F8F8", fontSize: 20 }}>Customers</Text>
    </View>
  );
}
