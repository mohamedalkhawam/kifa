import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text } from "react-native";
export default function Home({ navigation }) {
  return (
    <View>
      <Text styles={{ marginTop: 100 }}>Invoices</Text>
    </View>
  );
}
