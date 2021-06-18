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
import { useTranslation, Trans } from "react-i18next";
import { View, Text, useWindowDimensions, Pressable } from "react-native";
export default function SingIn({ navigation }) {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [toggleEye, setToggleEye] = useState(false);
  const { t, i18n } = useTranslation();
  const setLocale = (locale) => {
    localize.changeLanguage(locale);
    AsyncStorage.setItem("lang", locale);
  };
  const styles = globalStyle();
  return (
    <View style={styles.splitContainer}>
      <View style={[styles.partContainer, styles.loginView]}>
        <View style={{ marginVertical: "6%" }}></View>
        <nativeElement.Icon
          name="person"
          color="#4E7D9B"
          type="ionicon"
          size={windowHeight * 0.2}
          containerStyle={styles.shadow}
        />
        <View style={{ marginVertical: "5%" }}></View>
        <nativeElement.Input
          // rtl={true}
          // direction="rtl"
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
        <View style={{ marginVertical: 10 }}></View>
        <nativeElement.Input
          leftIcon={
            <nativeElement.Icon
              onPress
              name="key"
              type="ionicon"
              size={25}
              color="#4E7D9B"
            />
          }
          rightIcon={
            <nativeElement.Icon
              name={toggleEye ? "eye" : "eye-off"}
              size={25}
              type="ionicon"
              onPress={() => setToggleEye(!toggleEye)}
            />
          }
          // label="Email"
          placeholder={t("password")}
          errorMessage="Password  required!!"
          inputContainerStyle={{
            borderWidth: 1,
            borderRadius: 5,
            paddingHorizontal: 10,
            paddingVertical: 7,
          }}
          value={formData.password}
          secureTextEntry={!toggleEye}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
        />
        {/* ///////////////////////////////////////////////////////// */}
        <View style={{ flex: 1 }}></View>
        <View style={styles.flexBetween}>
          <nativeElement.Button
            title={t("login")}
            buttonStyle={[styles.loginButton]}
            titleStyle={{ color: "#F8F8F8", fontWeight: "bold" }}
            onPress={() => setLocale("en")}
            containerStyle={{
              paddingHorizontal: 10,
              paddingVertical: 7,
              flexGrow: 1,
              width: "40%",
            }}
          />
          <Pressable
            onPress={() =>
              navigation.navigate("forgetPassword", {
                email: formData.email,
              })
            }
          >
            <Text
              style={{
                color: "#4E7D9B",
                textDecorationLine: "underline",
                fontSize: 16,
              }}
            >
              {t("forgetPassowrd")}
            </Text>
          </Pressable>
        </View>
      </View>
      <View style={[styles.partContainer, styles.logoView]}>
        <View style={[styles.languageButtonsContainer]}>
          <nativeElement.Button
            title={"English"}
            buttonStyle={[styles.englishButton]}
            titleStyle={{ color: "#4E7D9B", fontWeight: "bold" }}
            onPress={() => setLocale("en")}
            containerStyle={styles.shadow}
          />
          <nativeElement.Button
            type="outline"
            title={"عربي"}
            buttonStyle={[styles.arabicButton]}
            titleStyle={{ color: "#F8F8F8", fontWeight: "bold" }}
            containerStyle={styles.shadow}
            onPress={() => setLocale("ar")}
          />
        </View>
        <View style={[styles.logoCard]}>
          <Text> Logo</Text>
        </View>
      </View>
    </View>
  );
}
