import {
  React,
  useSelector,
  useDispatch,
  useState,
  useEffect,
  globalStyle,
  AsyncStorage,
  primaryColor,
} from "../utils/allImports";
import { View } from "react-native";
import LeftSide from "../components/homePageLeftSide";
import RightSide from "../components/homePageRightSide";
export default function ForgetPassword({ navigation }) {
  const styles = globalStyle();
  const dispatch = useDispatch();
  return (
    <View style={styles.splitContainer}>
      <View
        style={[
          styles.partContainer,
          {
            backgroundColor: "#F8F8F8",
            paddingVertical: 0,
            paddingHorizontal: 0,
          },
        ]}
      >
        <LeftSide navigation={navigation} />
      </View>
      <View
        style={[
          styles.partContainer,
          {
            backgroundColor: primaryColor,
            paddingVertical: 0,
            paddingHorizontal: 0,
          },
        ]}
      >
        <RightSide navigation={navigation} />
      </View>
    </View>
  );
}
