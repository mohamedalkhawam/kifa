import {
  React,
  useSelector,
  useDispatch,
  useState,
  useEffect,
  nativeElement,
  globalStyle,
  localize,
  AsyncStorage,
} from "../utils/allImports";
import { useTranslation } from "react-i18next";
import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
export default function ForgetPassword({ navigation }) {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [formData, setFormData] = useState({
    email: "",
  });
  const { t } = useTranslation();

  const styles = globalStyle();
  return (
    <View style={styles.splitContainer}>
      <View style={[styles.partContainer, styles.loginView]}>
        <TouchableOpacity
          style={[styles.flexStart]}
          onPress={() => navigation.goBack()}
        >
          <nativeElement.Icon
            name="arrow-back"
            color="#4E7D9B"
            type="ionicon"
            size={35}
            containerStyle={styles.shadow}
          />
        </TouchableOpacity>
        <View style={{ marginVertical: "6%" }}></View>
        <nativeElement.Icon
          name="person"
          color="#4E7D9B"
          type="ionicon"
          size={windowHeight * 0.2}
          containerStyle={styles.shadow}
        />
        <View style={{ marginVertical: 5 }}></View>
        <View style={[styles.flexCenter]}>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#4E7D9B" }}>
            {t("forgetPassowrd")}
          </Text>
        </View>
        <View style={{ marginVertical: "7%" }}></View>
        <nativeElement.Input
          leftIcon={
            <nativeElement.Icon
              onPress
              name="email"
              size={25}
              color="#4E7D9B"
            />
          }
          rightIcon={
            <nativeElement.Icon
              name="close"
              size={25}
              onPress={() => setFormData({ ...formData, email: "" })}
            />
          }
          // label="Email"
          placeholder={t("email")}
          errorMessage="Email must be valid!!"
          inputContainerStyle={{
            borderWidth: 1,
            borderRadius: 5,
            paddingHorizontal: 10,
            paddingVertical: 7,
          }}
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
        />
        {/* ////////////////////////////////////////////////////////////////////////// */}

        <View style={{ flex: 1 }}></View>
        <View style={[styles.flexBetween]}>
          <nativeElement.Button
            title={t("getNewPassword")}
            buttonStyle={[styles.loginButton]}
            titleStyle={{ color: "#F8F8F8", fontWeight: "bold" }}
            onPress={() => setLocale("en")}
            containerStyle={{
              paddingHorizontal: 10,
              paddingVertical: 7,
              flexGrow: 1,
              width: "100%",
            }}
          />
        </View>
      </View>
      <View style={[styles.partContainer, styles.logoView]}>
        <View style={[styles.logoCard]}>
          <Text> Logo</Text>
        </View>
      </View>
    </View>
  );
}
